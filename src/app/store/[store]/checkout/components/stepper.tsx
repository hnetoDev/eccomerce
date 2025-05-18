'use client'


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
import ReactInputMask from 'react-input-mask';

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
    id: string, cpf: string,phone:string ,email: string, endereco: {
      cep: string,
      bairro: string,
      rua: string,
      numero: number,
      desc: string,
    }
  }>()
  
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
  }, [])


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
          phone:data.phone,
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
      steps: <div className='flex items-center justify-center space-x-2' key={1}><ShoppingCartIcon className=' w-6 h-6' /><h1 className=' invisible w-0 md:w-full md:visible '>Carrinho</h1></div>,
      children: <div key={1} className="flex flex-col">
        
      </div>
    },
    {
      steps: <div className='flex items-center justify-center space-x-2' key={2}><PersonIcon className='w-6 h-6 ' /><h1 className='w-0 invisible md:w-full md:visible'>Identificação</h1></div>,
      children: <div key={1} className="flex break:flex-row flex-col w-full space-y-2 items-center justify-center">
        
      </div>
    },
    {
      steps: <div className='flex items-center justify-center space-x-2' key={3}><MdPayment className='w-6 h-6 ' /><h1 className=' invisible w-0 md:w-full md:visible'>Pagamento</h1></div>,
      children: <div key={1} className="flex flex-col space-y-4 break:w-1/2 w-full m-auto justify-center items-center">
        
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
            <Step className='dark flex flex-col' key={label.props} {...stepProps}>
              <StepLabel className='flex-col' icon={<div className={`${activeStep === index ? 'bg-orange-500' : 'bg-muted-foreground'} rounded-full text-white font-bold flex justify-center p-4 items-center w-8 h-8`}>{index + 1}</div>} {...labelProps}>{label}</StepLabel>
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
