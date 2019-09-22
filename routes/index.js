var express = require('express');
var router = express.Router()

const middleware = require('../config/middleware')
const handlers = require('../services/handler')

router.post('/login', handlers.login);
router.get('/', middleware.checkToken, handlers.index);
router.get('/balance',middleware.checkToken,handlers.balance)
router.post('/spend',middleware.checkToken,handlers.spend)
router.get('/transactions',middleware.checkToken,handlers.transactions)

module.exports = router