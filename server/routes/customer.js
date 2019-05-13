const express = require("express");
const dbActions = require("../database/api");
const router = express.Router();

router.get('/', (req,res) => {
  
  let customer_name = req.query.name
  dbActions.getCustomerData(customer_name, (err, rows) => {
    if(err) console.log(err)
   
    if(rows.length === 0) {
      res.json({'error': "no such customer"})
    } else {
      res.json(rows)
    }
  })

})

router.post('/', (req,res) => {
  const {name, street, city, state, zipcode} = req.body;
  dbActions.addCustomerData(name, street, city, state, zipcode, (err, rows) => {
    if(err) console.log(err)
    res.send(rows)
  
  })
})




module.exports = router;