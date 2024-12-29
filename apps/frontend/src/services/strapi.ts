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
