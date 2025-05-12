export type CollectionAndProds = {
  id:string,
  name:string,
  produtos:{
    id:string,
    name:string,
    image:string[],
    price:string,
    pricePromo:string
  }[]
}

export type DataInit = {
  id: string,
  name: string,
  image: string,
  favIcon: string
  colorPrimary: string,
  topSlider: string[],
  banner: string[],
  Collection:{
    id:string,
    name:string,
    produtos:{
      id:string,
      name:string,
      image:string[],
      price:string,
      pricePromo:string
    }[]
  }[]
}

export type Theme = {
  storeId:string
  name:string
  primaryColor: string
  backgroundColor: string
  logoUrl: string
}


export type Product = {
  id: string,
  name: string,
  estoque: number,
  price: number,
  peso?: number,
  largura?: number,
  comprimento?: number,
  altura?: number,
  codigoBarras?: string,
  codigoSKU?: string,
  image?: string[],
  desc?: string,
  destaque?: boolean,
  status?: boolean
  pricePromo?: number,
  collections: {
    id: string,
    name: string
  }[],
  selectedVariants?: {
    name: string,
    values: string[]
  }[],
  createdAt: string,
  ProductsVariants: {
    id?: string,
    name: string,
    price?: string,
    pricePromo?: string,
    custo?: string,
    image?: string | File,
    estoque?: number,
    codigoBarras?: string,
    codigoSKU?: string,
    peso?: string,
    comprimento?: string,
    altura?: string,
    largura?: string,
    variantAtributos: {
      id: string,
      name: string,
      Variant: {
        name: string
      }
    }[]
  }[]
}


type ProductCart = {
  name: string,
  id: string,
  img: string,
  price: number,
  qtd: number,
  pricePromo?: number,
  variantName?: string,
}