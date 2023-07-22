const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new address.
router.post('/', async(req, res) => {
    try {
        if (typeof req.body.firstName === 'undefined' || req.body.firstName == '' || req.body.firstName == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please Enter your first name.' });
            return false;
        }
        if (typeof req.body.lastName === 'undefined' || req.body.lastName == '' || req.body.lastName == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please Enter your first name.' });
            return false;
        }
        if (typeof req.body.address === 'undefined' || req.body.address == '' || req.body.address == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please Enter address.' });
            return false;
        }
        if (typeof req.body.pinCode === 'undefined' || req.body.pinCode == '' || req.body.pinCode == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter Pin Code.' });
            return false;
        }
        if (typeof req.body.email === 'undefined' || req.body.email == '' || req.body.email == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter email.' });
            return false;
        }
        if (typeof req.body.country === 'undefined' || req.body.country == '' || req.body.country == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter your country.' });
            return false;
        }
        if (typeof req.body.mobileNumber === 'undefined' || req.body.mobileNumber == '' || req.body.mobileNumber == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter your mobile number.' });
            return false;
        }
        if (typeof req.body.state === 'undefined' || req.body.state == '' || req.body.state == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter your state.' });
            return false;
        }
        if (typeof req.body.city === 'undefined' || req.body.city == '' || req.body.city == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter your city.' });
            return false;
        }
        if (typeof req.body.locality === 'undefined' || req.body.locality == '' || req.body.locality == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter your locality.' });
            return false;
        }
        if (typeof req.body.addressTypeId === 'undefined' || req.body.addressTypeId == '' || req.body.addressTypeId == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter your address type.' });
            return false;
        }
        const inData = await model.TBL_Address.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Address has been added.', addressId: inData.addressId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all addresses.
router.post('/getAllAddress', async(req, res) => {
    try {
        const data = await model.TBL_Address.findAll({
            where: req.body,
            include: [{
                model: model.TBL_AddressType,
                as: 'addressType'
            }]
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific address data.
router.post('/updateAddress', async(req, res) => {
    try {
        const address = await model.TBL_Address.update(req.body, {
            where: {
                addressId: req.body.addressId
            }
        });
        console.log(address);
        res.json({ status: 200, response: 'success', msg: 'Address data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a address.
router.post('/deleteAddress', async(req, res) => {
    try {
        const addressDlt = await model.TBL_Address.destroy({
            where: {
                addressId: req.body.addressId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Address has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;