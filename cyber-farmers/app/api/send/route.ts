import { EmailTemplate } from '@/app/components/email-template'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        // Assuming the POST request body contains the user's registration data (like firstName).
        const { firstName, email } = await request.json();  // Get the user's name and email from the request

        if (!firstName || !email) {
            return new Response('Missing first name or email', { status: 400 });
        }

        // Send the email with the user's dynamic first name
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email], // Send to the user's email
            subject: 'Welcome to Cyber Farmers',
            react: EmailTemplate({ firstName }),  // Pass the dynamic firstName to the email template
        });

        // Check for any error in sending the email
        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
