import { signIn } from "next-auth/react";
import { getSubdomain } from "./getSubdomain";
import Cookies from 'js-cookie';

export default async function SignInGoogle({email, password}: {email: string, password: string}) {
  const storeName = getSubdomain()
  Cookies.set('storeName', storeName, { expires: 1 }) // Armazena o subdomínio em um cookie com expiração de 1 dia
  const res = await signIn('google', {
    redirect: false,
    storeName,
  })
  if(res?.ok){
    console.log(res)
    return res;
  }
  return null;
}