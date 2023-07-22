const express = require('express');
const router = express.Router();
const model = require('../model');
var sequelize = require('sequelize'); //sequelize module import
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new subCategory.
router.post('/', async(req, res) => {
    try {
        if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

            const maxSerial = await model.TBL_SubCategory.findAll({
                // attributes: [sequelize.fn("MAX", sequelize.col("serial")), 'maxSerial'],
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
                ],
                raw: true
            });

            console.log(maxSerial[0].maxSerial)

            req.body.serial = maxSerial[0].maxSerial + 1;
        }
        if (req.body.subCategoryId) {
            var subCategoryId = req.body.subCategoryId

            delete req.body.subCategoryId;

            const category = await model.TBL_SubCategory.update(req.body, {
                where: {
                    subCategoryId: subCategoryId
                }
            });
            res.json({ status: 200, response: 'success', msg: 'subCategory data updated successfully.', subCategoryId: subCategoryId });
        } else {
            const inData = await model.TBL_SubCategory.create(req.body);
            res.json({ status: 200, response: 'success', msg: 'subCategory has been added.', subCategoryId: inData.subCategoryId });
        }
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all subCategory list.
router.post('/subCategoryList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_SubCategory.findAll({
            where: req.body,
            include: [{
                model: model.TBL_MainCategory,
                as: 'mainCategory'
            }],
            order: [
                ['serial', 'ASC'],
            ]
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});
//Get specific subCategory details.
// router.get('/:subCategoryId', async(req, res) => {
//     try {
//         const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
//         const data = await model.TBL_SubCategory.findOne({
//             where: {
//                 subCategoryId: req.params.subCategoryId
//             },
//             include: include
//         });
//         res.json({ status: 200, response: 'success', data: data || {} });
//     } catch (error) {
//         res.json(errResBody);
//     }
// });

// update specific subCategory data.
router.put('/:subCategoryId', async(req, res) => {
    try {
        const subCategory = await model.TBL_SubCategory.update(req.body, {
            where: {
                subCategoryId: req.params.subCategoryId
            }
        });
        console.log(subCategory);
        res.json({ status: 200, response: 'success', msg: 'subCategory data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a subCategory.
router.delete('/:subCategoryId', async(req, res) => {
    try {
        const subCategoryDlt = await model.TBL_SubCategory.destroy({
            where: {
                subCategoryId: req.params.subCategoryId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'subCategory has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;