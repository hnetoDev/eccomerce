import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { PiXLogo } from "react-icons/pi";

export default function Footer() {
  return (
    <div className="w-full mt-6">
      <div className="bg-primary  py-12">
        <div className="w-full px-8"><h1 className="text-center text-4xl font-bold text-white ">Receba novidades da <span className="text-black">MenthosFit</span></h1></div>
        <div className="flex items-center justify-center space-x-2 mt-5">
          <div className={`  duration-200 flex bg-white rounded-3xl  focus-within:border-primary  py-4 md:px-8 p-3 items-center space-x-2 w-1/2`}>
            <MdOutlineEmail size={20} className="text-muted-foreground" />
            <input type="text" onChange={() => {
            }} placeholder="exemple@gmail.com" className=" bg-transparent p-0 w-full border-0 outline-0" />
          </div>
          <button className="bg-black text-primary  py-4 p-3 md:px-8 rounded-3xl">Enviar</button>
        </div>
      </div>
      <div className="bg-primary/10 w-full flex flex-col ">
        <div className=" flex md:flex-row flex-col px-12   md:p-20 md:space-x-20 md:space-y-0 space-y-16 justify-between">
          <div className="md:w-1/3 flex flex-col ">
            <div className="md:w-full md:visible md:relative w-0 fixed invisible">
              <Link href={{ pathname: '/' }}>
                <Image src={'/images/logoMenthosBlack.png'} alt="Logo da loja" width={130} height={30} className="rounded-lg dark:w-0 w-32 dark:fixed dark:invisible  overflow-y-visible " />
                <Image src={'/images/logoMenthos.png'} alt="Logo da loja" width={130} height={30} className="rounded-lg w-0 fixed invisible dark:w-32 dark:relative dark:visible  overflow-y-visible " />
              </Link>
              <h1 className="text-3xl font-bold mt-2">MenthosFit</h1>
              <p className="text-muted-foreground text-sm mt-2">Aqui fica a descrição da loja fala alguma coisa sobre  tal, explica teu diferencial e etc seja criativo adsad asdiada oa ei</p>
            </div>
            <div className="flex-col  mt-5">
              <div className="flex space-x-4 border border-primary rounded-2xl w-full md:w-44 h-12 justify-center items-center  mt-3">
                <Link href={'https://www.instagram.com/'} target="_blank">
                  <FaInstagram size={20} className=" cursor-pointer hover:h-6 w-6 hover:text-primary duration-200 transition-all" />
                </Link>
                <Link href={'https://www.facebook.com/'} target="_blank">
                  <FaFacebook size={20} className=" cursor-pointer hover:h-6 w-6 hover:text-primary duration-200 transition-all" />
                </Link>
                <Link href={'https://www.tiktok.com/'} target="_blank">
                  <IoLogoTiktok size={20} className=" cursor-pointer hover:h-6 w-6 hover:text-primary duration-200 transition-all" />
                </Link>
                <Link href={'https://www.tiktok.com/'} target="_blank">
                  <PiXLogo size={20} className=" cursor-pointer hover:h-6 w-6 hover:text-primary duration-200 transition-all" />
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col items-center">
            <h1>Links</h1>
            <div className="flex flex-col items-center space-y-4 mt-5">
              <Link href={'/'} className="text-muted-foreground text-sm">Home</Link>
              <Link href={'/'} className="text-muted-foreground text-sm">Produtos</Link>
              <Link href={'/'} className="text-muted-foreground text-sm">Sobre nós</Link>
              <Link href={'/'} className="text-muted-foreground text-sm">Contato</Link>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col  items-center ">
            <h1 className="">Atendimento</h1>
            <p className="text-muted-foreground text-sm">Seg a Sex das 8h às 12h | das 13h30 às 18h</p>
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-4">
                <FaWhatsapp className="w-6 h-6 text-primary" />
                <div>
                  <h1>Whatsapp:</h1>
                  <Link href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%20gostaria%20de%20fazer%20um%20pedido" target="_blank" className="text-sm text-muted-foreground">(11) 99999-9999</Link>
                </div>
              </div>
              <div className="flex space-x-4 items-center">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <h1>Telefone</h1>
                  <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                </div>
              </div>
              <div className="flex space-x-4 items-center">
                <MdOutlineEmail className="w-6 h-6 text-primary" />
                <div>
                  <h1>Email:</h1>
                  <p className="text-sm text-muted-foreground">hnetorocha@gmail.com</p>
                </div>
              </div>
              <div className="flex space-x-4 items-center">
                <CiLocationOn className="w-6 h-6 text-primary" />
                <div>
                  <h1>Endereço:</h1>
                  <p className="text-sm text-muted-foreground">rua adsasas,45 asdadas adsa fee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:mt-0 mt-16 justify-center items-center">
          <h1>Método de pagamento</h1>
          <div className="flex justify-center space-x-6 items-center">
            <Image src={'/images/pix.svg'} alt="Logo da loja" width={40} height={40} className="rounded-lg " />
            <Image src={'/images/visa.svg'} alt="Logo da loja" width={40} height={40} className="rounded-lg " />
            <Image src={'/images/masterCard.svg'} alt="Logo da loja" width={40} height={40} className="rounded-lg " />
            <Image src={'/images/elo.png'} alt="Logo da loja" width={40} height={40} className="rounded-lg " />
            <Image src={'/images/hipercard.png'} alt="Logo da loja" width={40} height={40} className="rounded-lg " />


          </div>
        </div>
        <div className="w-full px-12 py-5 flex-col md:flex-row items-center md:items-start flex justify-between">
          <h1 className="text-muted-foreground text-sm">espaco cnpj 12.131.324/0001-40</h1>
          <div className="flex space-x-2">
            <h1>Criado com</h1>
            <h1 className="font-bold">bearShop</h1>
          </div>
        </div>
      </div>

    </div>
  )
}