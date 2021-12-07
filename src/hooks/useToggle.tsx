import { Dispatch, SetStateAction, useState } from 'react'

type UseToggle = [boolean, () => void, Dispatch<SetStateAction<boolean>>]

const useToggle = (initialState: boolean = false): UseToggle => {
  const [toggled, setToggled] = useState(initialState)

  const toggle = () => {
    setToggled((prev) => !prev)
  }

  return [toggled, toggle, setToggled]
}

export default useToggle
