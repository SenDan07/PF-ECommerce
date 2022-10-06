
const bcrypt = require('bcrypt');
const models = require('../db');
const HttpError = require("../errors/http-error");
const { thereIsEmail } = require('../util/helpers/db-validators');
const { validationResult } = require('express-validator');
const {generateToken} = require('../util/helpers/jwt-generator');

const loginController = {

	registerUser: async (req, res, next) => {

		//verifico los campos del req
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors)
		}
		// tomo los datos desde el body
		let name = req.body.name;
		let isActive = req.body.isActive;
		let email = req.body.email;
		let role = req.body.role;
		let lastName = req.body.lastName;
		let password = bcrypt.hashSync(req.body.password, 10);
		//compruebo si el email ya existe
		try {
			const user = await thereIsEmail(email);
			console.log(user)

			if (user) {
				return res.status(400).json({
					status: 0,
					messsage: 'User already exists'
				});
			}
			if (!user) {//creo el usuario
				const userCreated = await models.User.create({ name,isActive, lastName, password, email, role })

			  
				const data = {
					name: userCreated._previousDataValues.name,
					lastName: userCreated._previousDataValues.lastName,
		 			email: userCreated._previousDataValues.email,
					role: userCreated._previousDataValues.role,
					isActive: userCreated._previousDataValues.isActive,
					//token: token
				}

				return res.status(200).json({
					status: 1,
					msg: 'User registered successfully',
					data: data
				});

			}

		} catch (error) {
			console.log(error)
		}
	},
	loginUser: async (req, res, next) => {
		const errors = validationResult(req);
           console.log(res.headers)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors)
		}
		// por body el mail 
		try {
			// funcion validadora de email
			const user = await thereIsEmail(req.body.email);

			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					
				const token = await generateToken( user.id,user.name )
					return res.status(200).json({
						status: 1,
						messsage: 'User logged in successfully',
						role: user.role,
						token: token
					});
				} else {
					return res.status(500).json({
						status: 0,
						messsage: 'User do not match'
					});
				}
			} else {
				res.status(500).json({
					status: 0,
					messsage: 'User do not exists whidth email address '
				});
			}
		}

		catch (error) {
			console.log(error);
		}
	},
	deleteUser: async(req,res,next) => {
		const errors = validationResult(req);
 
		if (!errors.isEmpty()) {
	 		return res.status(400).json(errors)
		};
		const { id } = req.params;// saco el id 
		const modification = req.body
		console.log(modification)
		const user = await models.User.update(modification, {
			where: {
				id:id
			}
		})
      res.json(user)
	},
	putUser: async (req, res, next) => {

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors)
		}

		const { id } = req.params;// saco el id 
		const modification = req.body;// los cambios que voy a realizar
		const user = await thereIsEmail(req.body.email);


		const change = await models.User.update(modification, {
			where: {
				id: id,
			}
		})

		const data = await models.User.findByPk(id);
		return res.json({mesg:'Usuario actualizado',
	data:data})
	},
	getAllUsers:async(req,res,next) => {

	
	const p1 = models.User.findAndCountAll({ where: { isActive:true }});
	const p2 = models.User.findAndCountAll({ where: { isActive:false }});
	const p3 = models.User.count();

	const [activeUser,inactiveUsers,quantity] = await Promise.all([p1,p2,p3])
	
	res.json({
		totalRegisters: quantity,
		activeRegData: activeUser.rows,
		activeRegQuantity:activeUser.count,
		inactiveRegData:inactiveUsers.rows,
		inactiveQuantity:inactiveUsers.count
	})


		 
	},
	tokenRevalidate:async(req,res,next) => {
	
		const id = req.id;
	    const name = req.name;
		const token = await generateToken( id, name )
		res.status(200).json({
			status:true,
			id,
			name,
			token
		})

	}
}

module.exports = loginController
