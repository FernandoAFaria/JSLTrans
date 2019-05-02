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

//UPDATE STATUS ON MANIFESTED SHIPMENTS

router.put("/manifest/:pro", (req, res) => {
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

//SEARCH BY FIELD - using LIKE

router.post("/search", (req, res) => {
    const { vendor, field, value } = req.body;
    dbActions.queryByField(vendor, field, value, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
});

/* DRIVER FUNCTIONS */

//Insert a driver

router.post("/drivers", (req, res) => {
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

router.post("/driver", (req, res) => {
    const { firstname, lastname } = req.body;
    dbActions.getDriver(firstname, lastname, (err, rows) => {
        if (err) console.log(err);

        res.status(200).send(rows);
    });
});

//Gets ALL drivers

router.get("/drivers/all", (req, res) => {
    dbActions.getAllDrivers((err, rows) => {
        res.send(rows);
    });
});

//Deletes a driver

router.delete("/driver", (req, res) => {
    const { firstname, lastname } = req.body;

    dbActions.deleteDriver(firstname, lastname, (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
    });
});

//Modify Driver

router.post("/modifydriver", (req, res) => {
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

module.exports = router;
