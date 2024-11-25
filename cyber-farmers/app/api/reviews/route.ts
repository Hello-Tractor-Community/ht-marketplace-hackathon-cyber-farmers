import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const reviews = await prisma.review.findMany()
        return NextResponse.json(reviews)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const review = await prisma.review.create({
            data: body,
        })
        return NextResponse.json(review, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        const { id, ...data } = body
        const review = await prisma.review.update({
            where: { id },
            data,
        })
        return NextResponse.json(review)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()
        await prisma.review.delete({
            where: { id },
        })
        return NextResponse.json({ message: 'Review deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
    }
}

