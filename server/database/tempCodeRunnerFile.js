
  callbackQuery(callback) {
    let sql = 'SELECT * FROM testing';
    db.query(sql, callback)
  }