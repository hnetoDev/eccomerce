'use client'
import React from "react"
import CarouselProd from "@/components/carouselProd"
import CartCustom from "@/components/cart"
import { Product } from "@/types"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { StarFilledIcon } from "@radix-ui/react-icons"
import { BicepsFlexed, HeartIcon, HospitalIcon, UploadIcon } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MdOutlineAddShoppingCart } from "react-icons/md"
import { useQuery } from "@tanstack/react-query"
import CardSection2 from "@/components/cardSection2"
import CardSection3 from "@/components/cardSection3"

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/findOne/${id}`)
  if (!res.ok) throw new Error('Erro ao buscar dados')
  return await res.json();
}

export default function PageProd({ params }: { params: { id: string } }) {


  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ['product'],
    enabled: !!params.id,
    queryFn: () => getProduct(params.id),
  })

  const [imageSelected, setImageSelected] = useState<string>()
  const [desconto, setDesconto] = useState<number[] | undefined>(undefined)
  const [selectedVariant, setSelectedVariant] = useState<{ name: string, value: string }[]>()
  const [productSelect, setProductSelect] = useState<Product['ProductsVariants'][0]>()
  const [qtd, setQtd] = useState<number>(1)


  useEffect(() => {
    setImageSelected(data?.image ? data.image[0] : undefined)
    setDesconto(() => {
      if (data?.pricePromo) {
        const desconto = (data.price - data.pricePromo)
        const porcentagem = (desconto / data.price) * 100
        return [desconto, porcentagem]
      }
      return undefined
    })
    if (data) {
      if (data.ProductsVariants && data.ProductsVariants.length > 0) {
        setProductSelect(data.ProductsVariants[0])
        setSelectedVariant(() => {
          const variants = data.ProductsVariants[0].variantAtributos.map(v => {
            return {
              name: v.Variant.name,
              value: v.name
            }
          })
          return variants
        })
        setDesconto(() => {
          if (data.ProductsVariants[0].pricePromo) {
            const price = data.ProductsVariants[0].price
            const pricePromo = data.ProductsVariants[0].pricePromo
            if (!price || !pricePromo) return undefined
            const desconto = (Number(price) - Number(pricePromo))
            const porcentagem = (desconto / Number(price)) * 100


            return [desconto, porcentagem]
          }
          return undefined
        })

      }
    }
  }, [data])




  const handleSelectAttribute = (name: string, value: string) => {
    setSelectedVariant((prev) => {
      if (!prev) return []
      if (!data) return prev
      // Atualiza o atributo selecionado ou adiciona um novo
      const updated = [...prev.filter((attr) => attr.name !== name), { name, value }];

      // Encontra a variante correspondente aos atributos selecionados
      const matchedVariant = data.ProductsVariants.find((variant) =>
        updated.every((attr) =>
          variant.variantAtributos.some(
            (vAttr) => vAttr.name === attr.value && vAttr.Variant.name === attr.name
          )
        )
      );

      // Atualiza o produto ativo se uma variante correspondente for encontrada
      if (matchedVariant) {
        setProductSelect(matchedVariant);
      } else {
        setProductSelect(data.ProductsVariants[0]);
        setSelectedVariant(() => {
          const variants = data.ProductsVariants[0].variantAtributos.map(v => {
            return {
              name: v.Variant.name,
              value: v.name
            }
          })
          return variants
        })
      }

      return updated;
    });
  };

  return <div className="w-full py-8 px-16 bg-zinc-50">
    <div className="w-full flex justify-center items-center">
      <CardSection3 />
    </div>
    <div className="flex mt-4 w-full space-x-6">
      <div className="w-7/12 bg-background shadow-lg p-6 rounded-xl flex">
        <div>
          {data?.image ? <CarouselProd images={data?.image} /> : <div className="w-full">
            <div className="w-full bg-muted h-96 rounded-lg"></div>
            <div className={` cursor-pointer border mt-2 w-12 h-12 duration-200 transition-all rounded-lg p-2 overflow-hidden hover:opacity-35  `} ></div>
          </div>}
        </div>
      </div>
      <div className="w-5/12 h-max flex-col flex  bg-background shadow-lg p-6 rounded-xl">
        <div className="border-b pb-2 w-full h-max border-muted ">
          <h1 className="text-4xl">{data?.name} {productSelect?.name}</h1>
          <div className="flex items-center space-x-2">
            <h1 className="text-yellow-400 text-xl">{'★'.repeat(5)}</h1>
            <h1 className="text-muted-foreground text-sm">5 avaliações</h1>
          </div>
        </div>
        <div className="">
          {data?.selectedVariants ? data.selectedVariants.map(v => {
            return <div key={v.name} className="mt-4">
              <h1 className="font-bold">{v.name}:</h1>
              <div className="flex mt-2 space-x-2">
                {v.values.map((va, i) => {
                  return <button key={i} onClick={() => { handleSelectAttribute(v.name, va) }} className={`  rounded-lg px-3 py-2 hover:cursor-pointer ${selectedVariant?.find(p => {
                    return p.name === v.name && p.value === va
                  }) ? 'bg-orange-500' : selectedVariant?.some(
                    (selAttr) => selAttr.value === va && selAttr.name === v.name
                  )
                    ? 'active'
                    : ' bg-muted'
                    }`}>
                    <h1 className="text-sm font-bold">{va}</h1>
                  </button>
                })}
              </div>
            </div>
          }) : null}
        </div>
        <div className="mt-6">
          <h1 className="text-muted-foreground line-through">R${Number(data?.price).toFixed(2)}</h1>
          <h1 className="text-3xl text-primary font-bold">R${Number(data?.pricePromo).toFixed(2)}</h1>
          <h1 className="text-muted-foreground ">3x de 22.50 sem juros</h1>
          <h1 className="text-primary">5% de desconto no pix</h1>
        </div>
        <div className="w-full space-x-2 flex mt-4">
          <div className="flex border p-1 md:p-3 w-max rounded-lg space-x-1">
            <div onClick={() => {
              setQtd(prev => {
                if (prev === 1 || prev < 2) return prev
                return prev - 1
              })
            }} className=" dark:hover:bg-opacity-65 flex text-lg hover:cursor-pointer font-bold justify-center items-center p-1 rounded-full w-6 h-6">
              -
            </div>
            <div className="  flex justify-center text-sm items-center p-1 rounded-full w-6 h-6">
              {qtd}
            </div>
            <div onClick={() => {
              setQtd(prev => {
                return prev + 1
              })
            }} className=" dark:hover:bg-opacity-65 flex text-lg hover:cursor-pointer  justify-center items-center p-1 rounded-full w-6 h-6">
              +
            </div>
          </div>
          <button className="bg-primary p-3 w-full rounded-lg">Comprar</button>
        </div>

      </div>
    </div>
  </div>




  { /* <div className="flex bg-zinc-50 flex-col mt-4">

    <div className="px-6 flex">
      
      <div className=" w-full flex mt-3">
        {data?.image ? <CarouselProd images={data?.image} /> : <div className="w-full">
          <div className="w-full bg-muted h-96 rounded-lg"></div>
          <div className={` cursor-pointer border mt-2 w-12 h-12 duration-200 transition-all rounded-lg p-2 overflow-hidden hover:opacity-35  `} ></div>
        </div>}

      </div>
      <div className="w-full mt-5">

        <div className="border-b border-muted pb-3">
          <div className=" flex items-center justify-between">
            <h1 className="text-2xl font-bold ">{data?.name} {productSelect?.name}</h1>
            <div className="border rounded-lg p-3">
              <UploadIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex">
            <StarFilledIcon className="text-yellow-400 w-5 h-5" />
            <StarFilledIcon className="text-yellow-400 w-5 h-5" />
            <StarFilledIcon className="text-yellow-400 w-5 h-5" />
            <StarFilledIcon className="text-yellow-400 w-5 h-5" />
            <StarFilledIcon className=" w-5 h-5" />
          </div>
        </div>


        <div className="flex space-x-2 mt-8">
          <h1 className="font-bold">Preço:</h1>
          <div className="">
            <p className="text-muted-foreground line-through">R$ {productSelect ? Number(productSelect.price).toFixed(2) : data?.price ? Number(data.price).toFixed(2) : ''}</p>
            <div className="flex items-center mt-1 space-x-4">
              <h1 className="text-3xl font-extrabold text-green-500">R$ {productSelect ? Number(productSelect.pricePromo).toFixed(2) : data?.pricePromo ? Number(data.pricePromo).toFixed(2) : ''}</h1>
              <h1 className="border rounded-lg font-bold py-1 px-3"> - {desconto ? desconto[1].toFixed(2) : null}%</h1>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {data?.selectedVariants ? data.selectedVariants.map(v => {
            return <div key={v.name} className="mt-4">
              <h1 className="font-bold">{v.name}:</h1>
              <div className="flex mt-2 space-x-2">
                {v.values.map((va, i) => {
                  return <button key={i} onClick={() => { handleSelectAttribute(v.name, va) }} className={`  rounded-lg px-3 py-2 hover:cursor-pointer ${selectedVariant?.find(p => {
                    return p.name === v.name && p.value === va
                  }) ? 'bg-orange-500' : selectedVariant?.some(
                    (selAttr) => selAttr.value === va && selAttr.name === v.name
                  )
                    ? 'active'
                    : ' bg-muted'
                    }`}>
                    <h1 className="text-sm font-bold">{va}</h1>
                  </button>
                })}
              </div>
            </div>
          }) : null}
        </div>


      </div>
    </div>
    <div className=" left-0 px-4 flex space-x-4 justify-between items-center right-0 bg-background py-3 rounded-t-2xl sticky bottom-0 ">
      <button className="p-4 w-2/3 flex justify-center items-center rounded-3xl bg-orange-500">
        <h1 className="font-bold">Comprar</h1>
      </button>
      <HeartIcon className="w-8 h-8" />
    </div>
  </div> */
  }
}