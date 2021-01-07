const supertest = require('supertest')
const mongoose = require('mongoose')
require('express-async-errors')

const app = require('../app')
const Blog = require('../models/blog')

//create a supertest api for the express app. starts the app and performs api calls
const api = supertest(app)

const testBlogs = [
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	}
]

//reinitialize the test database before running each test
beforeEach(async () => {
	await Blog.deleteMany({})

	//we're not using forEach here because then
	//execution does not wait for the save to complete before running tests.
	//forEach is a new non-async function.
	for (let blog of testBlogs) {
		let blogObj = new Blog(blog)
		await blogObj.save()
	}
})

describe('getting', () => {
	test('getting the whole database returns the right number of blogs', async () => {
		const response = await api.get('/api/blogs/')

		expect(response.body).toHaveLength(testBlogs.length)
	})

	test('getting from the database returns json', async () => {
		await api
			.get('/api/blogs/')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('unique identifier is id property', async () => {
		const response = await api.get('/api/blogs/')

		const ids = response.body.map(blog => blog.id)

		//check that each blog actually has an id property
		ids.forEach((id) => {
			expect(id).toBeDefined()
		})
	})
})

describe('posting', () => {
	test('a new blog works', async () => {

		const newBlog = {
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
		}

		//check that we get the right status code and content header on post
		await api
			.post('/api/blogs/')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		//get all the blogs along with the new one
		const response = await api.get('/api/blogs/')
		const blogTitles = response.body.map(blog => blog.title)

		//verify that the number of blogs in the DB has increased,
		//due to the new post
		expect(response.body).toHaveLength(testBlogs.length + 1)
		expect(blogTitles).toContain('TDD harms architecture')
	})

	test('a blog with no likes defaults the likes to 0', async () => {
		const newBlog = {
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
		}

		await api
			.post('/api/blogs/')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs/')
		const blogLikes = response.body.map(blog => blog.likes)

		expect(blogLikes).toHaveLength(testBlogs.length + 1)
		//since the two initial blogs have nonzero likes, the 0 likes
		//can belong only to the newly posted blog
		expect(blogLikes).toContain(0)
	})

	test('a blog with no title or url returns a 400 status code', async () => {
		let newBlog = {
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 12
		}

		await api
			.post('/api/blogs/')
			.send(newBlog)
			.expect(400)

		newBlog = {
			title: 'First class tests',
			author: 'Robert C. Martin',
			likes: 10,
		}

		await api
			.post('/api/blogs/')
			.send(newBlog)
			.expect(400)
	})
})


//close mongoose connection after all tests
afterAll(async () => {
	await mongoose.connection.close()
})
