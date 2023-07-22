const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
var sequelize = require('sequelize'); //sequelize module import


// Add a new productColorCode.
router.post('/', async(req, res) => {
    try {
        if (req.body.sizeChartMasterId) {

            const productColorCode = await model.TBL_SizeChartMaster.update(req.body, {
                where: {
                    sizeChartMasterId: req.body.sizeChartMasterId
                }
            });
            console.log(productColorCode);
            res.json({ status: 200, response: 'success', msg: 'data updated successfully.' });

        } else {
            req.body.isActive = 1;
            const inData = await model.TBL_SizeChartMaster.create(req.body);
            res.json({ status: 200, response: 'success', msg: 'Data has been added successfully.', sizeChartMasterId: inData.sizeChartMasterId });
        }

    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all Size Chart list.
router.post('/getSizeChartMasterList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_SizeChartMaster.findAll({
            where: req.body,

            attributes: ['categoryType',
                sequelize.fn('count', sequelize.col('categoryType'))
            ],
            group: "categoryType",
            // raw: true
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// delete a Size data.
router.post('/deleteSizeChartMaster', async(req, res) => {
    try {
        const productColorCodeDlt = await model.TBL_SizeChartMaster.destroy({
            where: {
                sizeChartMasterId: req.body.sizeChartMasterId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Size data has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});

module.exports = router;