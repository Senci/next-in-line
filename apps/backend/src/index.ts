import { configurePublicPermissions } from "./bootstrap/permissions"
import { createAdminUser } from "./bootstrap/users"


export default {
  bootstrap: async () => {
    strapi.log.info('Bootstrapping your Strapi app...')
    await createAdminUser()
    await configurePublicPermissions()
  }
}
