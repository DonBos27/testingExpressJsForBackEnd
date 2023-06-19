const { Router } = require('express');
const db = require('../database');

const router = Router();

router.get('/', (req, res) => {


    // This way is when we are using mysql2 but it does not work with mysql
    // const result = await db.promise().query('SELECT * FROM users');
    // res.status(200).json(result);
    // console.log(result)

    // This way is when we are using mysql but it also works with mysql2
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Failed to fetch users:', error);
            res.status(500).json({ message: 'Failed to fetch users' });
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
});
router.get('/posts', (req, res) => {
    res.status(200).send("Hey wassup");
})
router.post('/', (req, res) => {
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