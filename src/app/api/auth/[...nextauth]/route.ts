import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const nextOptions : NextAuthOptions = {
  session:{
    strategy:'jwt',
    maxAge:30*24*60*60,
  },
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:'/app/authenticator',
    signOut:'/app/authenticator',
    newUser:'/app/authenticator',
  },
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      return token;
    },
    async session({session,token,newSession}) {
      if(session.user){
        session.user.name = token.picture as string
        session.user.name = token.id as string
        session.user.email = token.email as string
     
      }
      return session;
    },
    async signIn({account,profile}){
      console.log({account,profile})
      if(account?.provider === 'google'){
        console.log(profile,account);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`,{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },body:JSON.stringify({
            profile,
            account,
            storeId:"cb9af065-82d3-4a8b-a696-971674f3569f"
          })
        })
        
        return res.ok
      }
      if(account?.provider === 'credentials'){
        return true
      }
      return false;
    }
  },
  providers:[
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID!,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
    },
  ),
  CredentialsProvider({
      credentials: {
        email: {},
        password:{},
        storeId:{}
      },
      async authorize(credentials,req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/authCredentials`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            storeName:credentials?.storeId, 
            email:credentials?.email,
            password:credentials?.password
          })
        })
        if(res.ok){
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

export {handler as GET,handler as POST}
