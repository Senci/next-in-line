Tech-Stack:
* typescript
  * ts-standard (standard-js)
* Monorepo Turborepo 2.3.3
* Vue 3 (apps/frontend)
  * prefer composition api, single-file-components
* Strapi 5.6.0 (apps/backend)
  * entityservice is deprecated

All answers must work for techstack (including the correct version).
keep redundant information very short.

the project (next-in-line) is a queue application for the farbfabrique which is printing t shirts a the 38c3 ccc hacker congress.

queue-schema
```
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
```

ticket-schema:
```
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
```
