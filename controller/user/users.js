const express = require('express');
const router = express.Router();
const model = require('../../model');
const errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
const token = require('../../token.js');

const nodemailer = require('nodemailer');
const uuid = require('uuid');

const { Console } = require('console');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path')
const mime = require('mime');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {

//         crypto.pseudoRandomBytes(16, function (err, raw) {
//             cb(null, raw.toString('hex') + '.' + mime.getExtension(file.mimetype));
//         });
//     }
// });

// const upload = multer({ storage: storage });



// Add a new user.
router.post('/', async(req, res) => {
    try {
        // if (req.body.userId) {
        //     const user = await model.TBL_Users.update(req.body, {
        //         where: {
        //             userId: req.body.userId
        //         }
        //     });
        //     res.json({ status: 200, response: 'success', msg: 'Users data updated successfully.' });
        // }
        if (typeof req.body.firstName === 'undefined' || req.body.firstName == '' || req.body.firstName == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please Enter First Name.' });
            return false;
        }
        if (typeof req.body.lastName === 'undefined' || req.body.lastName == '' || req.body.lastName == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter Last name.' });
            return false;
        }
        if (typeof req.body.emailId === 'undefined' || req.body.emailId == '' || req.body.emailId == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter emailId.' });
            return false;
        }
        if (typeof req.body.password === 'undefined' || req.body.password == '' || req.body.password == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter your Password.' });
            return false;
        }
        if (typeof req.body.phoneNumber === 'undefined' || req.body.phoneNumber == '' || req.body.phoneNumber == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter your Phone number.' });
            return false;
        }
        const userData = await model.TBL_Users.findAll({
            where: {
                emailId: req.body.emailId
            },
            // include: [{ all: true, nested: true }]
        });
        if (userData && userData.length > 0) {
            res.json({ status: 400, response: 'validationerror', msg: 'You already registered please signin.' });
        } else {
            req.body.isActive = 1;
            if (req.body.confirmPassword === req.body.password) {
                const createUserResult = await model.TBL_Users.create(req.body);
                res.json({ status: 200, response: 'success', msg: 'Continue login process.', userId: createUserResult.userId });

            } else {
                res.json({ status: 401, response: 'validationerror', msg: 'Please send confirm Password.' });
            }
        }




    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});
//user login.
router.post('/login', async(req, res) => {
    try {

        if (typeof req.body.emailId === 'undefined' || req.body.emailId == '' || req.body.emailId == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter emailId.' });
            return false;
        }
        if (typeof req.body.password === 'undefined' || req.body.password == '' || req.body.password == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please send Password.' });
            return false;
        }
        const userData = await model.TBL_Users.findOne({
            where: {
                emailId: req.body.emailId
            },
            // include: [{ all: true, nested: true }]
        });
        if (userData) {
            if (userData.password === req.body.password) {
                const authToken = token.assign({ emailId: req.body.emailId, UserId: userData.id });
                res.json({ status: 200, response: 'success', user: userData, token: authToken });
            } else {
                res.json({ status: 400, response: 'invalid', msg: 'Invalid emailId or password.' });
            }
        } else {
            res.json({ status: 400, response: 'invalid', msg: 'Invalid emailId or password.' });
        }
    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});



// Get all user list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'permissions' ? [{ all: true, nested: true }] : [];
        const userList = await model.TBL_Users.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', users: userList || [] });
    } catch (error) {
        res.json({...errResBody, error });
    }
});

// Get specific user.
router.get('/:userId', async(req, res) => {
    try {
        const include = req.query.include === 'permissions' ? [{ all: true, nested: true }] : [];
        const user = await model.TBL_Users.findAll({
            where: {
                userId: req.params.userId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', user: user || {} });
    } catch (error) {
        res.json({...errResBody, error });
    }
});
// update specific user data.
router.put('/:userId', async(req, res) => {
    try {
        if (req.files) {
            req.body.image = req.files[0].filename;


        }
        const user = await model.TBL_Users.update(req.body, {
            where: {
                userId: req.params.userId
            }
        });
        console.log(user);
        res.json({ status: 200, response: 'success', msg: 'Users data updated successfully.' });
    } catch (error) {
        res.json({...errResBody, error });
    }
});


// delete/inactive a user.
router.delete('/:userId', async(req, res) => {
    try {
        let x;
        const user = await model.TBL_Users.findOne({
            where: {
                userId: req.params.userId
            }
        });

        if (user && user.isActive == true) {
            x = 0;
        } else {
            x = 1
        }


        if (user) {

            await model.TBL_Users.update({ isActive: x }, {
                where: {
                    userId: req.params.userId
                }
            });
            res.json({ status: 200, response: 'success', msg: 'User has been deactivated successfully.' });
        } else {
            res.json({ status: 300, response: 'invalid', msg: 'Invalid id.' });
        }
    } catch (error) {
        res.json({...errResBody, error });
    }
});
// Forgot password....
router.post('/forgotPassword', async(req, res) => {
    try {

        //validation for emailId


        const Data = await model.TBL_Users.findOne({
            where: {
                emailId: req.body.emailId
            }
        });
        if (Data) {
            const token = uuid.v1()

            console.log(token);
            await model.TBL_Users.update({
                resetPasswordToken: token
            }, {
                where: {
                    emailId: req.body.emailId,
                }
            });
            const data = await model.TBL_Settings.findAll({

            });
            let transporter = nodemailer.createTransport({
                host: data[0].host, //"mail.thevocalhub.com",
                port: data[0].port, //587,
                // secure: false, // upgrade later with STARTTLS
                // service: 'gmail',
                auth: {
                    user: data[0].user, //'support@thevocalhub.com',
                    pass: data[0].pass //'Debashissaha2@'
                },
                // tls: {
                //     rejectUnauthorized: false
                // }

            });
            console.log(data[0].user);
            console.log(data[0].pass);


            let mailOptions = {
                from: '"AnnectosMarchant" contactus.itv2022@gmail.com',
                to: req.body.emailId,
                cc: '',

                subject: 'annectosmarchant account verification',
                html: `<b>Hello ${Data.userName},<br/><br/> <${token}'>click here to reset your password.</a></b> <br/><br/><br/><br/>Regards, <br/>VocalHub Team.`,
                // attachments: [
                //     { filename: 'YGQUTHBM.jpg.png', path: './YGQUTHBM.jpg.png' }
                // ],
            };
            transporter.sendMail(mailOptions, async(error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent:' + info.response);
                }
            });

            res.json({ status: 200, response: 'success', msg: "Password reset link successfully sent." });

        } else {
            res.json({ status: 400, response: 'invalid', msg: 'This email address is not registered with us.' });
        }
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }

});
// delete a user.
router.delete('/delete/:userId', async(req, res) => {
    try {
        const tabDlt = await model.TBL_Users.destroy({
            where: {
                userId: req.params.userId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Tab has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});
router.post('/resetPassword', async(req, res) => {
    try {
        console.log(req.body)
        if (req.body.confirmPassword === req.body.newPassword) {

            console.log(req.body.resetPasswordToken);
            await model.TBL_Users.update({
                regPassword: req.body.newPassword
            }, {
                where: {
                    resetPasswordToken: req.body.resetPasswordToken
                }
            });

            res.json({ status: 200, response: 'success', msg: 'User has been updated.' });
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'New password and confirm password should be same.' });
        }
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

router.post('/changePassword', async(req, res) => {
    try {
        const data = await model.TBL_Users.findAll({
            where: {
                userId: req.body.userId,
                password: req.body.currentPassword
            }
        });
        if (data && data.length > 0) {

            if (typeof req.body.newPassword === 'undefined' || req.body.newPassword == '' || req.body.newPassword == null) {
                res.json({ status: 401, response: 'validationerror', msg: 'Please enter your Password.' });
                return false;
            }
            if (req.body.confirmPassword === req.body.newPassword) {

                // req.body.newPassword = req.body.password
                await model.TBL_Users.update({ password: req.body.newPassword }, {
                    where: {
                        userId: req.body.userId
                    }
                });

                res.json({ status: 200, response: 'success', msg: 'your password has been change successfully.' });
            } else {
                res.json({ status: 401, response: 'validationerror', msg: 'Please send confirm Password.' });
            }
        } else {
            res.json({ status: 400, response: 'invalid', msg: 'Your current password has been wrong.' });
        }
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});


module.exports = router;