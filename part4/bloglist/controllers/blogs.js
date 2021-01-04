const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)

	if(blog) {
		response.json(blog)
	}
	else {
		response.status(404).end()
	}
})

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
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
	const blog = new Blog(request.body)
	const result = await blog.save()
	response.status(201).json(result)
})

module.exports = blogRouter
