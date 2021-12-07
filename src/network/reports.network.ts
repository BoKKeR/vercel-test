import axios from '.'

export const fetchReportReasons = async () => {
  const res = await axios.get('/report/reasons')

  return res.data as string[]
}

export interface AddReportData {
  reason: string
  comment?: string
  post?: string
  user?: string
}

export const addReport = async (data: AddReportData) => {
  const res = await axios.post('/report/', data)

  return res.data
}
