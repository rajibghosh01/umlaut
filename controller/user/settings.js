const express = require('express');
const router = express.Router();
const model = require('../../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new settings.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_Settings.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'data has been added.', settingsId: inData.settingsId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all settings list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const Data = await model.TBL_Settings.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', Data: Data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific settings details.
router.get('/:settingsId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const Data = await model.TBL_Settings.findOne({
            where: {
                settingsId: req.params.settingsId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', Data: Data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific settings data.
router.put('/:settingsId', async(req, res) => {
    try {
        const settings = await model.TBL_Settings.update(req.body, {
            where: {
                settingsId: req.params.settingsId
            }
        });
        console.log(settings);
        res.json({ status: 200, response: 'success', msg: 'data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a settings.
router.delete('/:settingsId', async(req, res) => {
    try {
        const settingsDlt = await model.TBL_Settings.destroy({
            where: {
                settingsId: req.params.settingsId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Data has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});


module.exports = router;