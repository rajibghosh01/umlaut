const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new address.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_AddressType.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Address type has been added.', addressTypeId: inData.addressTypeId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all city addresses.
router.post('/getAllAddressType', async(req, res) => {
    try {
        const data = await model.TBL_AddressType.findAll({
            where: req.body
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific address data.
router.post('/updateAddressType', async(req, res) => {
    try {
        const address = await model.TBL_AddressType.update(req.body, {
            where: {
                addressTypeId: req.body.addressTypeId
            }
        });
        console.log(address);
        res.json({ status: 200, response: 'success', msg: 'Address type data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a address.
router.post('/deleteAddressType', async(req, res) => {
    try {
        const addressDlt = await model.TBL_AddressType.destroy({
            where: {
                addressTypeId: req.body.addressTypeId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Address type has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;