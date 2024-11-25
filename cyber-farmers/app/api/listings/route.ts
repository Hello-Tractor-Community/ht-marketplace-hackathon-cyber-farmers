import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const listing = await prisma.listing.findUnique({
            where: { id: parseInt(id) },
            include: { specification: true },
        });

        if (listing) {
            return NextResponse.json({
                ...listing,
                images: listing.images
            });
        } else {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }
    } else {
        const listings = await prisma.listing.findMany({
            include: { specification: true },
        });

        return NextResponse.json(listings);
    }
}

export async function POST(request: Request) {
    const body = await request.json()
    const listing = await prisma.listing.create({
        data: {
            ...body,
            specification: {
                create: body.specification
            }
        }
    })
    return NextResponse.json(listing)
}

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const updatedListing = await prisma.listing.update({
        where: { id: parseInt(id) },
        data: {
            ...body,
            specification: {
                update: body.specification
            }
        }
    })
    return NextResponse.json(updatedListing)
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.listing.delete({
        where: { id: parseInt(id) }
    })
    return NextResponse.json({ message: 'Listing deleted successfully' })
}

