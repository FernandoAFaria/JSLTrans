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
  modify(pro,vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode, manifest,  callback) {
  
      let sql = 'UPDATE shipments SET vendor=' + db.escape(vendor) +',date=' + db.escape(date) + ', pieces=' + db.escape(pieces) + ', pallets='+ db.escape(pallets) + ', status=' + db.escape(status) + ', weight=' + db.escape(weight) + ', fromName=' + db.escape(fromName) + ', fromStreet=' + db.escape(fromStreet) + ", fromCity=" + db.escape(fromCity) + ', fromState=' + db.escape(fromState) + ', fromZipcode=' + db.escape(fromZipcode) + ', toName=' + db.escape(toName) + ', toStreet=' + db.escape(toStreet) + ', toCity=' + db.escape(toCity) + ', toState=' + db.escape(toState) + ', toZipcode=' + db.escape(toZipcode) +',manifest=' + db.escape(manifest) + ' WHERE pro=' + db.escape(pro) 
      db.query(sql, callback)
    
  },
  queryByField(vendor,field, value, callback){
    
      let sql = `SELECT * FROM shipments where vendor Like '${vendor}' and ${field} =` + db.escape(value);
      db.query(sql,callback)


  },
  updateStatus(pro, status,manifest,manifest_date,manifest_carrier, manifest_trailer, manifest_destination, manifest_loader, callback) {
    let sql = `UPDATE shipments SET status='${status}', manifest='${manifest}', manifest_date=` + db.escape(manifest_date) + `, manifest_carrier='${manifest_carrier}', manifest_trailer='${manifest_trailer}', manifest_destination='${manifest_destination}', manifest_loader='${manifest_loader}' where pro = '${pro}';`
    db.query(sql,callback)

  } ,
// DRIVER FUNCTIONS
//INSERT A DRIVER
  insertDriver(firstname, lastname, vehicle, phone, address, status, callback) {
    let sql = "INSERT INTO drivers(first_name, last_name, vehicle, phone, address, status) VALUES(" + db.escape(firstname) +"," + db.escape(lastname) +"," + db.escape(vehicle) +"," + db.escape(phone) +"," + db.escape(address) +"," + db.escape(status) + ")"

    db.query(sql, callback)


  },

  getDriver(firstname, lastname, callback){
    let sql= `select * from drivers WHERE first_name= '${firstname}' and last_name ='${lastname}'`;
    db.query(sql, callback)
  },

  getAllDrivers(callback){
    let sql= `select * from drivers`;
    db.query(sql, callback)
  },

  deleteDriver(firstname,lastname, callback){
    let sql= "delete from drivers where first_name=" + db.escape(firstname) + "and last_name=" + db.escape(lastname)

    db.query(sql, callback)

  }






}
