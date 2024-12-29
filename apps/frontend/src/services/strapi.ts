// import { strapiSDK,   } from "@strapi/sdk-js"

// // export interface StrapiSDKConfig {
// //   baseURL: string
// //   auth?: AuthConfig
// // }

// // export interface AuthConfig<T = unknown> {
// //   strategy: string
// //   options: T
// // }

// // export interface StrapiSDK<StrapiSDKConfig> {
// //   baseURL: Function
// // }

// const VITE_API_URL = import.meta.env.VITE_BACKEND_URL
// const baseURL = `${VITE_API_URL}`

// export const sdk = strapiSDK({ baseURL }) as ReturnType<typeof strapiSDK>
// sdk
// export const queueCollection = sdk.collection('queues') as ReturnType<typeof sdk.collection>

// export const ticketCollection = sdk.collection('tickets') as ReturnType<typeof sdk.collection>
// export const authCollection = sdk.collection('auths') as ReturnType<typeof sdk.collection>
import Strapi from 'strapi-sdk-js'

const url = import.meta.env.VITE_STRAPI_URL
const prefix = import.meta.env.VITE_STRAPI_PREFIX

export const strapi = new Strapi({
  url,
  prefix,
  store: {
    key: 'strapi_jwt',
    useLocalStorage: true
  },
})
