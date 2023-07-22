const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new order.
router.post('/', async(req, res) => {
    try {
        if (req.body.orderStatusId) {
            const product = await model.TBL_ChangeOrderStatus.update(req.body, {
                where: {
                    orderStatusId: req.body.orderStatusId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'Order status updated successfully.' });

        } else {
            const inData = await model.TBL_ChangeOrderStatus.create(req.body);
            res.json({ status: 200, response: 'success', msg: 'Order status has been added.', orderStatusId: inData.orderStatusId });
        }

    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all order lrist of specific user.
router.post('/getOderStatusList', async(req, res) => {
    try {
        const data = await model.TBL_ChangeOrderStatus.findAll({
            where: req.body,

        });
        res.json({ status: 200, response: 'success', data: data || [] });

    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;