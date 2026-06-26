migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('hearings')

    const seedData = [
      {
        num: 'T',
        local: 'Casos críticos da concessão nos municípios',
        date: '2026-06-15 12:00:00.000Z',
        type: 'thematic',
      },
      {
        num: 'T',
        local: 'Oitiva da concessionária AEGEA/Corsan',
        date: '2026-06-22 12:00:00.000Z',
        type: 'thematic',
      },
      {
        num: 'T',
        local: 'Regulação, controle e sistema de Justiça',
        date: '2026-07-06 12:00:00.000Z',
        type: 'thematic',
      },
      {
        num: 'T',
        local: 'Representantes do Governo do Estado',
        date: '2026-07-13 12:00:00.000Z',
        type: 'thematic',
      },
      { num: '1', local: 'Sapiranga', date: '', type: 'territorial' },
      { num: '2', local: 'Bento Gonçalves', date: '', type: 'territorial' },
      { num: '3', local: 'Alvorada', date: '', type: 'territorial' },
      { num: '4', local: 'Cachoeira do Sul', date: '', type: 'territorial' },
      { num: '5', local: 'Canoas', date: '', type: 'territorial' },
      { num: '6', local: 'Esteio', date: '', type: 'territorial' },
      { num: '7', local: 'Farroupilha', date: '', type: 'territorial' },
      { num: '8', local: 'Guaíba', date: '', type: 'territorial' },
      { num: '9', local: 'Passo Fundo', date: '', type: 'territorial' },
      { num: '10', local: 'Rio Grande', date: '', type: 'territorial' },
      { num: '11', local: 'Santa Maria', date: '', type: 'territorial' },
      { num: '12', local: 'São Borja', date: '2026-07-02 12:00:00.000Z', type: 'territorial' },
      { num: '13', local: 'Vacaria', date: '', type: 'territorial' },
      { num: '14', local: 'Viamão', date: '2026-07-14 12:00:00.000Z', type: 'territorial' },
      { num: '15', local: 'Ijuí', date: '', type: 'territorial' },
      { num: '16', local: '', date: '', type: 'meeting' },
      { num: '17', local: '', date: '', type: 'meeting' },
      { num: '18', local: '', date: '', type: 'meeting' },
      { num: '19', local: '', date: '', type: 'meeting' },
      { num: '20', local: '', date: '', type: 'meeting' },
      { num: '21', local: '', date: '', type: 'meeting' },
      { num: '22', local: '', date: '', type: 'meeting' },
      { num: '23', local: '', date: '', type: 'meeting' },
      { num: '24', local: '', date: '', type: 'meeting' },
    ]

    for (const data of seedData) {
      try {
        app.findFirstRecordByFilter(
          'hearings',
          'type = {:type} && num = {:num} && local = {:local}',
          {
            type: data.type,
            num: data.num,
            local: data.local,
          },
        )
        continue
      } catch (_) {
        const record = new Record(col)
        record.set('num', data.num)
        record.set('local', data.local)
        if (data.date) {
          record.set('date', data.date)
        }
        record.set('type', data.type)
        app.save(record)
      }
    }
  },
  (app) => {
    app
      .db()
      .newQuery(
        "DELETE FROM hearings WHERE num IN ('T', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24')",
      )
      .execute()
  },
)
