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
      let sql = "SELECT * from shipments where pro=" + db.escape(pro);
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
  modify(pro,vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode, callback) {
  
      let sql = 'UPDATE shipments SET vendor=' + db.escape(vendor) +', pieces=' + db.escape(pieces) + ', pallets='+ db.escape(pallets) + ', status=' + db.escape(status) + ', weight=' + db.escape(weight) + ', fromName=' + db.escape(fromName) + ', fromStreet=' + db.escape(fromStreet) + ", fromCity=" + db.escape(fromCity) + ', fromState=' + db.escape(fromState) + ', fromZipcode=' + db.escape(fromZipcode) + ', toName=' + db.escape(toName) + ', toStreet=' + db.escape(toStreet) + ', toCity=' + db.escape(toCity) + ', toState=' + db.escape(toState) + ', toZipcode=' + db.escape(toZipcode) + 'WHERE pro=' + db.escape(pro)
      db.query(sql, callback)
    
  },
  queryByField(vendor,field, value, callback){
    
      let sql = `SELECT * FROM shipments where vendor = '${vendor}' and ${field} =` + db.escape(value);
      db.query(sql,callback)


  }

}
