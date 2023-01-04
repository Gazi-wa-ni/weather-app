const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');
const url = require('url');

// Env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_NAME;
const API_KEY_VALUE = process.env.API_KEY;

// Init cache
let cache = apicache.middleware;


router.get('/', cache('5 minutes'), async (req, res) => {
    try {

        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
        res.status(200).json(apiRes.body)
    } catch (error) {
        console.log(error);
        res.status(401)
    }

})

router.get('/getWatherBYlocation', cache('5 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
        res.status(200).json(apiRes.body)
    } catch (error) {
        console.log(error);
        res.status(401)
    }

})

module.exports = router