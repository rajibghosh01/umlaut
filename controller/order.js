const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new order.
router.post('/', async(req, res) => {
    try {
        req.body.orderStatusId = 1
        const inData = await model.TBL_Order.create(req.body);
        await model.TBL_CartMaster.update({ isActive: 0 }, {
            where: {
                cartId: req.body.cartId
            }
        });

        res.json({ status: 200, response: 'success', msg: 'Order has been placed.', orderId: inData.orderId || {} });


    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all order lrist of specific user.
router.post('/getOderList', async(req, res) => {
    try {
        const data = await model.TBL_Order.findAll({
            where: req.body,
            include: [{

                model: model.TBL_CartMaster,
                as: 'cartMaster',

                include: [{
                    model: model.TBL_Carts,
                    as: 'carts',
                    include: [{
                            model: model.TBL_Product,
                            as: 'product',
                            include: [{
                                model: model.TBL_ProductColorMaster,
                                as: 'colors',
                                attributes: ['productColorMasterId'],
                                include: [{
                                        model: model.TBL_ProductColorCode,
                                        as: 'colorCode',
                                        attributes: ['color']
                                    },
                                    {
                                        model: model.TBL_ProductImageMaster,
                                        as: 'image',
                                        attributes: ['image']
                                    },
                                    {
                                        model: model.TBL_ProductSizeMaster,
                                        as: 'sizes',
                                        attributes: ['productSizeMasterId'],
                                        include: [{
                                            model: model.TBL_ProductSizeCode,
                                            as: 'sizeCode',
                                            attributes: ['sizeName', 'sizeCode']
                                        }]
                                    }
                                ]
                            }]
                        }

                    ]
                }]
            }]

        });



        res.json({ status: 200, response: 'success', data: data || [] });

    } catch (error) {
        res.json(errResBody);
    }
});


//delete order.
router.post('/cancelOrder', async(req, res) => {
    try {
        const createResult = await model.TBL_Order.update({ orderStatusId: req.body.orderStatusId, cancellationNotes: req.body.cancellationNotes }, {
            where: {
                orderId: req.body.orderId,
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Order canceled.' });
    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;