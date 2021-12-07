import { useRef, useEffect, useState, PropsWithChildren, FunctionComponent } from 'react'
import { createPortal } from 'react-dom'

export type PortalProps = {
  selector: string
}

type Props = PropsWithChildren<PortalProps>

const Portal: FunctionComponent<Props> = ({ children, selector }) => {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}

export default Portal
