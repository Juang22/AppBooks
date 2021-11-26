
const respondSuccess = (res, responseData) => {

    return res.status(200).send(
        {
            message:responseData.message || '',
            data:responseData.data || {},
        }
    )
    .end();
}

module.exports = respondSuccess;