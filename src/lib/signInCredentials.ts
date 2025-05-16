import { signIn } from "next-auth/react";
import { getSubdomain } from "./getSubdomain";

export default async function SignInCredentials({email, password}: {email: string, password: string}) {
  const storeName = getSubdomain()
  const res = await signIn('credentials', {
    redirect: false,
    storeName: 'teste',
    email,
    password,
  })
  if(res?.ok){
    console.log(res)
    return res;
  }
  return null;
}
