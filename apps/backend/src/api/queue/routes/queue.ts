export default {
  routes: [
    {
      method: 'GET',
      path: '/queues',
      handler: 'api::queue.queue.find',
      config: {},
    }
  ],
} as const