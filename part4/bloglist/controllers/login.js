
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
require('express-async-errors')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
	const body = request.body
	const user = await User.findOne({username: body.username})

	const passwordCorrect = user === null ?
		false :
		await bcrypt.compare(body.password, user.passwordHash)

	if(!(passwordCorrect && user)) {
		return response
			.status(401)
			.send({error: 'invalid username or password'})
	}

	const tokenUser = {
		id: user.id,
		username: user.username
	}

	const token = jwt.sign(tokenUser, process.env.SECRET)

	response
		.status(200)
		.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
