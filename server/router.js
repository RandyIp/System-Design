const express = require('express')
const router = express.Router()
const reviews = require('./Controllers/reviews.js')

router.get('/reviews', (req, res) => reviews.get(req, res))
router.post('/reviews', (req, res) => reviews.post(req, res))
router.get('/reviews/meta', (req, res) => reviews.meta(req, res))
router.put('/reviews/:review_id/helpful', (req, res) => reviews.helpful(req, res))
router.put('/reviews/:review_id/report', (req, res) => reviews.report(req, res))
router.get('/test', (req, res) => reviews.test(req, res))

module.exports = router