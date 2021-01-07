const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
require('express-async-errors')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
	const users = await User
		.find({})
		.populate('blogs', {title: 1, author: 1, url: 1})
	const secureUsers = users.map((user) => {
		return	{
			username: user.username,
			name: user.name,
			id: user.id,
			blogs: user.blogs
		}
	})
	response.json(secureUsers)
})

userRouter.post('/', async (request, response) => {
	const body = request.body
	const rounds = 10

	if(!body.password) {
		return response.status(400).send({error: 'no password'})
	}

	if(body.password.length < 3) {
		return response.status(400).send({error: 'password too short. please ensure your password is at least 3 characters long'})
	}

	const hash = await bcrypt.hash(body.password, rounds)
	const newUser = new User({
		username: body.username,
		name: body.name,
		passwordHash: hash
	})
	const result = await newUser.save()
	response.status(201).json(result)
})

module.exports = userRouter
