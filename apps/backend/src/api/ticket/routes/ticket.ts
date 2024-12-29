export default {
  routes: [
    {
      method: 'POST',
      path: '/tickets',
      handler: 'api::ticket.ticket.create',
      config: {},
    },
    {
      method: 'GET',
      path: '/tickets/:id/view',
      handler: 'api::ticket.ticket.view',
      config: {},
    },
    {
      method: 'GET',
      path: '/tickets',
      handler: 'api::ticket.ticket.find',
      config: {},
    },
    {
      method: 'GET',
      path: '/tickets/:id',
      handler: 'api::ticket.ticket.findOne',
      config: {},
    },
    {
      method: 'PUT',
      path: '/tickets/:id',
      handler: 'api::ticket.ticket.update',
      config: {},
    }
  ],
} as const