const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new state.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_State.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'State has been added.', stateId: inData.stateId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all state list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_State.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific state details.
router.get('/:stateId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_State.findOne({
            where: {
                stateId: req.params.stateId
            },
            include: [{
                model: model.TBL_City,
                as: 'city'
            }

        ]
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific state data.
router.put('/:stateId', async(req, res) => {
    try {
        const state = await model.TBL_State.update(req.body, {
            where: {
                stateId: req.params.stateId
            }
        });
        console.log(state);
        if (state[0] === 1) {
            res.json({ status: 200, response: 'success', msg: 'State data updated successfully.' });
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a state.
router.delete('/:stateId', async(req, res) => {
    try {
        const stateDlt = await model.TBL_State.destroy({
            where: {
                stateId: req.params.stateId
            }
        });
        if (stateDlt === 1) {
            res.json({ status: 200, response: 'success', msg: 'State has been deleted successfully.' });
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;