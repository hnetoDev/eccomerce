import { useId } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@/app/context'

// Importa o QR dinamicamente para evitar SSR
const QRCode = dynamic(() => import('react-qr-code'), { ssr: false })

interface Props {
  value: string
  size?: number
}

export default function QRCodeWithLogo({ value, size = 256}: Props) {
  const id = useId()
  const theme = useTheme()
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <QRCode
        id={id}
        value={value}
        size={size}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H" // alta correção de erro (necessária para suportar logo)
      />
      <img
        src={theme.logoUrlLight}
        alt="Logo"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: size * 0.25,
          height: size * 0.25,
          borderRadius: '8px',
          backgroundColor: 'white',
          padding: '4px',
        }}
      />
    </div>
  )
}
