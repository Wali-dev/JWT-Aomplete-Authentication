function errorHandler(err, req, res, next) {
    let errorMessage = {
        status: err.status || 'error',
        message: err.message || 'Internal Server Error'
    };
    res.status(err.statusCode || 500).json(errorMessage);
}

export { errorHandler };