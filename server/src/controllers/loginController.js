const jwtConfig = require('../../config/jwt-config');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../db');
const HttpError = require("../errors/http-error");
const {thereIsEmail}= require('../util/helpers/db-validators');
const { validationResult } = require('express-validator');

const loginController = {
	registerUser: async(req, res,next) => {

		//verifico los campos del req
		const errors = validationResult(req);

		if( !errors.isEmpty() ){
			return res.status(400).json(errors)
		}
		// tomo los datos desde el body
		let name = req.body.name;
		let email = req.body.email;
		let role = req.body.role;
		let lastName = req.body.lastName;
		let password = bcrypt.hashSync(req.body.password, 10);
		//compruebo si el email ya existe
  try{
	const user = await thereIsEmail( email );
		
			if (user){
				 return res.status(400).json({
					status:0,
					messsage: 'User already exists'});
			}
			 if(!user){//creo el usuario
				const userCreated = await models.User.create({name, lastName, password, email, role})
				       
					 console.log (userCreated._previousDataValues.password)
					//let { password,...data }= userCreated._previousDataValues
					const data = {
						name:userCreated._previousDataValues.name,
						lastName:userCreated._previousDataValues.lastName,
						email:userCreated._previousDataValues.email,
						role:userCreated._previousDataValues.role
					}

					return res.status(200).json({
						status:1,
						msg: 'User registered successfully', 
						data: data });
				
			}
		 
		}catch(error) {
		console.log(error)
		}
	},
	loginUser: async (req, res,next) => {
		const errors = validationResult(req);

		if( !errors.isEmpty() ){
			return res.status(400).json(errors)
		}
// por body el mail
		try{
			// funcion validadora de email
			const user = await thereIsEmail( req.body.email );

			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					let userToken = JWT.sign({
						email: user.email,
						id: user.id
					}, 
					jwtConfig.secret, {
						expiresIn: jwtConfig.expiresIn,
						notBefore: jwtConfig.notBefore,
						audience: jwtConfig.audience,
						issuer: jwtConfig.issuer,
						algorithm: jwtConfig.algorithm
					})
					return res.status(200).json({
						status: 1,
						messsage: 'User logged in successfully',
						role:user.role,
						token: userToken
					});
				} else {
					return res.status(500).json({
						status:0,
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
	
		catch(error){
			console.log(error);
		}
	},
	deleteUser: () => {

	},
	putUser: async(req,res,next) => {

		const { id } = req.params;// saco el id 
		const  modification  = req.body;// los cambios que voy a realizar
		const user = await thereIsEmail( req.body.email );
		if ( password ){
			if (bcrypt.compareSync(req.body.password, user.password)) {
				const change = await models.User.update(modification,{
					where: {
						id:id,
					}
				}  )
			}
		}
	},
	getFavorites: async (req, res, next) => {
		const { id } = req.params;
		try {
			if (!id) throw new HttpError("Debe enviar el id del usuario", 400);
			const userfind = models.User.findByPk({
				where: {
					id,
					status: 'active', 
				},
				include: [{
          model: Books,
          as: 'books',
					through: {
						attributes: []
					}
        }],
			});
			if (!userfind) throw new HttpError("Usuario no logeado", 404);
			res.json(userfind);
		} catch (error) {
			if (!(error instanceof HttpError)) {
				error = new HttpError("Error interno del servidor", 500)
			}
			return next(error);
		}
	},
}

module.exports = loginController
