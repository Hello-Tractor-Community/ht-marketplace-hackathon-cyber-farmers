'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Specification {
    engineModel: string;
    horsepower: number;
    fuelType: string;
}

interface Listing {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    location?: string;
    status?: string;
    specification?: Specification;
}

export default function TractorDetails() {
    const { id } = useParams();
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListing();
    }, []);

    async function fetchListing() {
        try {
            const response = await fetch(`/api/listings?id=${id}`);
            if (!response.ok) throw new Error('Failed to fetch listing');
            const data = await response.json();
            setListing(data);
        } catch (error) {
            console.error('Error fetching listing:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (!listing) return <p>Listing not found.</p>;

    return (
        <div className="p-8 border rounded">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            <p>{listing.description}</p>
            <p className="text-xl">Price: ${listing.price}</p>
            {listing.location && <p>Location: {listing.location}</p>}
            {listing.status && <p>Status: {listing.status}</p>}

            {listing.images?.map((img, index) => (
                <Image key={index} src={img} width={500} height={500} alt={listing.title} />
            ))}

            {listing.specification && (
                <div className="mt-4">
                    <p><strong>Engine Model:</strong> {listing.specification.engineModel}</p>
                    <p><strong>Horsepower:</strong> {listing.specification.horsepower} HP</p>
                    <p><strong>Fuel Type:</strong> {listing.specification.fuelType}</p>
                </div>
            )}
        </div>
    );
}
