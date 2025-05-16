import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import { NextResponse } from "next/server";

import { DefaultSession } from "next-auth";
import { getSubdomain } from "@/lib/getSubdomain";
import { useTheme } from "@/app/context";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Adicionando o campo id
      email: string;
      name: string;
      cpf?: string; // Adicionando o campo cpf como opcional
      image?: string;
      phone?: string; // Adicionando o campo phone como opcional
      Endereco?: {
        cep?: string,
        complemento?: string,
        bairro?: string,
        numero?: string | number,
        cidade?: string,
        estado?: string,
        rua?: string,
      }
      // Aqui você pode adicionar qualquer outro campo que quiser
      accessToken: string; // Exemplo de campo personalizado
    } & DefaultSession["user"]; // Mantém as propriedades padrão de "user"
  }
  interface JWT {
    id: string; // Adicionando o campo id
    email: string;
    name: string;
    picture?: string;
    cpf?: string; // Adicionando o campo cpf como opcional
    phone?: string;
    Endereco?: {
      cep?: string,
      complemento?: string,
      bairro?: string,
      numero?: string | number,
      cidade?: string,
      estado?: string,
      rua?: string,
    } // Adicionando o campo phone como opcional
    accessToken: string; // Exemplo de campo personalizado
  }

  interface User {
    id: string,
    name: string,
    email: string,
    image: string,
    sub: string,
    cpf?: string,
    phone?: string,
    Endereco?: {
      cep?: string,
      complemento?: string,
      bairro?: string,
      numero?: string | number,
      cidade?: string,
      estado?: string,
      rua?: string,
    }
  }
}
const nextOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/app/authenticator',
    signOut: '/app/authenticator',
    newUser: '/app/authenticator',
  },
  callbacks: {
    async jwt({ token, user,profile }) {
      if (user) {
        token.id = profile ? profile.sub : user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
        token.sub = user.sub
      }
      return token;
    },
    async session({ session, token, newSession }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        console.log(profile, account);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          }, body: JSON.stringify({
            profile,
            account,
          })
        })
        if (res.ok) {
          const user = await res.json()
          if(profile){
            profile.sub = user.id 
          }
          return true
        }
        return false
      }
      if (account?.provider === 'credentials') {
        return true
      }
      return false;
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    ),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
        storeId: {}
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/authCredentials`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            storeName: credentials?.storeId,
            email: credentials?.email,
            password: credentials?.password
          })
        })
        if (res.ok) {
          const user = await res.json()
          console.log('Logado')
          return user
        }
        return null
      }
    })
  ]
}
const handler = NextAuth(nextOptions)

export { handler as GET, handler as POST }
