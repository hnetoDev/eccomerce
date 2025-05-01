// lib/getStore.ts
import { Theme } from '@/types'
import 'server-only'

type Store = {
  name: string
  themeColor: string
  logoUrl: string
  theme: Theme
  // etc...
}

export async function getStoreData(slug: string): Promise<Store | null> {
  const res = await fetch(`http:/localhost:80/store/theme/${slug}`, {
    next: { revalidate: 60 }, // cache revalida a cada 60s
  })

  if (!res.ok) return null
  return res.json()
}
