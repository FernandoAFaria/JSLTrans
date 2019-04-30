const express = require("express");
const router = express.Router();
const dbActions = require("../database/api");



// GET ALL
router.get("/", (req, res) => {
    dbActions
        .queryAll()
        .then(value => {
            res.send(value);
        })
        .catch(err => res.json({code: 400, error: 'Something went wrong'}));
});
router.get('/test', (req, res) => {
    dbActions.callbackQuery((err, data) => {
        if(err) {
            res.status(400).send('Something went wrong')
        } else {
            
            res.send(data)
        }
    })
})


// GET ONE
router.get("/:pro", (req, res) => {
    let pro = req.params.pro;
 
    dbActions
        .queryOne(pro)
        .then(value => {
            res.send(value);
        })
        .catch(err => res.json({code: 400, error: 'Something went wrong'}));
});

// INSERT ONE
router.post("/", (req, res) => {
    
    const { pro,vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode } = req.body;
    
    dbActions
        .insert(pro,vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode, (err, rows) => {
            if(err){
                if(err.code === 'ER_DUP_ENTRY'){
                    res.status(401).send('Pro Already Exists')
                } else {
                    res.status(400).send('Something went wrong')
                }
                
            } else {
                
                res.status(200).send('Inserted Successfully')
            }
        })
        
});

// MODIFY ONE
router.put("/:pro", (req, res) => {
    const pro = req.params.pro;
    const { vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode, manifest,  } = req.body;
    dbActions
        .modify(pro,vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode,manifest, (err, response) => {
            if(err){
                console.log(err)
                res.status(400).send('Something went wrong')
            } else {
                res.status(200).send(response)
            }
        })
        
});
router.put("/manifest/:pro", (req, res) => {
    const pro = req.params.pro;
    //Only need to update the status on each manifested bill
    const {status, manifest, manifest_date, manifest_carrier, manifest_trailer, manifest_destination, manifest_loader} = req.body;
    dbActions
        .updateStatus(pro, status, manifest, manifest_date, manifest_carrier, manifest_trailer, manifest_destination, manifest_loader, (err, response) => {
            
            if(err){
                console.log(err)
                res.status(400).send('Something went wrong')
            } else {
                
                if(response.affectedRows === 0) {
                    res.status(400).send('Pro Not Found')
                } else {
                    res.status(200).send(response)
                }
               
                
            }
        })
        
});
//SEARCH BY FIELD

router.post('/search', (req,res) => {
    const {vendor,field, value} = req.body;
    dbActions.queryByField(vendor,field,value, (err, data) => {
        
        if(err) {
            res.status(400).send(err)
        } else {
            
            res.send(data)
        }
    })
})


module.exports = router;
