migrate(
  (app) => {
    const collection = new Collection({
      name: 'hearings',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'num', type: 'text', required: true },
        { name: 'local', type: 'text' },
        { name: 'date', type: 'date' },
        {
          name: 'type',
          type: 'select',
          required: true,
          values: ['thematic', 'territorial', 'meeting'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_hearings_type ON hearings (type)',
        'CREATE INDEX idx_hearings_date ON hearings (date)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('hearings')
    app.delete(collection)
  },
)
