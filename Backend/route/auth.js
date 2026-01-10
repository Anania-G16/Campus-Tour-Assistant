const { Router } = require('express');
const userRouter = Router();
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { loginAdmin, registerAdmin, } = require('../controller/auth.js');


const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}
userRouter.post('/login',
    //  [check('email', 'Email is required').not().isEmpty(),
    //         check('email', 'Invalid email format').isEmail(),
    //         check('password', 'Passsword is  requied').not().isEmpty(),
    //         validateInput
    //     ],
    loginAdmin);
userRouter.post('/register', [
    // check('email', 'Email is required').not().isEmpty(),
    // check('email', 'Invalid email format').isEmail(),
    // check('username', 'user name is required').not().isEmail(),
    // check('password', 'Passsword is  requied').not().isEmpty(),
    // validateInput
], registerAdmin);

module.exports = userRouter;