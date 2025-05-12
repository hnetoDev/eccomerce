import Image from "next/image";

export default function CardSectionInfo() {
  return (
    <div className="flex md:w-max bg-primary rounded-2xl md:flex-row flex-col  justify-center items-start md:space-x-5">
      <Image src={'https://bearshop-images-s3.s3.sa-east-1.amazonaws.com//images/teste/info.webp'} width={1000} height={1000} alt="termo" className="md:w-96 md:h-96 rounded-t-2xl md:rounded-l-2xl" />
      <div className="p-6 w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl text-white font-bold text-center">Logista exclusivo 🥇💙</h1>
        <p className="mt-4">Colque sua descrição  aui</p>
        <p className="">Colque sua descrição  aui</p>
        <p className="">Colque sua descrição  aui</p>
      </div>
    </div>
  )
}