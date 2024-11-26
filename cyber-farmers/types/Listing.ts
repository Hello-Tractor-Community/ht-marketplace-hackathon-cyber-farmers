export interface Listing {
    id: number;
    title: string;
    description: string;
    price: string;
    location: string;
    hours_used: number;
    brand: string;
    image: string;
    seller: number;
}

export interface SellerDetails {
    firstName: string;
}

export interface ListingWithSeller extends Listing {
    sellerDetails: SellerDetails;
}

