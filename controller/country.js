const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new country.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_Country.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Country has been added.', countryId: inData.countryId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all country list.
router.get('/', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Country.findAll({
            include: [{
                    model: model.TBL_State,
                    as: 'state'
                }

            ]
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific country details.
router.get('/:countryId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Country.findOne({
            where: {
                countryId: req.params.countryId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific country data.
router.put('/:countryId', async(req, res) => {
    try {
        const country = await model.TBL_Country.update(req.body, {
            where: {
                countryId: req.params.countryId
            }
        });
        console.log(country);
        res.json({ status: 200, response: 'success', msg: 'Country data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a country.
router.delete('/:countryId', async(req, res) => {
    try {
        const countryDlt = await model.TBL_Country.destroy({
            where: {
                countryId: req.params.countryId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Country has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;