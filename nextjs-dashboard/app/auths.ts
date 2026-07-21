"use server";
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function getUser(email: string): Promise<User | null> {
  try {
    const rows = await sql<User[]>`
      SELECT id, name, email, password
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;
    return rows[0] ?? null;
  } catch (error) {
    console.error('Failed to load user', error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = CredentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
