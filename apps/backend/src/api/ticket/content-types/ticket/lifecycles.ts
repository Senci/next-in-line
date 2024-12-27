export default {
  async beforeCreate(event) {
    const { data } = event.params
    const queueId = data.queue.connect[0].id

    if (!data.queue) {
      strapi.log.error('Queue is required to create a ticket.')
      throw new Error('Queue is required to create a ticket.')
    }

    // Fetch the queue using the Query API
    const queue = await strapi.db.query('api::queue.queue').findOne({
      where: {
        id: queueId
      }
    })

    if (!queue) {
      throw new Error('Queue not found.')
    }

    // Fetch the latest ticket for the queue using the Query API
    const ticketsInQueue = await strapi.db.query('api::ticket.ticket').count({
      where: {
        queue: {
          id: queueId
        }
      }
    })

    // Calculate the next number
    data.number = ticketsInQueue + 1
    strapi.log.info(`Next ticket number: ${data.number}`)

    // Format the full number with the queue prefix
    data.fullNumber = `${queue.prefix}-${String(data.number).padStart(3, '0')}`

    // Generate a simple random secret
    data.secret = (Math.random() * 10000000).toString().substring(2, 6)

    // overwrite the state
    data.state = 'waiting'
  },
}