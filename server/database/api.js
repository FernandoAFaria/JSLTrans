const db = require("./config");

module.exports = {

  // GET ALL
  queryAll() {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * from testing";
      db.query(sql, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  },
  // GET ONE
  queryOne(pro) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * from testing where username=" + db.escape(pro);
      db.query(sql, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  },
  // ADD ONE
  insert(pro, vendor, date, pieces, pallets, status, weight, fromName, fromStreet, fromCity, fromState, fromZipcode, toName, toStreet, toCity, toState, toZipcode, callback) {
    
      let sql = `INSERT INTO shipments(pro, vendor, date, pieces, pallets, status, weight, fromName, fromStreet, fromCity, fromState, fromZipcode, toName, toStreet, toCity, toState, toZipcode) values('${pro}', '${vendor}', '${date}', '${pieces}', '${pallets}', '${status}', '${weight}', '${fromName}',' ${fromStreet}', '${fromCity}', '${fromState}', '${fromZipcode}', '${toName}', '${toStreet}', '${toCity}',' ${toState}', '${toZipcode}')`;
     
      db.query(sql, callback)
    }
  ,

  // MODIFY ONE
  modify(pro, variables) {
    return new Promise((resolve, reject) => {
      let sql = "MODIFY STATEMENT HERE";
      db.query(sql, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  },
  //callback

  callbackQuery(callback) {
    let sql = 'SELECT * FROM testing';
    db.query(sql, callback)
  }


}
