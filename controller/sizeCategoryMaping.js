const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
var sequelize = require('sequelize'); //sequelize module import


// Add a new productColorCode.
router.post('/', async(req, res) => {
    try {
        if (req.body.sizeCategoryMapingId) {

            const productColorCode = await model.TBL_SizeCategoryMaping.update(req.body, {
                where: {
                    sizeCategoryMapingId: req.body.sizeCategoryMapingId
                }
            });
            console.log(productColorCode);
            res.json({ status: 200, response: 'success', msg: 'productColorCode data updated successfully.' });

        } else {
            req.body.isActive = 1;
            const inData = await model.TBL_SizeCategoryMaping.create(req.body);
            res.json({ status: 200, response: 'success', msg: 'Size and Category Maping has been added.', sizeCategoryMapingId: inData.sizeCategoryMapingId });
        }

    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all Size and Category Maping list.
router.post('/getSizeCategoryMapingList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_SizeCategoryMaping.findAll({
            where: req.body
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// delete a productColorCode.
router.post('/deleteSizeCategoryMaping', async(req, res) => {
    try {
        const productColorCodeDlt = await model.TBL_SizeCategoryMaping.destroy({
            where: {
                sizeCategoryMapingId: req.body.sizeCategoryMapingId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Size and Category Maping has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});

module.exports = router;