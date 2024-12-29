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
    const createdTicket = await strapi.documents('api::ticket.ticket').create({
      data,
      populate: { queue: true }, // Populate queue on creation if needed
    }) as Ticket & { queue: Queue }
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

  // async findOne(ctx: Context) {
  //   const { id } = ctx.params
  //   const populatedResult = await strapi.documents('api::ticket.ticket').findOne(id, {
  //     populate: { queue: true },
  //   }) as Ticket & { queue: Queue }
  //   ctx.body = sanitizeTicket(populatedResult)
  // },
}))