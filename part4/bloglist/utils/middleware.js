const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
	const auth = request.get('authorization')
	if(auth && auth.toLowerCase().startsWith('bearer ')) {
		request.token = auth.substring(7)
	}
	else {
		request.token = null
	}
	next()
}

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response, next) => {
	response.status(404).send({error: 'Unknown endpoint'})
	next()
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).send({error: error.message})
	}
	else if (error.name === 'JsonWebTokenError') {
		return response.status(401).send({error: 'invalid token'})
	}

	next(error)
}

module.exports = {
	unknownEndpoint,
	errorHandler,
	requestLogger,
	tokenExtractor
}
