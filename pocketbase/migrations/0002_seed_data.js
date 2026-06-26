migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'marcusthiago.adv@gmail.com')
    } catch (_) {
      const record = new Record(users)
      record.setEmail('marcusthiago.adv@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin')
      app.save(record)
    }

    const col = app.findCollectionByNameOrId('hearings')
    if (app.countRecords('hearings') === 0) {
      const data = [
        { num: '01', local: 'Sapiranga', date: '2026-06-25 12:00:00.000Z', type: 'territorial' },
        { num: '02', local: 'Bento Gonçalves', date: '', type: 'territorial' },
        {
          num: 'T1',
          local: 'Tarifas e Transparência',
          date: '2026-05-10 12:00:00.000Z',
          type: 'thematic',
        },
        { num: 'R1', local: 'Reunião de Alinhamento', date: '', type: 'meeting' },
      ]
      for (const item of data) {
        const rec = new Record(col)
        rec.set('num', item.num)
        rec.set('local', item.local)
        rec.set('type', item.type)
        if (item.date) rec.set('date', item.date)
        app.save(rec)
      }
    }
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'marcusthiago.adv@gmail.com')
      app.delete(record)
    } catch (_) {}
  },
)
