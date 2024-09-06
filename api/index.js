const app = require('../backend/server');

module.exports = async (req, res) => {
    try {
        await app(req, res);
    } catch (error) {
        console.error('Serverless Function Error:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};