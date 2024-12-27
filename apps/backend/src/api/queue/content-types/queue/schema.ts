export default {
  kind: 'collectionType',
  collectionName: 'queues',
  info: {
    singularName: 'queue',
    pluralName: 'queues',
    displayName: 'Queue',
    description: 'A queue representing a group of tickets',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    name: {
      type: 'string',
      required: true,
      description: 'Name of the queue',
    },
    prefix: {
      type: 'string',
      required: true,
      unique: true,
      description: 'Prefix for the ticket number (e.g., PRE, SEC)',
    },
    tickets: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::ticket.ticket',
      mappedBy: 'queue',
    },
  },
} as const;