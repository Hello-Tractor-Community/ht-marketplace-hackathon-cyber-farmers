/****************user interface************/
export enum Role {
    BUYER = "BUYER",
    SELLER = "SELLER",
    ADMIN = "ADMIN"
}
  
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
    profileImage?: string;
    verified: boolean;
    newsletterSubscribed: boolean;
    createdAt: Date;
    updatedAt: Date;
    listings: Listing[];
    reviews: Review[];
    wishlistItems: Wishlist[];
    messagesSent: Message[];
    messagesReceived: Message[];
    adminApprovals: AdminApproval[];
    salesTransactions: Transaction[];
    purchaseTransactions: Transaction[];
}
/*************end of user interface***************/


/**************dealer interface****** */
export interface Dealer {
    id: number;
    name: string;
    region: string;
    contactInfo: string;
    services: string[];
    rating: number;
    reviews: Review[];
    promotions: string[];
    createdAt: Date;
}
/*****************end of dealer************* */


/************listing interface****************/
export enum Category {
    TRACTOR = "TRACTOR",
    FARMTOOL = "FARMTOOL",
    SPARE_PART = "SPARE_PART"
}
  
export enum ListingStatus {
    ACTIVE = "ACTIVE",
    PENDING = "PENDING",
    SOLD = "SOLD"
}
  
export interface Listing {
    id: number;
    title: string;
    description: string;
    category: Category;
    images: string[];
    price: number;
    location: string;
    age: number;
    hoursUsed: number;
    status: ListingStatus;
    createdAt: Date;
    updatedAt: Date;
    sellerId: number;
    seller: User;
    reviews: Review[];
    transactions: Transaction[];
    specification?: Specification;
    adminApprovals: AdminApproval[];
    wishlistItems: Wishlist[];
}
/************end of listing interface*********** */


/***************wishlist */
export interface Wishlist {
    id: number;
    createdAt: Date;
    userId: number;
    user: User;
    listingId: number;
    listing: Listing;
}
/*****end of wishlist */


/************review interface *************/
export interface Review {
    id: number;
    rating: number;
    comment?: string;
    createdAt: Date;
    transactionId: number;
    transaction: Transaction;
    reviewerId: number;
    reviewer: User;
    listingId?: number;
    listing?: Listing;
    dealerId?: number;
    dealer?: Dealer;
}
/*********end of review interface************/

/*************message interface************* */
export interface Message {
    id: number;
    content: string;
    sentAt: Date;
    read: boolean;
    senderId: number;
    sender: User;
    receiverId: number;
    receiver: User;
}
/*****************end of message */

/****************specification */
export interface Specification {
    id: number;
    engineModel: string;
    horsepower: number;
    fuelType: string;
    transmission: string;
    gears: number;
    weight: number;
    length: number;
    width: number;
    height: number;
    maxSpeed: number;
    fuelCapacity: number;
    hydraulicSystem?: string;
    pvtTakeoff: boolean;
    threePtHitch: boolean;
    createdAt: Date;
    updatedAt: Date;
    listingId: number;
    listing: Listing;
}
/***************end of specification */


/******************transaction status */
export interface Transaction {
    id: number;
    price: number;
    status: TransactionStatus;
    createdAt: Date;
    updatedAt: Date;
    listingId: number;
    listing: Listing;
    buyerId: number;
    buyer: User;
    sellerId: number;
    seller: User;
    review?: Review;
}
  
export enum TransactionStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
/*********************end of transaction */


/*******************AdminApproval interface*********** */
export interface AdminApproval {
    id: number;
    status: ApprovalStatus;
    createdAt: Date;
    userId: number;
    user: User;
    listingId?: number;
    listing?: Listing;
}
  
export enum ApprovalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
/********************end of admin approval */
