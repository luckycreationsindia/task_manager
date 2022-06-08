const mongoose = require('mongoose');

async function getDatabase() {
    return mongoose.connect(`mongodb://${process.env.DB_HOST || '127.0.0.1'}:${process.env.FB_PORT || 27017}/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = async () => {
    global.db = await getDatabase();
};