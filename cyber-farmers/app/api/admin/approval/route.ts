import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { listingId, status } = body

        const approval = await prisma.adminApproval.create({
            data: {
                listingId,
                status,
                userId: 1,
            },
        })

        if (status === 'APPROVED') {
            await prisma.listing.update({
                where: { id: listingId },
                data: { status: 'ACTIVE' },
            })
        }

        return NextResponse.json(approval, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process approval' }, { status: 500 })
    }
}

