const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
require('express-async-errors')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const testUsers = [
	{
		username: 'adi_gadkari',
		name: 'Aditya Gadkari',
		password: 'mangoman'
	},
	{
		username: 'vashisth_tiwari',
		name: 'Vashisth Tiwari',
		password: 'thedon'
	}
]

beforeEach(async () => {
	jest.setTimeout(10000)
	await User.deleteMany({})

	for(let user of testUsers) {
		let hash = await bcrypt.hash(user.password, 10)
		let userData = {
			username: user.username,
			name: user.name,
			passwordHash: hash
		}
		let userObj = new User(userData)
		await userObj.save()
	}
})

test('posting an invalid user results in a 400 status code', async () => {
	let invalidUser = {
		username: 'sb',
		name: 'Shaurya Bhaskar',
		password: 'financebro'
	}

	await api
		.post('/api/users/')
		.send(invalidUser)
		.expect(400)
})

afterAll(async () => {
	await mongoose.connection.close()
})
