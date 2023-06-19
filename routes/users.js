const { Router } = require('express');
const db = require('../database');
const { check, validationResult } = require('express-validator');

const router = Router();

router.get('/', (req, res) => {


    // This way is when we are using mysql2 but it does not work with mysql
    // const result = await db.promise().query('SELECT * FROM users');
    // res.status(200).json(result);
    // console.log(result)

    // This way is when we are using mysql but it also works with mysql2
    if (req.user) {
        db.query('SELECT * FROM users', (error, results) => {
            if (error) {
                console.error('Failed to fetch users:', error);
                res.status(500).json({ message: 'Failed to fetch users' });
            } else {
                console.log(results.find((user) => user.username === req.user.username));
                res.status(200).json(results.find((user) => user.username === req.user.username));
            }
        });
    }
    else {
        res.status(403).json({ message: 'Unauthorized' });
    }
});
router.get('/posts', (req, res) => {
    res.status(200).send("Hey wassup");
})
router.post('/', [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], (req, res) => {

    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    if (username && password) {
        db.query('INSERT INTO users(username, password) VALUES(?,?)', [username, password], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                res.status(201).send('Values inserted');
            }
        })
    }

})

module.exports = router;