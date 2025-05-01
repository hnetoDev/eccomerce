import { getStoreData } from "@/lib/getStore"
import { ThemeProvider } from '@/app/context'
import '../../globals.css'
import Head from "next/head"
import Image from "next/image"
import CartCustom from "@/components/cart"
import { UserCircle } from "lucide-react"
import SheetCustom from "@/components/sheet"
import SearchDrawer from "@/components/searchDrawer"
import { CarouselDemo } from "@/components/carousel"

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { store: string }
}) {
  const store = await getStoreData('teste')
  if (store === null) {
    return (
      <html lang="pt-BR">
        <body>
          <div>Loja não encontrada</div>
        </body>
      </html>
    )
  }

  return (
    <html className="overflow-x-hidden w-screen" lang="pt-BR">
      <body className="h-screen w-screen overflow-x-hidden  overflow-y-auto">
        <ThemeProvider theme={store.theme}>
          <Head>
            <link rel="preload" as="image" href={store.theme.logoUrl} />
          </Head>

          <div className="flex flex-col">
            <CarouselDemo />
            <div className="w-full shadow-lg z-50 bg-background px-8 py-3 sticky top-0 flex justify-between items-center">
              <div className="w-2/4 flex space-x-2">
                <SheetCustom />
              </div>
              <Image src={store.theme.logoUrl} alt="Logo da loja" width={60} height={60} className="rounded-lg " />
              <div className="flex items-center justify-end w-2/4 space-x-4">
                <SearchDrawer />
                <UserCircle className="w-6 h-6" />
                <CartCustom addToCart={false} />
              </div>
            </div>

            {children}

          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
