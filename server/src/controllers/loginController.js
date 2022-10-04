const jwtConfig = require('../../config/jwt-config');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../db');
const HttpError = require("../errors/http-error");

const loginController = {

	registerUser: async(req, res,next) => {
		// tomo los datos desde el body
		let name = req.body.name;
		let email = req.body.email;
		let role = req.body.role;
		let lastName = req.body.lastName;
		let password = bcrypt.hashSync(req.body.password, 10);
		//compruebo si el email ya existe
  try{
	const user = await models.User.findOne({where: {email}})
		
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
// por body el mail
		try{

	const user = await	models.User.findOne({where: {email: req.body.email}});

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
	putUser: async() => {

		const { id } = req.params;
		const  modification  = req.body;
		const user = await	models.User.findOne({where: {email: req.body.email}});
		if ( password ){
			if (bcrypt.compareSync(req.body.password, user.password)) {
				const change = await models.User.update(modification,{
					where: {
						id:id,
					}
				}  )
			}
		}
	}
}

module.exports = loginController
