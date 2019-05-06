const db = require("./config");

module.exports = {

  // GET ALL
  queryAllByStatus(field, value, callback) {
    let sql = `SELECT * from shipments where ${field}=` + db.escape(value);
    db.query(sql, callback)
  },
   // GET ONE
   queryOne(pro, callback) {
    
      let sql = "SELECT * from shipments where pro=" + db.escape(pro);
      db.query(sql,callback)
      
    
  },
  
  // ADD ONE
  insert(pro, vendor, date, pieces, pallets, status, weight, fromName, fromStreet, fromCity, fromState, fromZipcode, toName, toStreet, toCity, toState, toZipcode,manifest, callback) {
    
      let sql = `INSERT INTO shipments(pro, vendor, date, pieces, pallets, status, weight, fromName, fromStreet, fromCity, fromState, fromZipcode, toName, toStreet, toCity, toState, toZipcode, manifest) values('${pro}', '${vendor}', '${date}', '${pieces}', '${pallets}', '${status}', '${weight}', '${fromName}',' ${fromStreet}', '${fromCity}', '${fromState}', '${fromZipcode}', '${toName}', '${toStreet}', '${toCity}',' ${toState}', '${toZipcode}', '${manifest}')`;
     
      db.query(sql, callback)
    }
  ,

  // MODIFY ONE
  modify(pro,vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode, manifest,  callback) {
  
      let sql = 'UPDATE shipments SET vendor=' + db.escape(vendor) +',date=' + db.escape(date) + ', pieces=' + db.escape(pieces) + ', pallets='+ db.escape(pallets) + ', status=' + db.escape(status) + ', weight=' + db.escape(weight) + ', fromName=' + db.escape(fromName) + ', fromStreet=' + db.escape(fromStreet) + ", fromCity=" + db.escape(fromCity) + ', fromState=' + db.escape(fromState) + ', fromZipcode=' + db.escape(fromZipcode) + ', toName=' + db.escape(toName) + ', toStreet=' + db.escape(toStreet) + ', toCity=' + db.escape(toCity) + ', toState=' + db.escape(toState) + ', toZipcode=' + db.escape(toZipcode) +',manifest=' + db.escape(manifest) + ' WHERE pro=' + db.escape(pro) 
      db.query(sql, callback)
    
  },
  //Query using LIKE
  queryByField(vendor,field, value, callback){
    
      let sql = `SELECT * FROM shipments where vendor Like '${vendor}' and ${field} =` + db.escape(value);
      db.query(sql,callback)


  },
  //Update status when creating a manifest
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

  },
  modifyDriver(firstname,lastname,vehicle,phone,address,status,notes, id,callback) {
    let sql = "UPDATE drivers set first_name=" + db.escape(firstname) + ", last_name=" + db.escape(lastname) + ", vehicle=" + db.escape(vehicle) + ", phone=" + db.escape(phone) + ", address=" + db.escape(address) + ", status=" + db.escape(status) + ", notes=" + db.escape(notes) + " where id=" + db.escape(id)

    db.query(sql,callback)
  },
  
  //DRIVER TRIPS
  createDriverTrip(driver_id, date, pros, delivery_zone, callback){
    let sql = "INSERT INTO driver_trips(driver_id, date, pros, zone) VALUE(" + db.escape(driver_id) + ", " + db.escape(date) + ", " + db.escape(pros) + ", " + db.escape(delivery_zone) + ")";

    db.query(sql, callback)

  }






}
