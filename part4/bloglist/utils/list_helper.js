const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const summedLikes = blogs.length === 0 ?
		0 :
		blogs.reduce((sum, blog) => {
			return sum + blog.likes
		}, 0)
	return summedLikes
}

const favouriteBlog = (blogs) => {
	let favBlog = {}
	let maxLikes = 0
	blogs.forEach((blog) => {
		if(blog.likes > maxLikes) {
			favBlog = {
				title: blog.title,
				author: blog.author,
				likes: blog.likes
			}
			maxLikes = blog.likes
		}
	})
	return favBlog
}

const mostBlogs = (blogs) => {
	const authors = _.groupBy(blogs, blog => blog.author)

	let maxAuthor = {}
	let maxBlogs = 0
	for (const author in authors) {
		if(authors[author].length > maxBlogs) {
			maxBlogs = authors[author].length
			maxAuthor = {
				author,
				blogs: maxBlogs
			}
		}
	}

	return maxAuthor
}

const mostLikes = (blogs) => {
	const authors = _.groupBy(blogs, blog => blog.author)

	let maxAuthor = {}
	let maxLikes = 0
	for (const author in authors) {
		const authorLikes = authors[author].reduce((sum, blog) => sum + blog.likes, 0)
		if(authorLikes > maxLikes) {
			maxLikes = authorLikes
			maxAuthor = {
				author,
				likes: maxLikes
			}
		}
	}

	return maxAuthor
}


module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
}
