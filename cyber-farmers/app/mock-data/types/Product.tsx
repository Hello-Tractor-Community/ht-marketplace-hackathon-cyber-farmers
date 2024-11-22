export interface Product {
    id: string;
    brandName: string;
    type: string;
    power: string;
    reviews: number;
    image: string;
    price: number;
    age: string;
    miles: string;
    location: string;
    condition: "new" | "used";
    fastMoving: boolean;
  }
  