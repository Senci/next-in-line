import { Queue, Ticket } from '@repo/shared-types'
import { factories } from '@strapi/strapi'
import { Modules } from '@strapi/types'
import { Context } from 'koa'


export default factories.createCoreController('api::ticket.ticket', () => ({

  async view(ctx: Context) {
    strapi.log.info('Viewing ticket')
    const { id } = ctx.params
    const { secret } = ctx.query

    const ticket = await strapi.service('api::ticket.ticket').findOne(id, {
      populate: { queue: true },
    }) as Ticket & { queue: Queue }

    if (!ticket || ticket.secret !== secret) {
      return ctx.notFound('Ticket not found or invalid secret.')
    }

    ctx.body = ticket
  },

  async create(ctx: Context) {
    const { data } = ctx.request.body
    strapi.log.info(JSON.stringify(data, null, 2))

    if (!data.queue) {
      strapi.log.error('Queue is required to create a ticket.')
      throw new Error('Queue is required to create a ticket.')
    }

    // Fetch the queue using the Query API
    const queue = await strapi.db.query('api::queue.queue').findOne({
      where: { id: data.queue }
    })

    if (!queue) {
      throw new Error('Queue not found.')
    }

    // Fetch the latest ticket for the queue using the Query API
    const ticketsInQueue = await strapi.db.query('api::ticket.ticket').count({
      where: data
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

    const createdTicket = await strapi.documents('api::ticket.ticket').create({
      data,
    }) as Ticket
    ctx.body = createdTicket
  },

  async find(ctx: Context) {
    type TicketServiceParams = Modules.Documents.ServiceParams<'api::ticket.ticket'>
    const query: TicketServiceParams['findMany'] = {
      fields: ['number', 'fullNumber', 'state'],
      filters: { state: 'waiting' },
      populate: {
        queue: {
          fields: ['prefix']
        }
      },
    }
    const data = (await strapi.documents('api::ticket.ticket').findMany(query)) as Ticket[]
    const meta = { total: data.length }
    ctx.body = { data, meta }
  },

  async update(ctx: Context) {
    const { data } = ctx.request.body

    const { id: documentId } = ctx.params
    const { state } = data
    strapi.log.info(JSON.stringify({ documentId, state }, null, 2))
    const update = await strapi.documents('api::ticket.ticket').update({ documentId, data: { state } })
    strapi.log.info(JSON.stringify(update, null, 2))
    ctx.body = update
  }
}))