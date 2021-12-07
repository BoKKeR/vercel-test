import Button from '@/components/atoms/Button'

import Text from '@/components/atoms/Text'
import useToggle from '@/hooks/useToggle'
import { getSpacing } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { FaPlus } from 'react-icons/fa'
import S from './styled'

export type CreateDropdownProps = {}
type Props = PropsWithStyle<CreateDropdownProps>

const CreateDropdown: FunctionComponent<Props> = ({ style, className }) => {
  const [showAddDropdown, toggleAddDropdown, setShowAddDropdown] = useToggle(false)

  return null
}

export default CreateDropdown
