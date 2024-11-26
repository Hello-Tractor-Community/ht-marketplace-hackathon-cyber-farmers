import requests
from django.conf import settings
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Purchase
from .serializers import PurchaseSerializer
from tractors.models import Tractor
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings


class PurchaseCreateView(generics.CreateAPIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        tractor_id = self.request.data.get("tractor")
        tractor = Tractor.objects.get(id=tractor_id)

        # Check if the tractor is approved and available
        if not tractor.is_approved:
            return Response(
                {"error": "This tractor is not approved for sale."}, status=400
            )

        # Calculate total amount (you might include taxes/fees here)
        total_amount = tractor.price

        # Save the purchase object
        purchase = serializer.save(buyer=self.request.user, total_amount=total_amount)

        # Initiate M-Pesa STK Push (Simulate Payment)
        response = self.initiate_mpesa_payment(purchase, total_amount)

        if response.get("status") != "success":
            return Response({"error": "Payment initiation failed."}, status=400)

        # Optional: Update tractor status if needed, like marking it as sold
        # tractor.is_available = False  # Add this field if necessary
        # tractor.save()

        return Response(
            {"message": "Purchase initiated successfully, please complete payment."},
            status=201,
        )

    def initiate_mpesa_payment(self, purchase, amount):
        """
        Initiates the M-Pesa STK Push payment request.
        """
        # M-Pesa credentials (use your credentials from settings.py)
        lipa_na_mpesa_online_shortcode = settings.MPESA_CONFIG["SHORTCODE"]
        lipa_na_mpesa_online_shortcode_shortcode = settings.MPESA_CONFIG[
            "LIPA_NA_MPESA_SHORTCODE"
        ]
        lipa_na_mpesa_online_shortcode_shortcode = settings.MPESA_CONFIG[
            "LIPA_NA_MPESA_SHORTCODE"
        ]

        # Safaricom API URLs
        mpesa_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

        headers = {"Authorization": f"Bearer {self.get_access_token()}"}

        payload = {
            "BusinessShortcode": lipa_na_mpesa_online_shortcode,
            "LipaNaMpesaOnlineShortcode": lipa_na_mpesa_online_shortcode,  # For testing sandbox
            "AccountNumber": purchase.pk,  # Account number - can be Purchase ID or tractor ID
            "PhoneNumber": self.request.user.phone_number,  # Use phone number of the buyer
            "TransactionAmount": amount,
            "PhoneNumber": self.request.user.phone_number,
            "TransactionReference": purchase.id,
            "Shortcode": lipa_na_mpesa_online_shortcode,  # Account number could be purchase ID or Tractor ID
            "password": self.get_password(),  # Add the password from your settings
        }

        # Send the request to M-Pesa
        response = requests.post(mpesa_url, json=payload, headers=headers)

        return response.json()

    def get_access_token(self):
        """
        Retrieves the access token from Safaricom API
        """
        api_key = settings.MPESA_CONFIG["API_KEY"]
        api_secret = settings.MPESA_CONFIG["API_SECRET"]
        shortcode = settings.MPESA_CONFIG["SHORTCODE"]
        shortcode_password = settings.MPESA_CONFIG["SHORTCODE_PASSWORD"]

        # Get access token
        auth_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        auth = (api_key, api_secret)

        response = requests.get(auth_url, auth=auth)

        if response.status_code == 200:
            token = response.json().get("access_token")
            return token
        else:
            raise Exception("Unable to get access token")

    def get_password(self):
        """
        Retrieves the password used in M-Pesa transactions from your settings.
        """
        return settings.MPESA_CONFIG["LIPA_NA_MPESA_SHORTCODE_PASSWORD"]


@csrf_exempt
def mpesa_validation_callback(request):
    """
    This view will handle the M-Pesa payment validation callback.
    It will verify if the payment is successful and process the information.
    """
    if request.method == "POST":
        validation_data = json.loads(request.body.decode("utf-8"))

        # Log or process validation data (optional)
        print("Validation Data: ", validation_data)

        # Respond with success (M-Pesa expects a response here)
        return JsonResponse(
            {"ResponseCode": "00", "ResponseDescription": "Accepted"}, status=200
        )

    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def mpesa_confirmation_callback(request):
    """
    This view will handle the M-Pesa payment confirmation callback.
    It will verify if the payment was successful and update the purchase status.
    """
    if request.method == "POST":
        confirmation_data = json.loads(request.body.decode("utf-8"))

        # Log or process confirmation data (optional)
        print("Confirmation Data: ", confirmation_data)

        # Get relevant data from the confirmation (you can process this as needed)
        checkout_request_id = confirmation_data.get("CheckoutRequestID")
        merchant_request_id = confirmation_data.get("MerchantRequestID")
        payment_status = confirmation_data.get("ResultCode")
        payment_message = confirmation_data.get("ResultDesc")

        # Here you can check if the payment is successful (payment_status == 0)
        if payment_status == "0":
            # Payment successful - Update purchase status
            purchase = Purchase.objects.filter(
                id=merchant_request_id
            ).first()  # MerchantRequestID should map to Purchase ID
            if purchase:
                purchase.status = "Completed"
                purchase.save()

                # Send a response back to M-Pesa
                return JsonResponse(
                    {"ResultCode": "0", "ResultDesc": "Success"}, status=200
                )
        else:
            # Payment failed, handle accordingly
            return JsonResponse(
                {"ResultCode": "1", "ResultDesc": payment_message}, status=400
            )

    return JsonResponse({"error": "Invalid request method"}, status=400)
