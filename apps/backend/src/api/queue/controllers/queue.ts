import { Queue, QueueServiceParams } from '@repo/shared-types'
import { factories } from '@strapi/strapi'
import { Context } from 'koa'

export default factories.createCoreController('api::queue.queue', () => ({
  async find(ctx: Context) {
    const query: QueueServiceParams['findMany'] = {
      fields: ['name', 'prefix']
    }
    const data = (await strapi.documents('api::queue.queue').findMany(query)) as Queue[]
    const meta = { total: data.length }
    ctx.body = { data, meta }
  },
}))