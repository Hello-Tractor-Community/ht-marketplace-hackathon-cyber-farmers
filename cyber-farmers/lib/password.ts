import bcryptjs from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return bcryptjs.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword)
}

