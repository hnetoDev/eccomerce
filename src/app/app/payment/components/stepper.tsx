'use client'
import InputMask from 'react-input-mask';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StepIcon } from '@mui/material';
import { CreditCard, EditIcon, IdCardIcon, ShoppingCartIcon } from 'lucide-react';
import { PersonIcon } from '@radix-ui/react-icons';
import { MdPayment, MdPix } from 'react-icons/md';
import { ScrollArea } from "@/components/ui/scroll-area"

import { IoTrashOutline } from 'react-icons/io5';
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from "react-hook-form"
import { CiDeliveryTruck, CiMoneyBill } from 'react-icons/ci';
import AccordionPayment from '@/components/accordionPayment';
import { FaShopify } from 'react-icons/fa';
import DialogPayment from '@/components/dialog';
import CircularIndeterminate from '@/components/progress';
import { useRouter } from 'next/navigation';

export default function StepperCustom() {
  const router = useRouter()

  const [total, setTotal] = React.useState<number>(0)
  const [delivery, setDelivery] = React.useState<boolean>(true)
  const [data, setData] = React.useState<{ name: string, img: string, id: string, price: number, qtd: number }[]>()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [edite, setEdite] = React.useState<boolean>(false)
  const [pix, setPix] = React.useState<boolean>(true)
  const [dinheiro, setDinheiro] = React.useState<boolean>(false)
  const [cartao, setCartao] = React.useState<boolean>(false)
  const form = useForm();
  const [dataUser, setDataUser] = React.useState<{
    id: string, cpf: string, email: string, endereco: {
      cep: string,
      bairro: string,
      rua: string,
      numero: number,
      desc: string,
    }
  }>()
  const session = useSession();
  React.useEffect(() => {
    function getData() {
      const dataCart = localStorage.getItem('cartItem');
      if (dataCart) {
        const dataT = JSON.parse(dataCart);
        setData(dataT)
        calcTotal()
      }
    }

    getData()
  }, [session])


  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    alert('inicia')
    if (dataUser?.id) {
      alert(dataUser.id)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/updateInfoExtra`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          id: dataUser.id,
          cpf: data.cpf,
          rua: data.rua,
          bairro: data.bairro,
          cidade: data.cidade,
          numero: data.numero
        })
      })
      if (res.ok) {
        return true
      }
      return false;
    }
    return false;
  })










  const handleDown = (id: string) => {
    const dataCart = localStorage.getItem('cartItem');
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: number, qtd: number }[] = JSON.parse(dataCart);

      const findId = dataT.find(d => d.id === id)
      if (findId!.qtd < 2) {
        const rest = [...dataT].filter(d => d.id !== id);
        if (rest.length > 0) {
          setData(rest);
          return localStorage.setItem('cartItem', JSON.stringify([...rest]))
        }
        setData([]);
        localStorage.removeItem('cartItem')
        return calcTotal()

      }
      const newCart = dataT.map(d => {
        if (d.id === id) {
          d.qtd--;
        }
        return d;
      })

      setData(newCart);
      localStorage.setItem('cartItem', JSON.stringify([...newCart]))
      return calcTotal()
    }

  }
  const handleUp = (id: string) => {
    const dataCart = localStorage.getItem('cartItem');
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: number, qtd: number }[] = JSON.parse(dataCart);

      const newCart = dataT.map(d => {
        if (d.id === id) {
          d.qtd++
        }
        return d;
      })

      setData(newCart);
      localStorage.setItem('cartItem', JSON.stringify([...newCart]))
      return calcTotal()

    }
  }

  const handleDelete = (id: string) => {
    const dataCart = localStorage.getItem('cartItem');
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: number, qtd: number }[] = JSON.parse(dataCart);
      const rest = dataT.filter(d => d.id !== id)
      if (rest.length > 0) {
        setData(rest);
        return localStorage.setItem('cartItem', JSON.stringify([...rest]));
      }
      setData([]);

      localStorage.removeItem('cartItem')
      return calcTotal()

    }
  }




  function calcTotal() {
    const dataCart = localStorage.getItem('cartItem')
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: number, qtd: number }[] = JSON.parse(dataCart);
      let total: number = 0;
      dataT.map(d => {
        total += d.qtd * d.price;
        return
      })
      return setTotal(total);
    }
    return setTotal(0)
  }




  const childrens = [
    {
      steps: <div className='flex items-center justify-center space-x-2' key={1}><ShoppingCartIcon className='text-white w-6 h-6' /><h1 className='text-white invisible w-0 md:w-full md:visible '>Carrinho</h1></div>,
      children: <div key={1} className="flex flex-col">
        <div className="flex break:flex-row flex-col space-y-4 break:space-y-0 justify-center items-center w-full break:space-x-4">
          <div className="break:w-1/2 space-y-2">
            <div className='flex space-x-2 items-center'>
              <h1 className="text-3xl font-extrabold">Meu Carrinho</h1>
              <ShoppingCartIcon size={30} />
            </div>
            <div className="border rounded-lg p-3 w-full">
              <ScrollArea className="   w-full h-[50vh]">
                {data?.map(d => <div key={d.id} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:rounded-lg bg-opacity-65   w-full justify-between flex">
                  <div className="flex space-x-2 break:space-x-6 items-center  justify-between w-[70vw]">
                    <div className='flex space-x-3'>
                      <img src={`${process.env.NEXT_PUBLIC_API_URL}/public/${d.img}`} className="break:w-24 w-20 rounded-lg" />
                      <div className="flex w-full flex-col md:flex-row md:space-x-3 items-start md:items-center break:space-x-6  justify-between">
                        <h1 className="text-md font-bold">{d.name}</h1>
                        <div className="flex space-x-1">
                          <div onClick={() => { handleDown(d.id) }} className="bg-zinc-300 border dark:bg-zinc-700 dark:hover:bg-zinc-950 flex text-lg hover:bg-zinc-400 hover:cursor-pointer font-bold justify-center items-center p-1 rounded-full w-6 h-6">
                            -
                          </div>
                          <div className="bg-zinc-300 flex justify-center border dark:bg-zinc-700 dark:hover:bg-zinc-950 text-sm items-center p-1 rounded-full w-6 h-6">
                            {d.qtd}
                          </div>
                          <div onClick={() => { handleUp(d.id) }} className="bg-zinc-300 border dark:bg-zinc-700 dark:hover:bg-zinc-950 flex text-lg hover:bg-zinc-400 hover:cursor-pointer  justify-center items-center p-1 rounded-full w-6 h-6">
                            +
                          </div>
                        </div>
                        <div className="flex items-center"><h1 className="font-extrabold text-sm">R$ {d.price}</h1><p className="text-sm text-zinc-500">/cada</p></div>
                      </div>
                    </div>
                  </div>
                  <IoTrashOutline onClick={() => { handleDelete(d.id) }} className="text-end hover:cursor-pointer break:w-8 break:h-8  " />
                </div>)}
              </ScrollArea>
              <button onClick={()=>{
                router.push('/app')
              }} className=" w-full bg-orange-500 p-3 rounded-lg text-white mt-2  font-extrabold">Adicionar mais Produtos</button>
            </div>
          </div>
          <div className="border h-1/2 break:w-1/2 w-[84vw] rounded-lg space-y-3 p-3">
            <div className="flex justify-between">
              <h1 className="font-extrabold">Total</h1>
              <h1>R$ {total.toFixed(2)}</h1>
            </div>
            <button onClick={() => {
              async function getUser() {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/findByEmail/${session.data?.user?.email}`, {
                  method: 'GET',
                  headers: {
                    'Content-type': 'application/json'
                  }
                })
                if (res.ok) {
                  setDataUser((await res.json()))
                }
              }
              getUser();


              handleNext()
            }} className=" w-full bg-orange-500 p-3 rounded-lg text-white font-bold">
              Continuar pagamento
            </button>
          </div>
        </div>
      </div>
    },
    {
      steps: <div className='flex items-center justify-center space-x-2' key={2}><PersonIcon className='w-6 h-6 text-white' /><h1 className='text-white w-0 invisible md:w-full md:visible'>Identificação</h1></div>,
      children: <div key={1} className="flex break:flex-row flex-col w-full space-y-2 items-center justify-center">
        <div className='flex flex-col rounded-lg break:w-1/2  items-center justify-center p-3'>
          <h1 >Perfil</h1>
          <div className='flex items-center space-x-2   justify-between'>
            {session.data?.user?.image ? <img src={session.data.user.image!} alt='img' className='rounded-full w-16 h-16' /> : null}

            <div className=''>
              <h1>{session.data?.user?.name}</h1>
              <h1 className='text-zinc-500'>{session.data?.user?.email}</h1>
            </div>

          </div>

        </div>

        {dataUser?.endereco ? !edite ? <div className='w-full break:w-1/2'>
          <div onClick={() => {
            setDelivery(true)
          }} className='border hover:cursor-pointer w-full dark:hover:bg-zinc-900 hover:bg-opacity-65 rounded-lg p-3'>
            <div className='flex items-center justify-between'>
              <CiDeliveryTruck size={30} />
              <div className={`rounded-full boder  w-6 h-6 ${delivery ? 'bg-orange-500' : null}`}></div>
            </div>
            <div className='flex flex-col mt-4'>
              <h1 className='text-xl font-extrabold py-2'>Endereço de entrega:</h1>
              <div className='flex space-x-2'>
                <h1>Cidade:</h1>
                <p className='text-zinc-500'>{dataUser?.endereco.cep}</p>
              </div>
              <div className='flex space-x-2'>
                <h1>Rua:</h1>
                <p className='text-zinc-500'>{dataUser?.endereco.rua}</p>
              </div>
              <div className='flex space-x-2'>
                <h1>Bairro:</h1>
                <p className='text-zinc-500'>{dataUser?.endereco.bairro}</p>
              </div>
              <div className='flex space-x-2'>
                <h1>Numero:</h1>
                <p className='text-zinc-500'>{dataUser?.endereco.numero}</p>
              </div>
              <div className='flex w-full mt-4  justify-between'>
                <button onClick={() => {
                  setEdite(true)
                }} className='border w-full border-orange-500 text-orange-500 flex items-center justify-center p-3 space-x-2 rounded-lg'>
                  <EditIcon className='w-4 h-4' />
                  <h1>Editar</h1>
                </button>
              </div>
            </div>
          </div>
          <div onClick={() => {
            setDelivery(false)
          }} className='flex mt-3 justify-between border rounded-lg p-3 hover:cursor-pointer w-full dark:hover:bg-zinc-900 hover:bg-opacity-65'>
            <h1>Retirar na loja</h1>
            <div className={`rounded-full boder  w-6 h-6 ${!delivery ? 'bg-orange-500' : null}`}></div>
          </div>
          <div className='w-full mt-3'>
            <button onClick={handleNext} className='bg-orange-500 w-full p-3 rounded-lg'>Confirmar</button>
          </div>
        </div> : edite ? <form onSubmit={handleSubmit} className='flex space-y-2 flex-col w-full break:w-1/2'>
          <div className='w-full'>
            <h1>Digite seu CPF</h1>
            <InputMask mask={'999.999.999-99'} type="text" {...form.register('cpf')} className='p-2 w-full bg-transparent rounded-lg border ' defaultValue={dataUser?.cpf} />
          </div>
          <div className='space-y-2'>
            <h1>Digite seu endereço:</h1>
            <div className='flex space-y-2 flex-col w-full'>
              <p className='text-sm text-zinc-500'>Cidade:</p>
              <input type="text" className='p-2 rounded-lg border bg-transparent '  {...form.register('cidade')} defaultValue={dataUser?.endereco.cep} placeholder='Cidade' />
              <p className='text-sm text-zinc-500'>Rua:</p>
              <input type="text" className='p-2 rounded-lg border bg-transparent '  {...form.register('rua')} defaultValue={dataUser?.endereco.rua} placeholder='Rua' />
              <p className='text-sm text-zinc-500'>Bairro:</p>
              <input type="text" className='p-2 rounded-lg border bg-transparent '  {...form.register('bairro')} defaultValue={dataUser?.endereco.bairro} placeholder='Bairro' />
              <p className='text-sm text-zinc-500'>Numero:</p>
              <input type="text" maxLength={6} className='p-2 rounded-lg border bg-transparent '  {...form.register('numero')} defaultValue={dataUser?.endereco.numero} placeholder='numero' />
            </div>
          </div>
          {dataUser?.endereco ? <div className='flex w-full space-x-1'>
            <button type='submit' className='p-3 border text-orange-500 border-orange-500 font-extrabold rounded-lg w-full' onClick={() => {
              setEdite(false)
            }}>Cancelar</button>
            <button type='submit' className='p-3 bg-orange-500 font-extrabold rounded-lg w-full' onClick={() => {
              handleSubmit(),
                handleNext()
            }}>Continuar</button>
          </div> : <button type='submit' className='p-3 bg-orange-500 font-extrabold rounded-lg w-full' onClick={() => {
            handleSubmit(),
              handleNext()
          }}>Continuar</button>}
        </form> :  <form onSubmit={handleSubmit} className='flex space-y-2 flex-col w-full break:w-1/2'>
          <div className='w-full'>
            <h1>Digite seu CPF</h1>
            <InputMask mask={'999.999.999-99'} type="text" {...form.register('cpf')} className='p-2 w-full bg-transparent rounded-lg border ' />
          </div>
          <div className='space-y-2'>
            <h1>Digite seu endereço:</h1>
            <div className='flex space-y-2 flex-col w-full'>
              <p className='text-sm text-zinc-500'>Cidade:</p>
              <input type="text" className='p-2 rounded-lg border bg-transparent '  {...form.register('cidade')} />
              <p className='text-sm text-zinc-500'>Rua:</p>
              <input type="text" className='p-2 rounded-lg border bg-transparent '  {...form.register('rua')} />
              <p className='text-sm text-zinc-500'>Bairro:</p>
              <input type="text" className='p-2 rounded-lg border bg-transparent '  {...form.register('bairro')} />
              <p className='text-sm text-zinc-500'>Numero:</p>
              <input type="text" maxLength={6} className='p-2 rounded-lg border bg-transparent '  {...form.register('numero')} />
            </div>
          </div>
          <button type='submit' className='p-3 bg-orange-500 font-extrabold rounded-lg w-full' onClick={() => {
            handleSubmit(),
              handleNext()
          }}>Continuar</button>
        </form> : <CircularIndeterminate/>}
      </div>
    },
    {
      steps: <div className='flex items-center justify-center space-x-2' key={3}><MdPayment className='w-6 h-6 text-white' /><h1 className='text-white invisible w-0 md:w-full md:visible'>Pagamento</h1></div>,
      children: <div key={1} className="flex flex-col space-y-4 break:w-1/2 w-full m-auto justify-center items-center">
        <h1 className='font-extrabold text-xl'>Escolha um Metodo de pagamento</h1>
        <div className='space-y-2 w-full'>
          <AccordionPayment value='pix' setDinheiro={setDinheiro}
            setPix={setPix}
            setCartao={setCartao} data={{
              children: <div className='flex flex-col space-y-3 p-3 mt-3 justify-center items-center'>
                <h1 className='text-xl font-extrabold'>Pagemento pelo pix</h1>
                <ul className='space-y-1'>
                  <li> - Ao finalizar a compra será gereado o QRCODE e o COPIA E COLA </li>
                  <li> - Você deve pagar em até 15minutos </li>
                  <li> - Clique no Finalizar Compra para proseguir </li>
                </ul>

              </div>,
              trigger: <div className='space-y-3'>
                <div className={` w-8 h-8 flex justify-center items-center  border rounded-full`}>
                  <div className={` ${pix ? 'bg-orange-500 w-6 h-6' : null}   rounded-full`} ></div>
                </div>
                <div className='space-x-2 flex items-center w-full '>
                  <MdPix className='w-6 h-6 text-orange-500' />
                  <h1>PIX à vista</h1>
                </div>
              </div>
            }} />

          <AccordionPayment value='dinheiro' setDinheiro={setDinheiro}
            setPix={setPix}
            setCartao={setCartao} data={{
              children: <div className='flex flex-col space-y-3 p-3 mt-3 justify-center items-center'>
                <h1 className='text-xl font-extrabold'>Pagemento por dinheiro</h1>
                <ul className='space-y-1'>
                  <li> - Ao finalizar a compra você pode acessar o status do seu pedido</li>
                  <li> - Você deve pagar o entragador ou no local de entrega da forma que preferir </li>
                </ul>

              </div>,
              trigger: <div className='space-y-3'>
                <div className={` w-8 h-8 flex justify-center items-center  border rounded-full`}>
                  <div className={` ${dinheiro ? 'bg-orange-500 w-6 h-6' : null}   rounded-full`} ></div>
                </div>
                <div className='space-x-2 flex items-center w-full '>
                  <CiMoneyBill className='w-6 h-6 text-orange-500' />
                  <h1>Dinheiro na hora do recebimento</h1>
                </div>
              </div>
            }} />


          <AccordionPayment value='cartao' setDinheiro={setDinheiro}
            setPix={setPix}
            setCartao={setCartao} data={{
              children: <div className='mt-3 p-3 space-y-2'>
                <h1 className='text-center text-xl font-extrabold'>Pagamento Cartão</h1>
                <div className=''>
                  <h1>Numero do cartão:</h1>
                  <input type="text" className='p-3 rounded-lg w-full border bg-transparent ' />
                </div>
                <div className=''>
                  <h1>Nome impreso no cartão:</h1>
                  <input type="text" className='p-3 rounded-lg w-full border bg-transparent ' />
                </div>
                <div className=''>
                  <h1>CPF do titular:</h1>
                  <input type="text" className='p-3 rounded-lg w-full border bg-transparent ' />
                </div>
                <div className=''><h1>Validade</h1><input type="text" className='p-3 rounded-lg w-full border bg-transparent ' /></div>
                <div className=''><h1>Cod. segurança</h1><input type="text" className='p-3 rounded-lg w-full border bg-transparent ' /></div>

              </div>,
              trigger: <div className='space-y-3'>
                <div className={` w-8 h-8 flex justify-center items-center  border rounded-full`}>
                  <div className={` ${cartao ? 'bg-orange-500 w-6 h-6' : null}   rounded-full`} ></div>
                </div>
                <div className='space-x-2 flex items-center w-full '>
                  <CreditCard className='text-orange-500' />
                  <h1>Cartão de crédito</h1>
                </div>
              </div>
            }} />


        </div>
        {dataUser?.id ? <DialogPayment total={total} pay={true} data={{email:dataUser.email,cpf:dataUser.cpf,userId:dataUser.id,method:pix? 'pix' : dinheiro ? 'dinheiro' : 'cartao'}}/> : null}
       
      </div >
    }
  ]
  const steps = childrens.map(c => c.steps);

  return (
    <Box sx={{
      width: '100%'
    }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step className='dark' key={label.props} {...stepProps}>
              <StepLabel icon={<div className={`${activeStep === index ? 'bg-orange-500' : 'bg-zinc-400'} rounded-full text-white font-bold flex justify-center p-4 items-center w-8 h-8`}>{index + 1}</div>} {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='mt-6 mr-28 p-12 absolute  left-0 w-[96vw]'>
            {childrens[activeStep].children}
          </div>

        </React.Fragment>
      )}
    </Box>
  );
}
