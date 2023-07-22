const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };


// Add a new review rating.
router.post('/', async(req, res) => {
    try {

        const inData = await model.TBL_ReviewRating.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Review and Rating has been added.', reviewRatingId: inData.reviewRatingId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all review and rating list.
router.post('/ReviewRatingList', async(req, res) => {
    try {

        const data = await model.TBL_ReviewRating.findAll({
            where: req.body
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// // Get specific brand details.
// router.post('/', async(req, res) => {
//     try {
//         // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
//         const data = await model.TBL_ReviewRating.findOne({
//             where: {
//                 brandId: req.body.brandId
//             }
//         });
//         res.json({ status: 200, response: 'success', data: data || {} });
//     } catch (error) {
//         res.json(errResBody);
//     }
// });

// update specific brand data.
router.post('/updateReviewRating', async(req, res) => {
    try {
        const reviewRating = await model.TBL_ReviewRating.update(req.body, {
            where: {
                reviewRatingId: req.body.reviewRatingId
            }
        });
        console.log(reviewRating);
        res.json({ status: 200, response: 'success', msg: 'Review and Rating data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a Review and Rating.
router.post('/deleteReviewRating', async(req, res) => {
    try {
        const reviewRatingDlt = await model.TBL_ReviewRating.destroy({
            where: {
                reviewRatingId: req.body.reviewRatingId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Review and Rating has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;