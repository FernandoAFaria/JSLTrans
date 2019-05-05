const express = require('express')
const router = express.Router();
const dbActions = require("../database/api");

//UPDATE STATUS ON MANIFESTED SHIPMENTS

router.put("/:pro", (req, res) => {
  const pro = req.params.pro;
  //Only need to update the status on each manifested bill
  const {
      status,
      manifest,
      manifest_date,
      manifest_carrier,
      manifest_trailer,
      manifest_destination,
      manifest_loader
  } = req.body;
  dbActions.updateStatus(
      pro,
      status,
      manifest,
      manifest_date,
      manifest_carrier,
      manifest_trailer,
      manifest_destination,
      manifest_loader,
      (err, response) => {
     
          if (err) {
              console.log(err);
              res.status(400).send("Something went wrong");
          } else {
              if (response.affectedRows === 0) {
                  res.status(400).send("Pro Not Found");
              } else {
                  res.status(200).send(response);
              }
          }
      }
  );
});

module.exports = router;