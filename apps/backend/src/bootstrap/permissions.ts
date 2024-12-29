export async function configurePublicPermissions() {
  try {
    strapi.log.debug('Updating public permissions for tickets...')
    // Fetch the Public role
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' }
    })

    if (!publicRole) {
      strapi.log.error('Public role not found')
      return
    }

    // Define the actions for which to update permissions
    const actions = ['api::ticket.ticket.find', 'api::queue.queue.find', 'api::ticket.ticket.view']

    for (const action of actions) {
      const permission = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: {
          role: publicRole.id,
          action
        }
      })

      if (permission) {
        // Update the permission if it exists
        await strapi.db.query('plugin::users-permissions.permission').update({
          where: { id: permission.id },
          data: { enabled: true }
        })
      } else {
        // Create the permission if it doesn't exist
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            role: publicRole.id,
            action,
            enabled: true
          }
        })
      }
    }

    strapi.log.debug('Public permissions for tickets updated successfully')
  } catch (error) {
    strapi.log.error('Error updating public permissions:', error)
  }
}

export async function configureIsAuthenticatedPermissions() {
  try {
    strapi.log.info('Updating authenticated permissions for tickets...')
    // Fetch the Authenticated role
    const authenticatedRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'authenticated' },
    })

    if (!authenticatedRole) {
      strapi.log.error('Authenticated role not found')
      return
    }
    strapi.log.info('authenticated Role: ', authenticatedRole)

    // Define the actions for which to update permissions
    const actions = [
      'api::ticket.ticket.find',
      'api::queue.queue.find',
      'api::ticket.ticket.view',
      'api::ticket.ticket.create',
      'api::ticket.ticket.update',
    ]

    for (const action of actions) {
      const permission = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: {
          role: authenticatedRole.id,
          action,
        },
      })

      if (permission) {
        // Update the permission if it exists
        await strapi.db.query('plugin::users-permissions.permission').update({
          where: { id: permission.id },
          data: { enabled: true },
        })
      } else {
        // Create the permission if it doesn't exist
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            role: authenticatedRole.id,
            action,
            enabled: true,
          },
        })
      }
    }

    strapi.log.debug('Authenticated permissions for tickets updated successfully')
  } catch (error) {
    strapi.log.error('Error updating authenticated permissions:', error)
  }
}
