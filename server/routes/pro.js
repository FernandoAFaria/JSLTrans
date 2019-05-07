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

// INSERT ONE SHIPMENT

router.post("/", (req, res) => {
    const {
        pro,
        vendor,
        date,
        pieces,
        pallets,
        status,
        weight,
        fromName,
        fromStreet,
        fromCity,
        fromState,
        fromZipcode,
        toName,
        toStreet,
        toCity,
        toState,
        toZipcode,
        manifest
    } = req.body;

    dbActions.insert(
        pro,
        vendor,
        date,
        pieces,
        pallets,
        status,
        weight,
        fromName,
        fromStreet,
        fromCity,
        fromState,
        fromZipcode,
        toName,
        toStreet,
        toCity,
        toState,
        toZipcode,
        manifest,
        (err, rows) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(401).send("Pro Already Exists");
                } else {
                    res.status(400).send("Something went wrong");
                }
            } else {
                res.status(200).send("Inserted Successfully");
            }
        }
    );
});

// MODIFY ONE PRO NUMBER

router.put("/:pro", (req, res) => {
    const pro = req.params.pro;
    const {
        vendor,
        date,
        pieces,
        pallets,
        status,
        weight,
        fromName,
        fromStreet,
        fromCity,
        fromState,
        fromZipcode,
        toName,
        toStreet,
        toCity,
        toState,
        toZipcode,
        manifest
    } = req.body;
    dbActions.modify(
        pro,
        vendor,
        date,
        pieces,
        pallets,
        status,
        weight,
        fromName,
        fromStreet,
        fromCity,
        fromState,
        fromZipcode,
        toName,
        toStreet,
        toCity,
        toState,
        toZipcode,
        manifest,
        (err, response) => {
            if (err) {
                console.log(err);
                res.status(400).send("Something went wrong");
            } else {
                res.status(200).send(response);
            }
        }
    );
});

//Modify Status field
router.post('/updateStatus',(req,res) => {
    let {pro, status} = req.body;
    dbActions.updateStatus(pro, status, (err, rows) =>{
        if(err) console.log(err)
        res.send(rows);
    })

})







module.exports = router;
