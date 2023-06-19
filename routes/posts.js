const{Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})
router.get('/myposts/:title', (req, res) => {
    res.json({ title: 'my first post', description: 'random data you shouldnt access' });
})

module.exports = router;