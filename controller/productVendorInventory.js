const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new tab.
router.post('/', async(req, res) => {
    try {
        if (req.body.productVendorInventoryId) {
            await model.TBL_ProductVendorInventory.update(req.body, {
                where: {
                    productVendorInventoryId: req.body.productVendorInventoryId
                }
            });
            res.json({ status: 200, response: 'success', msg: 'Product vendor inventory updated successfully.' });
        }
        const inData = await model.TBL_ProductVendorInventory.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Product vendor inventory has been added.', productVendorInventoryId: inData.productVendorInventoryId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all tab list.
router.post('/getAllProductVendorInventoryList', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ProductVendorInventory.findAll({
            where: req.body,
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific tab data.
router.post('/updateProductVendorInventory', async(req, res) => {
    try {
        const productVendorInventory = await model.TBL_ProductVendorInventory.update(req.body, {
            where: {
                productVendorInventoryId: req.body.productVendorInventoryId
            }
        });
        console.log(productVendorInventory);
        res.json({ status: 200, response: 'success', msg: 'Product vendor inventory data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a tab.
router.post('/DeleteProductVendorInventory', async(req, res) => {
    try {
        const data = await model.TBL_ProductVendorInventory.destroy({
            where: {
                productVendorInventoryId: req.body.productVendorInventoryId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Product vendor inventory has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});


module.exports = router;