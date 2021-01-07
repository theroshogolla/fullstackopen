const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', {username: 1, name: 1, id: 1})
	response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog
		.findById(request.params.id)
		.populate('user', {username: 1, name: 1, id: 1})

	if(blog) {
		response.json(blog)
	}
	else {
		response.status(404).end()
	}
})

blogRouter.delete('/:id', async (request, response) => {
	const verifiedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !verifiedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const blogToDelete = await Blog.findById(request.params.id)

	if(blogToDelete.user.toString() !== verifiedToken.id) {
		return response.status(401).send({error: 'invalid user credentials for deletion'})
	}

	Blog.findByIdAndRemove(request.params.id)

	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const body = request.body
	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, {runValidators: true, context: 'query', new: true})
	response.json(result)
})

blogRouter.post('/', async (request, response) => {
	const verifiedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !verifiedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(verifiedToken.id)
	const body = request.body
	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	}

	const blog = new Blog(newBlog)
	const result = await blog.save()

	user.blogs = [...user.blogs, result.id]
	await user.save()

	response.status(201).json(result)
})

module.exports = blogRouter
