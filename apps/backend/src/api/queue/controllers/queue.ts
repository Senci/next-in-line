import { Queue } from '@repo/shared-types'
import { factories } from '@strapi/strapi'
import { Modules } from '@strapi/types'
import { Context } from 'koa'


export default factories.createCoreController('api::queue.queue', () => ({
  async find(ctx: Context) {
    type QueueServiceParams = Modules.Documents.ServiceParams<'api::queue.queue'>
    const query: QueueServiceParams['findMany'] = {
      fields: ['id', 'name', 'prefix']
    }
    const data = (await strapi.documents('api::queue.queue').findMany(query)) as Queue[]
    const meta = { total: data.length }
    ctx.body = { data, meta }
  },
}))