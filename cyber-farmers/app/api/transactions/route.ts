import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const transactions = await prisma.transaction.findMany()
        return NextResponse.json(transactions)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const transaction = await prisma.transaction.create({
            data: body,
        })
        return NextResponse.json(transaction, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        const { id, ...data } = body
        const transaction = await prisma.transaction.update({
            where: { id },
            data,
        })
        return NextResponse.json(transaction)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()
        await prisma.transaction.delete({
            where: { id },
        })
        return NextResponse.json({ message: 'Transaction deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 })
    }
}

