import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password, ...userData } = body

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                ...userData,
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}

