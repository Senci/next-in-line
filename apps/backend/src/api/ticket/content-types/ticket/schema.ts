export default {
  kind: 'collectionType',
  collectionName: 'tickets',
  info: {
    singularName: 'ticket',
    pluralName: 'tickets',
    displayName: 'Ticket',
    description: 'A ticket representing a person in the queue',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    number: {
      type: 'integer',
      required: true,
      description: 'Auto-incremental number part of the ticket',
    },
    fullNumber: {
      type: 'string',
      required: true,
      unique: true,
      description: 'The full ticket number (prefix + number)',
    },
    queue: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::queue.queue',
      inversedBy: 'tickets',
      required: true,
    },
    state: {
      type: 'enumeration',
      enum: ['waiting', 'called', 'served'],
      default: 'waiting',
      description: 'Current state of the ticket in the queue',
    },
    secret: {
      type: 'string',
      required: true,
      private: true,
      description: 'Secret code for viewing this ticket without authentication',
    },
  },
} as const
