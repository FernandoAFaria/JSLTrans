const express = require("express");
const router = express.Router();
const dbActions = require("../database/api");

// GET INFO ON ONE PRO NUMBER

router.get("/:pro", (req, res) => {
  let pro = req.params.pro;
  dbActions.queryOne(pro, (err, rows) => {
    if (err) console.log(err);
    res.send(rows);
  });
});

module.exports = router;
