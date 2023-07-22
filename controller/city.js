const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new city.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_City.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'City has been added.', cityId: inData.cityId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all city list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_City.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific city details.
router.get('/:cityId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_City.findOne({
            where: {
                cityId: req.params.cityId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific city data.
router.put('/:cityId', async(req, res) => {
    try {
        const city = await model.TBL_City.update(req.body, {
            where: {
                cityId: req.params.cityId
            }
        });
        console.log(city);
        res.json({ status: 200, response: 'success', msg: 'City data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a city.
router.delete('/:cityId', async(req, res) => {
    try {
        const cityDlt = await model.TBL_City.destroy({
            where: {
                cityId: req.params.cityId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'City has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;