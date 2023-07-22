const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new VendorMaster.
router.post('/', async(req, res) => {
    try {
        if (req.body.vendorId) {
            await model.TBL_VendorMaster.update(req.body, {
                where: {
                    vendorId: req.body.vendorId
                }
            });
            res.json({ status: 200, response: 'success', msg: 'Vendor master data updated successfully.' });
        }
        const inData = await model.TBL_VendorMaster.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Vendor master has been added.', vendorId: inData.vendorId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all Vendormaster list.
router.post('/getVendorMasterList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const VendormasterList = await model.TBL_VendorMaster.findAll({
            where: req.body,
            // include: include
        });
        res.json({ status: 200, response: 'success', VendormasterList: VendormasterList || [] });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});
// update specific Vendormaster data.
router.post('/updateVendorMaster', async(req, res) => {
    try {
        const Vendormaster = await model.TBL_VendorMaster.update(req.body, {
            where: {
                vendorId: req.body.vendorId
            }
        });
        console.log(Vendormaster);
        res.json({ status: 200, response: 'success', msg: 'Vendor master data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a Vendormaster.
router.post('/deleteVendorMaster', async(req, res) => {
    try {
        const VendormasterDlt = await model.TBL_VendorMaster.destroy({
            where: {
                vendorId: req.body.vendorId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Vendor master has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});


module.exports = router;