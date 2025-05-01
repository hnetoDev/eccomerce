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
  name:string
  primaryColor: string
  backgroundColor: string
  logoUrl: string
}
