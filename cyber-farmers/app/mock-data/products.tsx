/*import { useEffect, useState } from "react";
import Image from "next/image";
import { Listing, ListingStatus, Category, Transaction, AdminApproval, Wishlist,  User, Role} from "../hello_interfaces"; // Adjust the path to your interface file

const useProducts = (filterCondition: string) => {
    const mockSeller: User = {
      id: 1,
      firstName: "John",

    };
    // Mock data generation
    const generateMockListings = (
      count: number,
      filters: { isNew: boolean; under1M: boolean; location: string }
    ): Listing[] => {
      const mockListings: Listing[] = [];
      for (let i = 1; i <= count; i++) {
        const isNew = filters.isNew;
        const price = filters.under1M ? Math.random() * 999000 + 1000 : Math.random() * 2000000 + 1000000;

        mockListings.push({
          id: i,
          title: `${isNew ? "New" : "Used"} Tractor ${i}`,
          images: [`/tractor-images/tractor-${i}.jpg`], 
          price: Math.round(price),
          location: filters.location,
          status: ListingStatus[isNew ? "ACTIVE" : "PENDING"], // Optional for now
          age: isNew ? 0 : Math.floor(Math.random() * 10 + 1),
          hoursUsed: isNew ? 0 : Math.floor(Math.random() * 5000),
          specification: {
            horsepower: Math.floor(Math.random() * 200 + 50),
          } as any, // Partial specification data
          description: "", 
          category: Category.TRACTOR, 
          reviews: [], // Placeholder for review integration
          seller:  mockSeller, // Placeholder
          sellerId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
          transactions: [],
          adminApprovals: [],
          wishlistItems: []
        });
      }
      return mockListings;
    };

    // Example mock data
    const mockProducts = [
      ...generateMockListings(8, { isNew: true, under1M: true, location: "California" }),
      ...generateMockListings(8, { isNew: false, under1M: false, location: "Texas" }),
    ];

    // Fetch data function
    const fetchListings = async (useMock = true): Promise<Listing[]> => {
      if (useMock) {
        return Promise.resolve(mockProducts);
      }
      // Replace with actual API endpoint
      const response = await fetch("/api/listings");
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
      return response.json();
    };

  };

  export default useProducts;  */