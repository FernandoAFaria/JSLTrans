const db = require("./config");

module.exports = {
  //PROS

  // GET ALL
  queryAllByStatus(field, value, callback) {
    let sql = `SELECT * from shipments where ${field}=` + db.escape(value);
    db.query(sql, callback)
  },
  // GET ONE
  queryOne(pro, callback) {
    let sql = "SELECT * from shipments where pro=" + db.escape(pro);
    db.query(sql, callback)
  },

  // ADD ONE
  insert(pro, vendor, date, pieces, pallets, status, weight, fromName, fromStreet, fromCity, fromState, fromZipcode, toName, toStreet, toCity, toState, toZipcode, manifest,status_code, callback) {

    let sql = `INSERT INTO shipments(pro, vendor, date, pieces, pallets, status, weight, fromName, fromStreet, fromCity, fromState, fromZipcode, toName, toStreet, toCity, toState, toZipcode, manifest,status_code) values('${pro}', '${vendor}', '${date}', '${pieces}', '${pallets}', '${status}', '${weight}', '${fromName}',' ${fromStreet}', '${fromCity}', '${fromState}', '${fromZipcode}', '${toName}', '${toStreet}', '${toCity}',' ${toState}', '${toZipcode}', '${manifest}', '${status_code}')`;

    db.query(sql, callback)
  },

  // MODIFY ONE
  modify(pro, vendor, date, pieces, pallets, status, weight, fromName, fromStreet, fromCity, fromState, fromZipcode, toName, toStreet, toCity, toState, toZipcode, manifest,status_code, callback) {
    
    let sql = 'UPDATE shipments SET vendor=' + db.escape(vendor) + ',date=' + db.escape(date) + ', pieces=' + db.escape(pieces) + ', pallets=' + db.escape(pallets) + ', status =  ' + db.escape(status) + ' , weight=' + db.escape(weight) + ', fromName=' + db.escape(fromName) + ', fromStreet=' + db.escape(fromStreet) + ", fromCity=" + db.escape(fromCity) + ', fromState=' + db.escape(fromState) + ', fromZipcode=' + db.escape(fromZipcode) + ', toName=' + db.escape(toName) + ', toStreet=' + db.escape(toStreet) + ', toCity=' + db.escape(toCity) + ', toState=' + db.escape(toState) + ', toZipcode=' + db.escape(toZipcode) + ',manifest=' + db.escape(manifest) + ', status_code=' + db.escape(status_code) + ' WHERE pro=' + db.escape(pro)
    db.query(sql, callback)

  },
  //Query using LIKE
  queryByField(vendor, field, value, callback) {
    if(value === "%"){
      let sql = `SELECT * FROM shipments where vendor LIKE '${vendor}'and ${field} LIKE ` + db.escape(value);
      db.query(sql, callback)
    } else {
      value = value + "%";
      let sql = `SELECT * FROM shipments where vendor LIKE '${vendor}'and ${field} LIKE ` + db.escape(value);
      db.query(sql, callback)
    }
    
  },

  //MANIFESTS

  //Update status when creating a manifest
  updateManifestInfo(pro, status, manifest, manifest_date, manifest_carrier, manifest_trailer, manifest_destination, manifest_loader,status_code, callback) {
    let updatedStatus = " - " + status;
    let sql = `UPDATE shipments SET status= CONCAT(status,` + db.escape(updatedStatus) + `), manifest='${manifest}', manifest_date=` + db.escape(manifest_date) + `, manifest_carrier='${manifest_carrier}', manifest_trailer='${manifest_trailer}', manifest_destination='${manifest_destination}', manifest_loader='${manifest_loader}', status_code='${status_code}' WHERE pro = '${pro}';`
    db.query(sql, callback)

  },

  //Update status for delivery manifest

  updateStatus(pro, status, status_code, callback) {
    status = " - " + status;
    let sql = `UPDATE shipments set status= CONCAT(status,` + db.escape(status) + `), status_code='${status_code}' where pro='${pro}'`
    db.query(sql, callback)
  },

  //GET ALL MANIFESTS
  getManifests(callback) {
    let sql = 'select distinct manifest, manifest_date from shipments';
    db.query(sql, callback)
  },

  // DRIVER FUNCTIONS

  //INSERT A DRIVER
  insertDriver(firstname, lastname, vehicle, phone, address, status, callback) {
    let sql = "INSERT INTO drivers(first_name, last_name, vehicle, phone, address, status) VALUES(" + db.escape(firstname) + "," + db.escape(lastname) + "," + db.escape(vehicle) + "," + db.escape(phone) + "," + db.escape(address) + "," + db.escape(status) + ")"

    db.query(sql, callback)


  },

  getDriver(firstname, lastname, callback) {
    let sql = `select * from drivers WHERE first_name= '${firstname}' and last_name ='${lastname}'`;
    db.query(sql, callback)
  },

  getDriverById(id, callback) {
    let sql = `select * from drivers WHERE id= '${id}'`
    db.query(sql, callback)
  },

  getAllDrivers(callback) {
    let sql = `select * from drivers`;
    db.query(sql, callback)
  },

  deleteDriver(firstname, lastname, callback) {
    let sql = "delete from drivers where first_name=" + db.escape(firstname) + "and last_name=" + db.escape(lastname)

    db.query(sql, callback)

  },
  modifyDriver(firstname, lastname, vehicle, phone, address, status, notes, id, callback) {
    let sql = "UPDATE drivers set first_name=" + db.escape(firstname) + ", last_name=" + db.escape(lastname) + ", vehicle=" + db.escape(vehicle) + ", phone=" + db.escape(phone) + ", address=" + db.escape(address) + ", status=" + db.escape(status) + ", notes=" + db.escape(notes) + " where id=" + db.escape(id)

    db.query(sql, callback)
  },

  //DRIVER TRIPS
  createDriverTrip(driverId, date, pros, delivery_zone, callback) {
    let sql = "INSERT INTO driver_trips(driver_id, date, pros, zone) VALUE(" + db.escape(driverId) + ", " + db.escape(date) + ", " + db.escape(pros) + ", " + db.escape(delivery_zone) + ")";

    db.query(sql, callback)

  },

  //CUSTOMERS

  //GET CUSTOMER INFO
  getCustomerData(name, callback){
    let sql = "SELECT * FROM customer_data where customer_name=" + db.escape(name);
    db.query(sql, callback);

  },

  //INSERT CUSTOMER
  addCustomerData(name,street, city,state,zipcode, callback){
    
    let sql = "INSERT INTO customer_data(customer_name, street, city, state, zipcode) VALUE(" + db.escape(name) + "," + db.escape(street) + "," + db.escape(city) + "," + db.escape(state) + "," + db.escape(zipcode) + ")"
    db.query(sql, callback);

  }

}