import {
  useFloating,
  offset,
  useHover,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function HoverCard({ collection }: { collection: string[] }) {
  const [open, setOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(10)],
  })

  const hover = useHover(context, {
    move: false,
    delay: { open: 100, close: 200 },
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex space-x-2"
      >
        <h1>ver mais</h1>
        <ChevronDown />
      </button>

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-background mr-3  w-1/3 z-30  p-4 rounded-3xl shadow-lg"
          >
            {collection.map((c, i) => {
              return <div key={c} className='flex group hover:bg-primary/10 rounded-3xl cursor-pointer  justify-between w-full p-3'>
                <h1 className='text-muted-foreground group-hover:text-primary ' >{c}</h1>
                <h1 className='group-hover:text-primary'>&gt;</h1>
              </div>
            })}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
