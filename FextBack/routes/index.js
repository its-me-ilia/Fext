const {Router} = require('express');
const router = Router();

router.use('/api/findorcreate', require('./signUser'));

module.exports = router;