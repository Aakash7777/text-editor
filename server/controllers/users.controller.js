const bcrypt = require('bcryptjs')
const userServices = require('../services//users.service')
const auth = require('../middlewares/auth')

exports.register = (req, res, next) => {
    const {password} = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
    const token = auth.generateAccessToken(req.body.username)

    userServices.register(req.body, (error, result) => {
        if (error) {
            return next(error)
        }

        return res.status(200).send(
            {
                message: 'Success',
                token,
                data: result

            }
        )
    })
}

exports.login = (req, res, next) => {
    const { username, password} = req.body;
    userServices.login({ username, password}, (error, result) => {
        if (error) {
            return next(error)
        }

        return res.status(200).send(
            {
                message: 'Success',
                data: result

            }
        )
    })
}

