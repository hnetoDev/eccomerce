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
    signIn:'/auth',
    signOut:'/auth',
    newUser:'/auth'
  },
  callbacks:{
    
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
            account
          })
        })
        
        return res.ok
      }
      return false;
    }
  },
  providers:[
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID!,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
      
    },),
    /* CredentialsProvider({
      credentials: {
        email: {},
        password:{},
      },
      async authorize(credentials,req) {

      }
    }) */
  ]
}
const handler = NextAuth(nextOptions)

export {handler as GET,handler as POST}
