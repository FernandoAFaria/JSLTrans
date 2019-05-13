const express = require("express");
const router = express.Router();
const dbActions = require("../database/api");

// GET INFO ON ONE PRO NUMBER

router.post("/", (req, res) => {
  const { vendor, field, value } = req.body;


  dbActions.queryByField(vendor, field, value, (err, data) => {
   
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
