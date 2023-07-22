const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// get cartId.
router.post('/', async(req, res) => {
    try {

        if (req.body.cartId) {
            const product = await model.TBL_CartMaster.update(req.body, {
                where: {
                    cartId: req.body.cartId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'Data updated successfully.' });

        } else {
            const data = await model.TBL_CartMaster.findAll({
                where: {
                    userId: req.body.userId,
                    isActive: 1
                },

            });
            if (data && data.length > 0) {
                res.json({ status: 200, response: 'success', msg: 'CartId.', cartId: data[0].cartId });
            } else {
                const inData = await model.TBL_CartMaster.create({ userId: req.body.userId, isActive: 1 });
                res.json({ status: 200, response: 'success', msg: 'CartId.', cartId: inData.cartId });
            }
        }
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});


// router.post('/getCartList', async(req, res) => {
//     try {
//         const data = await model.TBL_CartMaster.findAll({
//             where: req.body

//         });


//         res.json({ status: 200, response: 'success', msg: 'carts has been saved.', data: data });

//     } catch (error) {
//         console.log(error);
//         res.json(errResBody);
//     }
// });

router.post('/getAllOrderFromUserId', async(req, res) => {
    try {
        const data = await model.TBL_CartMaster.findAll({
            where: {
                userId: req.body.userId,
                isActive: 0
            },
            include: [{
                    model: model.TBL_Carts,
                    as: 'carts',
                    include: [{
                        model: model.TBL_Product,
                        as: 'product',
                    }]
                },
                {
                    model: model.TBL_Order,
                    as: 'order',
                    include: [{
                        model: model.TBL_AddressType,
                        as: 'addressType'
                    }]
                }
            ]

        });
        res.json({ status: 200, response: 'success', data: data || [] });

    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});


module.exports = router;