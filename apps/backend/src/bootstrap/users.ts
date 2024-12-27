interface AdminUser {
  email: string
  password: string
  firstname: string
  lastname: string
}

export async function createAdminUser() {
  const adminUser: AdminUser = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com', // Use environment variables for credentials
    password: process.env.ADMIN_PASSWORD || 'securepassword',
    firstname: process.env.FIRST_NAME || 'Admin',
    lastname: process.env.LAST_NAME || 'User',
  };

  try {
    // Get the Super Admin role
    const superAdminRole = await strapi.db.query('admin::role').findOne({
      where: { code: 'strapi-super-admin' },
    })

    if (!superAdminRole) {
      throw new Error('Super Admin role not found. Please check your Strapi setup.');
    }

    // Check if the admin user already exists
    const existingAdmin = await strapi.db.query('admin::user').findOne({
      where: { email: adminUser.email },
    });

    if (!existingAdmin) {
      // Create the admin user
      const hashedPassword = await strapi.service('admin::auth').hashPassword(adminUser.password);

      await strapi.db.query('admin::user').create({
        data: {
          email: adminUser.email,
          password: hashedPassword,
          firstname: adminUser.firstname,
          lastname: adminUser.lastname,
          isActive: true,
          roles: [superAdminRole.id], // Assign the Super Admin role
        },
      })

      strapi.log.warn('Admin user created successfully.')
    } else {
      strapi.log.debug('Admin user already exists. No action taken.')
    }
  } catch (error) {
    strapi.log.error('Error while creating admin user:', error)
  }
}