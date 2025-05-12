export default async function processPaymentPix(data: any,total:number) : Promise<string | undefined> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
    method: "POST",
    headers: {
      'Content-type': "application/json"
    },
    body: JSON.stringify({
      "order": {
        products: data,
        userId: "cad0b9d2-2279-470e-84fc-61be87cd3f52",
        total: 38,
        method: "PIX",
        entrega: false
      },
      "transaction_amount": Number(total.toFixed(2)),
      "description": "Compra de suplementos",
      "paymentMethodId": "pix",
      "email": "hnetorocha@gmail.com",
      "identificationType": "CPF",
      "number": '07644928537'
    })
  })
  if (res.ok) {
    const resultPayment = await res.json()
    return resultPayment.point_of_interaction.transaction_data.qr_code
  } 
  return undefined
}


