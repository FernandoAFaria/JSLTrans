const express = require('express')
const dbActions = require("../database/api");
const router = express.Router();


/* DRIVER FUNCTIONS */

//Insert a driver

router.post("/", (req, res) => {
  const { firstname, lastname, vehicle, phone, address } = req.body;
  const status = req.body.status || "Active";
  dbActions.insertDriver(
      firstname,
      lastname,
      vehicle,
      phone,
      address,
      status,
      (err, rows) => {
          if (err) res.status(400).send("Something went wrong.");
          else {
              res.status(200).send(rows);
          }
      }
  );
});

//Gets a single driver

router.post("/find", (req, res) => {
  const { firstname, lastname } = req.body;
  dbActions.getDriver(firstname, lastname, (err, rows) => {
      if (err) console.log(err);

      res.status(200).send(rows);
  });
});

//Gets ALL drivers

router.get("/all", (req, res) => {
  dbActions.getAllDrivers((err, rows) => {
      res.send(rows);
  });
});

//Deletes a driver

router.delete("/", (req, res) => {
  const { firstname, lastname } = req.body;

  dbActions.deleteDriver(firstname, lastname, (err, rows) => {
     
      if (err) console.log(err);
      if(rows.affectedRows === 1) {
          res.send(rows);
      } else {
          res.status(400).send('Error removing driver')
      }
      
  });
});

//Modify Driver

router.put("/", (req, res) => {
  const {
      firstname,
      lastname,
      vehicle,
      phone,
      address,
      status,
      notes,
      id
  } = req.body;

  dbActions.modifyDriver(
      firstname,
      lastname,
      vehicle,
      phone,
      address,
      status,
      notes,
      id,
      (err, rows) => {
          if (err) console.log(err);

          res.status(200).send(rows);
      }
  );
});

module.exports = router