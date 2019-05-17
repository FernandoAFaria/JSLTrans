const express = require('express')
const router = express.Router();
const dbActions = require("../database/api");

//UPDATE STATUS ON MANIFESTED SHIPMENTS
//URL - /trips

//Insert Driver Trip

router.post('/', (req, res) => {
  const {
    driverId,
    date,
    pros,
    zone,
    pieces,
    weight
  } = req.body;

  dbActions.createDriverTrip(driverId, date, JSON.stringify(pros), zone, pieces, weight, (err, rows) => {
    if (err) console.log(err)
    res.send(rows)
  })

  //need to also change status on these to OFD

})

//Gets all driver trips

router.get('/', (req,res) => {
  dbActions.getAllDriverTrips((err,rows) => {
    res.json(rows)
  })
})

//Get driver trip by driver ID

router.get('/:id', (req,res) => {
  let driver_id = req.params.id;
 

  dbActions.getDriverTripsByDriver(driver_id,(err,rows) => {
    res.json(rows)
  })
})

//Get driver trip by date

router.get('/date/:date', (req,res) => {
  let date = req.params.date;

  dbActions.getDriverTripsByDate(date,(err,rows) => {
    res.json(rows)
  })
})

module.exports = router;