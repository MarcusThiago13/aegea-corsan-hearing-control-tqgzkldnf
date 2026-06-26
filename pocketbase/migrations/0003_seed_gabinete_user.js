migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Idempotent: skip if user already exists
    try {
      app.findFirstRecordByData('_pb_users_auth_', 'username', 'GabineteStela')
      return
    } catch (_) {}

    const record = new Record(users)
    record.set('username', 'GabineteStela')
    record.setPassword('Stela2026')
    record.set('name', 'Gabinete Stela')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData('_pb_users_auth_', 'username', 'GabineteStela')
      app.delete(record)
    } catch (_) {}
  },
)
