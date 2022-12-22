require('dotenv').config()
exports.secret = process.env.JWT_SECRET;
exports.DB_QUERY_STRING = process.env.MONGO_CONNECTION_STRING;
