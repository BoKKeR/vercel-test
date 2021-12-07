import axios from '.'
import QMKConfig, { KeybioQMKConfig } from '../types/qmkconfig'

export const setQmkConfigHidden = async (_id: string, hidden: boolean): Promise<KeybioQMKConfig> => {
  const res = await axios.patch(`/qmkconfig/${_id}`, { keybioMetadata: { hidden: hidden } })
  return res.data
}

export const uploadQmkConfig = async (dto: Omit<QMKConfig, '_id'>, postId: string): Promise<KeybioQMKConfig> => {
  const res = await axios.post(`/qmkconfig/${postId}`, dto)
  return res.data
}
