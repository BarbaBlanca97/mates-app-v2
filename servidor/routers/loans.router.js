const router        = require('express').Router();
const controller    = require('../controllers/loans.controller');
const loanParser    = require('../tools/loans.parser');

router.use('/prestamos', loanParser.parseBody);

router.post('/prestamos', controller.createLoan);

router.get('/prestamos', controller.getLoans);

router.put('/prestamos', controller.reciveLoan);

module.exports = router;