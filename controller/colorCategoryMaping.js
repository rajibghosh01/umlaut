const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
var sequelize = require('sequelize'); //sequelize module import


// Add a new productColorCode.
router.post('/', async(req, res) => {
    try {
        if (req.body.colorCategoryMapingId) {

            const productColorCode = await model.TBL_ColorCategoryMaping.update(req.body, {
                where: {
                    colorCategoryMapingId: req.body.colorCategoryMapingId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'productColorCode data updated successfully.' });

        } else {
            req.body.isActive = 1;
            const inData = await model.TBL_ColorCategoryMaping.create(req.body);
            res.json({ status: 200, response: 'success', msg: 'Color and Category Maping has been added.', colorCategoryMapingId: inData.colorCategoryMapingId });
        }

    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all Color and Category Maping list.
router.post('/getColorCategoryMapingList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ColorCategoryMaping.findAll({
            where: req.body
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// delete a productColorCode.
router.post('/deleteColorCategoryMaping', async(req, res) => {
    try {
        const productColorCodeDlt = await model.TBL_ColorCategoryMaping.destroy({
            where: {
                colorCategoryMapingId: req.body.colorCategoryMapingId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Color and Category Maping has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});

module.exports = router;