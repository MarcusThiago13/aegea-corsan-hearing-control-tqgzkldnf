migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      const record = app.findFirstRecordByData('_pb_users_auth_', 'username', 'GabineteStela')
      record.setPassword('Stela2026')
      app.save(record)
    } catch (_) {
      const record = new Record(users)
      record.set('username', 'GabineteStela')
      record.setEmail('gabinete.stela@corsan.com.br')
      record.setPassword('Stela2026')
      record.setVerified(true)
      record.set('name', 'Gabinete Stela')
      app.save(record)
    }
  },
  (app) => {
    // down migration logic (optional)
  },
)
