const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('totalLikes', () => {
	test('of an empty list is 0', () => {
		const blogs = []
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(0)
	})

	test('when list has only one blog to be likes of that', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			}]

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(5)
	})

	test('of a bigger list is calculated right', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0
			}
		]

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(36)
	})
})

describe('favouriteBlog', () => {
	test('in an empty list is an empty object', () => {
		const blogs = []
		const result = listHelper.favouriteBlog(blogs)
		expect(result).toEqual({})
	})

	test('in a list of one blog is the blog', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			}]

		const result = listHelper.favouriteBlog(blogs)
		expect(result).toEqual({
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})

	test('in a list of blogs is calculated correctly', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0
			}
		]

		const result = listHelper.favouriteBlog(blogs)
		expect(result).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12
		})
	})
})

describe('mostBlogs', () => {
	test('of an empty list is an empty object', () => {
		const blogs = []
		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual({})
	})

	test('of a list of one blog is the author of the blog', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			}]

		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 1
		})
	})

	test('of a list of blogs with the same author returns the right number of blogs', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0
			}
		]

		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 2
		})

	})

	test('of a list of blogs with multiple authors returns the right author', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0
			}
		]

		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})
})

describe('mostLikes', () => {
	test('of an empty list is an empty object', () => {
		const blogs = []
		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual({})
	})

	test('of a list of one blog returns the likes of the blog', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			}]

		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})

	test('of a list of multiple blogs by the same author returns the right number of likes', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0
			}
		]

		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})

	test('of a list of multiple authors returns the right author', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0
			}
		]

		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})
})
