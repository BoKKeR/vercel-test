import { getSpacing } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent, useState } from 'react'
import Block from '../Block'
import S from './styled'

type RadioItem = {
  id: string
  name: string
}

export type RadioGroupProps = {
  items: RadioItem[]
  value?: string
  onChange?: (value: string) => any
  onBlur?: (e) => any
}
type Props = PropsWithStyle<RadioGroupProps>

const RadioGroup: FunctionComponent<Props> = ({ style, className, items, value, onBlur, onChange }) => {
  const [currentIndex, setIndex] = useState(value || items[0]?.id)

  const selectGroup = (item: RadioItem) => {
    onBlur({})
    onChange(item.id)
    setIndex(item.id)
  }

  const radioItems = items.map((item) => {
    const isActive = currentIndex === item.id
    const background = isActive && 'color_primary'

    return (
      <S.RadioItem
        background={background}
        border
        borderWidth="1px"
        margin={false}
        onClick={selectGroup.bind(null, item)}
        sx={{ padding: `${getSpacing(0.5)} ${getSpacing()}`, cursor: 'pointer' }}
      >
        {item.name}
      </S.RadioItem>
    )
  })

  return (
    <S.RadioGroup style={style} className={className}>
      {radioItems}
    </S.RadioGroup>
  )
}

export default RadioGroup
