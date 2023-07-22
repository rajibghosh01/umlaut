const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new product status.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_ProductStatus.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Product status has been added.', productStatusId: inData.productStatusId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all product status list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ProductStatus.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific product status details.
router.get('/:productStatusId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ProductStatus.findOne({
            where: {
                productStatusId: req.params.productStatusId
            },
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific product status data.
router.put('/:productStatusId', async(req, res) => {
    try {
        const productStatus = await model.TBL_ProductStatus.update(req.body, {
            where: {
                productStatusId: req.params.productStatusId
            }
        });
        console.log(productStatus);
        if (productStatus[0] === 1) {
            res.json({ status: 200, response: 'success', msg: 'Product status data updated successfully.' });
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a product status.
router.delete('/:productStatusId', async(req, res) => {
    try {
        const productStatusDlt = await model.TBL_ProductStatus.destroy({
            where: {
                productStatusId: req.params.productStatusId
            }
        });
        if (productStatusDlt === 1) {
            res.json({ status: 200, response: 'success', msg: 'Product status has been deleted successfully.' });
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;