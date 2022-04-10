let ErrorType = {

    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: "A general error",
        isShowStackTrace: true
    },
    EMAIL_ALREADY_REGISTERED: {
        id: 2,
        httpCode: 601,
        message: "Email address is already recognize in system",
        isShowStackTrace: false
    },
    INVALID_EMAIL_ADDRESS: {
        id: 3,
        httpCode: 602,
        message: "Invalid E-mail address, please check you input",
        isShowStackTrace: false
    },
    INVALID_PASSWORD: {
        id: 5,
        httpCode: 604,
        message: "Invalid password",
        isShowStackTrace: false
    }
}

module.exports = ErrorType;