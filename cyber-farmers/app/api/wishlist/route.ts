import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    try {
        const wishlistItems = await prisma.wishlist.findMany({
            where: { userId: parseInt(userId) },
            include: { listing: true },
        })
        return NextResponse.json(wishlistItems)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { userId, listingId } = body

        const wishlistItem = await prisma.wishlist.create({
            data: { userId, listingId },
        })
        return NextResponse.json(wishlistItem, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const listingId = searchParams.get('listingId')

    if (!userId || !listingId) {
        return NextResponse.json({ error: 'User ID and Listing ID are required' }, { status: 400 })
    }

    try {
        await prisma.wishlist.delete({
            where: {
                userId_listingId: {
                    userId: parseInt(userId),
                    listingId: parseInt(listingId),
                },
            },
        })
        return NextResponse.json({ message: 'Item removed from wishlist' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 })
    }
}

