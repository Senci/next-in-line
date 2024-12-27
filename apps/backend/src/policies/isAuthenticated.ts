import { Context } from 'koa';

export default async (ctx: Context, config: any, { strapi }): Promise<boolean | void> => {
  if (ctx.state.user) {
    return true;
  }

  ctx.unauthorized('You must be logged in to create a ticket.');
};
