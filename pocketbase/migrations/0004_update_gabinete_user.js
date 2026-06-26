migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Remove any conflicting user with the same email to prevent UNIQUE constraint failure
    try {
      const existingEmail = app.findFirstRecordByData(
        '_pb_users_auth_',
        'email',
        'marcusthiago.adv@gmail.com',
      )
      if (existingEmail.getString('username') !== 'GabineteStela') {
        app.delete(existingEmail)
      }
    } catch (_) {}

    try {
      const record = app.findFirstRecordByData('_pb_users_auth_', 'username', 'GabineteStela')
      record.setEmail('marcusthiago.adv@gmail.com')
      record.setPassword('Stela2026')
      app.save(record)
    } catch (_) {
      const record = new Record(users)
      record.set('username', 'GabineteStela')
      record.setEmail('marcusthiago.adv@gmail.com')
      record.setPassword('Stela2026')
      record.setVerified(true)
      record.set('name', 'Gabinete Stela')
      app.save(record)
    }
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData('_pb_users_auth_', 'username', 'GabineteStela')
      record.setEmail('gabinete.stela@example.com')
      app.save(record)
    } catch (_) {}
  },
)
