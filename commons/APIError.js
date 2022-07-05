class APIError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "API Error"
        this.message = message
        this.code = code
    }
}

module.exports = APIError