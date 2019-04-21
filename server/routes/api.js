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
            console.log(data);
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
    const { variables } = req.body;
    dbActions
        .insert(variables)
        .then(value => {
            res.send(value);
        })
        .catch(err => res.json({code: 400, error: 'Something went wrong'}));
});

// MODIFY ONE
router.put("/:pro", (req, res) => {
    const pro = req.params.pro;
    const { variables } = req.body;
    dbActions
        .modify(pro, variables)
        .then(value => {
            res.send(value);
        })
        .catch(err => res.json({code: 400, error: 'Something went wrong'}));
});



module.exports = router;
