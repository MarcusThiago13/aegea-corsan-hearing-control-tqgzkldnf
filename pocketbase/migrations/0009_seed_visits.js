migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('hearings')

    // Add 'visit' to the valid values for 'type' field
    const typeField = col.fields.getByName('type')
    if (typeField) {
      const vals = typeField.values || []
      if (!vals.includes('visit')) {
        typeField.values = [...vals, 'visit']
        app.save(col)
      }
    }

    const seedData = [
      { num: '1', local: 'Centro de Operações Integradas (COE) — Porto Alegre' },
      { num: '2', local: 'Laboratório Central — Porto Alegre' },
      { num: '3', local: 'ETA Canoas' },
      { num: '4', local: 'ETA Campo Bom' },
      { num: '5', local: 'ETA Santa Maria' },
      { num: '6', local: 'ETA Santa Cruz do Sul' },
      { num: '7', local: 'ETA Ijuí' },
      { num: '8', local: 'ETA Panambi' },
    ]

    for (const data of seedData) {
      try {
        app.findFirstRecordByFilter(
          'hearings',
          'type = {:type} && num = {:num} && local = {:local}',
          { type: 'visit', num: data.num, local: data.local },
        )
      } catch (_) {
        const record = new Record(col)
        record.set('num', data.num)
        record.set('local', data.local)
        record.set('type', 'visit')
        app.save(record)
      }
    }
  },
  (app) => {
    app.db().newQuery("DELETE FROM hearings WHERE type = 'visit'").execute()

    const col = app.findCollectionByNameOrId('hearings')
    const typeField = col.fields.getByName('type')
    if (typeField) {
      const vals = typeField.values || []
      if (vals.includes('visit')) {
        typeField.values = vals.filter((v) => v !== 'visit')
        try {
          app.save(col)
        } catch (_) {}
      }
    }
  },
)
