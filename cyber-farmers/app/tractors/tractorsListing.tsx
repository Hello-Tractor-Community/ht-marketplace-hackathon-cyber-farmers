'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Specification {
    engineModel: string
    horsepower: number
    fuelType: string
}

interface Listing {
    id: number
    title: string
    description: string
    price: number
    images: string[]
    location?: string
    status?: string
    specification?: Specification
}

export default function TractorsComponent() {
    const [listings, setListings] = useState<Listing[]>([])
    const [newListing, setNewListing] = useState({ title: '', description: '', price: 0, image: '' })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchListings()
    }, [])

    async function fetchListings() {
        setLoading(true)
        try {
            const response = await fetch('/api/listings')
            if (!response.ok) throw new Error('Failed to fetch listings')
            const data = await response.json()
            setListings(data)
        } catch (error) {
            console.error('Error fetching listings:', error)
        } finally {
            setLoading(false)
        }
    }

    async function createListing(e: React.FormEvent) {
        e.preventDefault()
        try {
            const response = await fetch('/api/listings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newListing),
            })
            if (!response.ok) throw new Error('Failed to create listing')
            setNewListing({ title: '', description: '', price: 0, image: '' })
            fetchListings()
        } catch (error) {
            console.error('Error creating listing:', error)
        }
    }

    async function updateListing(id: number, updatedData: Partial<Listing>) {
        try {
            const response = await fetch(`/api/listings?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            })
            if (!response.ok) throw new Error('Failed to update listing')
            fetchListings()
        } catch (error) {
            console.error('Error updating listing:', error)
        }
    }

    async function deleteListing(id: number) {
        try {
            const response = await fetch(`/api/listings?id=${id}`, { method: 'DELETE' })
            if (!response.ok) throw new Error('Failed to delete listing')
            fetchListings()
        } catch (error) {
            console.error('Error deleting listing:', error)
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <form onSubmit={createListing} className="mb-8">
                <input
                    type="text"
                    value={newListing.title}
                    onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                    placeholder="Title"
                    className="border p-2 mr-2"
                    required
                />
                <input
                    type="text"
                    value={newListing.description}
                    onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                    placeholder="Description"
                    className="border p-2 mr-2"
                    required
                />
                <input
                    type="number"
                    value={newListing.price}
                    onChange={(e) => setNewListing({ ...newListing, price: Number(e.target.value) })}
                    placeholder="Price"
                    className="border p-2 mr-2"
                    required
                />
                <input
                    type="file"
                    value={newListing.image}
                    onChange={(e) => setNewListing({ ...newListing, image: e.target.value })}
                    placeholder="Image URL"
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Create Tractor
                </button>
            </form>

            <ul>
                {listings.map((listing) => (
                    <li key={listing.id} className="mb-4 p-4 border rounded">
                        <h2 className="text-xl font-bold">{listing.title}</h2>
                        <p>{listing.description}</p>
                        <p>Price: ${listing.price}</p>
                        {listing.location && <p>Location: {listing.location}</p>}
                        {listing.status && <p>Status: {listing.status}</p>}

                        {listing.images?.map((img, index) => (
                            <Image key={index} src={img} width={500} height={500} alt={listing.title} />
                        ))}

                        <Link href={`/tractors/${listing.id}`} className="text-blue-500 underline">
                            View Details
                        </Link>

                        <div className="mt-4">
                            <button
                                onClick={() => updateListing(listing.id, { price: listing.price + 10 })}
                                className="bg-green-500 text-white p-2 rounded mr-2"
                            >
                                Increase Price
                            </button>
                            <button
                                onClick={() => deleteListing(listing.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
