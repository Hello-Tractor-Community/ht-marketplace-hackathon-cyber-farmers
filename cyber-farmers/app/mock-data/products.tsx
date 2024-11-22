// Import the Product interface
import { Product } from "./types/Product";

// Mock data for products
export const mockProducts: Product[] = [
  // 8 new products
  {
    id: "1",
    brandName: "John Deere",
    type: "Tractor",
    power: "100 HP",
    reviews: 4.5,
    image: "/img/tractor-images/JD_6XXXB_OOS.png",
    price: 950000,
    age: "2 years",
    miles: "0 miles",
    location: "Nairobi",
    condition: "new",
    fastMoving: false,
  },
  {
    id: "2",
    brandName: "Kubota",
    type: "Tractor",
    power: "120 HP",
    reviews: 4.2,
    image: "/img/bg/hero-section-bg.png",
    price: 890000,
    age: "1 year",
    miles: "500 miles",
    location: "Mombasa",
    condition: "new",
    fastMoving: true,
  },
  // Add 6 more "new" products...

  // 8 used products
  {
    id: "9",
    brandName: "Massey Ferguson",
    type: "Tractor",
    power: "90 HP",
    reviews: 4.8,
    image: "/img/bg/hero-section-bg.png",
    price: 720000,
    age: "5 years",
    miles: "4000 miles",
    location: "Eldoret",
    condition: "used",
    fastMoving: false,
  },
  // Add 7 more "used" products...

  // 8 fast-moving products
  {
    id: "17",
    brandName: "Case IH",
    type: "Tractor",
    power: "110 HP",
    reviews: 4.9,
    image: "/img/bg/hero-section-bg.png",
    price: 1200000,
    age: "3 years",
    miles: "2500 miles",
    location: "Nakuru",
    condition: "new",
    fastMoving: true,
  },
  // Add 7 more "fast-moving" products...

  // 8 near-me products
  {
    id: "25",
    brandName: "New Holland",
    type: "Tractor",
    power: "80 HP",
    reviews: 4.7,
    image: "/img/bg/hero-section-bg.png",
    price: 850000,
    age: "4 years",
    miles: "3500 miles",
    location: "Kisumu", // Ensure to adjust 'location' dynamically based on user's filter
    condition: "used",
    fastMoving: true,
  },
  {
    id: "25",
    brandName: "New Holland",
    type: "Tractor",
    power: "80 HP",
    reviews: 4.7,
    image: "/img/bg/hero-section-bg.png",
    price: 850000,
    age: "4 years",
    miles: "3500 miles",
    location: "Kisumu", // Ensure to adjust 'location' dynamically based on user's filter
    condition: "used",
    fastMoving: true,
  },
  // Add 7 more "near-me" products...

  // 8 under 1M Ksh products
  {
    id: "33",
    brandName: "Mahindra",
    type: "Tractor",
    power: "75 HP",
    reviews: 4.4,
    image: "/img/bg/hero-section-bg.png",
    price: 700000,
    age: "6 years",
    miles: "5000 miles",
    location: "Garissa",
    condition: "used",
    fastMoving: false,
  },
  // Add 7 more "under 1M Ksh" products...
];
