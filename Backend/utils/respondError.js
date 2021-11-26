const httpStatus = require('http-status');

const respondError = (res, error) => {
    const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    let errorContent = {
        message:error.message
    };

    return res.status(status).send(errorContent).end();
}

module.exports = respondError;