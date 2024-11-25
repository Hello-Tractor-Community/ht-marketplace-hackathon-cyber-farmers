import { useEffect, useState, useMemo } from "react";
import { Listing, ListingStatus, Category, User, Role } from "../hello_interfaces";

interface UseProductsProps {
  filter: {
    isNew: boolean;
    under1M: boolean;
    location: string;
  };
  currentPage: number;
  itemsPerPage: number;
}

// Mock seller and images (unchanged from your original code)
const mockSeller: User = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  password: "securepassword123",
  phone: "+1234567890",
  role: Role.SELLER,
  profileImage: "/img/profile/johndoe.png",
  verified: true,
  newsletterSubscribed: false,
  createdAt: new Date("2023-01-01T10:00:00Z"),
  updatedAt: new Date("2023-01-15T15:00:00Z"),
  listings: [],
  reviews: [],
  wishlistItems: [],
  messagesSent: [],
  messagesReceived: [],
  adminApprovals: [],
  salesTransactions: [],
  purchaseTransactions: [],
};

const mockImages = ["/img/tractor-images/tr-1.png", "/img/tractor-images/tr-2.png"];

// Generate mock listings with more diverse filters
const generateMockListings = (count: number, isNew: boolean, under1M: boolean, location: string): Listing[] => {
  return Array.from({ length: count }, (_, i) => {
    const hoursUsed = isNew ? 0 : Math.floor(Math.random() * 5000);
    const price = Math.random() * (isNew ? 2000000 : 1500000) + 50000;
    const locations = ["Tanzania", "Kenya", "Nigeria", "Uganda", "South Africa"];
    const locationChoice = location || locations[i % locations.length];

    return {
      id: i + 1,
      title: `${isNew ? "New" : "Used"} Tractor ${i + 1}`,
      images: [mockImages[i % mockImages.length]],
      price: Math.round(price),
      location: locationChoice,
      status: isNew ? ListingStatus.ACTIVE : ListingStatus.PENDING,
      age: isNew ? 0 : Math.floor(Math.random() * 10 + 1),
      hoursUsed,
      specification: {
        horsepower: Math.floor(Math.random() * 200 + 50),
      } as any,
      description: "High-quality tractor for agricultural needs.",
      category: Category.TRACTOR,
      reviews: [],
      seller: mockSeller,
      sellerId: mockSeller.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      transactions: [],
      adminApprovals: [],
      wishlistItems: [],
    };
  });
};

// Custom hook to fetch and filter listings
const useProducts = (
  filters: { isNew: boolean; under1M: boolean; location: string },
  page: number,
  itemsPerPage: number
) => {
  const [products, setProducts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Generate mock listings for each filter condition
  const newProducts = generateMockListings(8, true, filters.under1M, filters.location); // 8 new tractors
  const usedProducts = generateMockListings(8, false, filters.under1M, filters.location); // 8 used tractors
  const under1MProducts = generateMockListings(8, filters.isNew, true, filters.location); // 8 tractors under 1M
  const locationProducts = generateMockListings(8, filters.isNew, filters.under1M, filters.location); // 8 tractors for the selected location

  const allListings = [...newProducts, ...usedProducts, ...under1MProducts, ...locationProducts];
  const memoizedFilter = useMemo(() => filters, [filters.isNew, filters.under1M, filters.location]);

  useEffect(() => {
    setLoading(true); // Set loading state when filters, page, or itemsPerPage change

    const fetchData = () => {
      // Filter the listings based on the criteria
      const filteredListings = allListings.filter((listing) => {
        const meetsCondition = filters.isNew ? listing.hoursUsed === 0 : listing.hoursUsed > 0;
        const meetsPrice = filters.under1M ? listing.price < 1000000 : true;
        const meetsLocation = filters.location === "all" ? true : listing.location === filters.location;

        return meetsCondition && meetsPrice && meetsLocation;
      });

      console.log("Filtered Listings: ", filteredListings); // Debugging the filter

      // Paginate the results
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);

      setProducts(paginatedListings); // Update the products state with filtered listings
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, [memoizedFilter, page, itemsPerPage]); // Only rerun effect if these values change

  return { products, loading }; // Return the products and loading states
};

export default useProducts;
