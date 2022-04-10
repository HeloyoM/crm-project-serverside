const e = require("./errorType");
let errorHandler = (e, req, res, next) => {

    if (e.errorType != undefined) {

        if (e.errorType.isShowStackTrace) {
            console.error(e);
        }

        res.status(e.httpCode).json({ error: e.message });
        return;
    }

    console.error(e);

    res.status(700).json({ error: "General error" });
}

module.exports = errorHandler;