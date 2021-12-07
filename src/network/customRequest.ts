export default () => null
// TODO: Find a better way to normalize requests

// type RequestOptions<T = {}, S = {}> = {
//   options?: AxiosRequestConfig
//   data: T
//   query: S
// }

// const createRequest = <T, S>(endpoint: string, path: string) => {
//   const urlArray = [`/${endpoint}`]

//   if (path) {
//     urlArray.push(`/${path}`)
//   }

//   return ({ query, data, options }: RequestOptions<T, S>) => {
//     if (query) {
//       const searchParams = new URLSearchParams()

//       for (const [queryName, queryValue] of Object.entries(query)) {
//         if (Array.isArray(queryValue)) {
//           for (const item of queryValue) {
//             searchParams.append(queryName, item)
//           }
//         } else {
//           searchParams.set(queryName, queryValue.toString())
//         }
//       }

//       urlArray.push(searchParams.toString())
//     }

//     return axios({
//       url: urlArray.join(''),
//       data,
//       ...options,
//     })
//   }
// }

// const fetchKeybs = createRequest<undefined, { page: number }>('keyb', '')

// fetchKeybs({ query: { page: 1 }, data: undefined })
