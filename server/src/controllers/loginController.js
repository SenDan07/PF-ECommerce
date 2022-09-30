const jwtConfig = require('../../config/jwt-config');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../db');


const loginController = {

    registerUser: (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let role = req.body.role;
        let lastName = req.body.lastName
        let password = bcrypt.hashSync(req.body.password, 10);


        models.User.findOne({
            where: {

                email
            }
        })
            .then((user) => {
                if (user) {
                    res.status(200).json({

                        messsage: 'User already exists'
                    })
                } else {

                    models.User.create({

                        name: name,
                        lastName,
                        password,
                        email,
                        role
                    })
                        .then((response) => {

                            res.status(200).json({

                                msg: 'User registered successfully',
                                data: response
                            })

                        })
                        .catch((error) => {
                            console.log(error)
                            res.status(500).json({

                                msg: 'Failed to register'
                            })
                        })
                }

            })
            .catch((error) => {
                console.log(error);
            });

    },
    loginUser: (req, res) => {

        models.User.findOne({
            where: {
                email: req.body.email,
            }
        })
            .then((user) => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {

                        let userToken = JWT.sign({
                            email: user.email,
                            id: user.id
                        }, jwtConfig.secret, {
                            expiresIn: jwtConfig.expiresIn,
                            notBefore: jwtConfig.notBefore,
                            audience: jwtConfig.audience,
                            issuer: jwtConfig.issuer,
                            algorithm: jwtConfig.algorithm
                        })
                        res.status(200).json({
                            status: 1,
                            messsage: 'User logged in successfully',
                            token: userToken
                        })
                    } else {
                        res.status(500).json({
                            status: 0,
                            messsage: 'User do not match'
                        })
                    }
                } else {
                    res.status(500).json({
                        status: 0,
                        messsage: 'User do not exists whidth email address '
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteUser: () => {

    }

}

module.exports = loginController
