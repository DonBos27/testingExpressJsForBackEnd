const { Router } = require('express');
const router = Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            console.error('Failed to fetch posts:', error);
            res.status(500).json({ message: 'Failed to fetch posts' });
        } else {
            res.status(200).json(results);
        }
    });
})
router.get('/myposts/:title', (req, res) => {
    res.json({ title: 'my first post', description: 'random data you shouldnt access' });
})
router.post('/', (req, res) => {
    console.log(req.body);
    const { title, description, review } = req.body;
    if (title && description && review) {
        db.query('INSERT INTO posts(title, description, review) VALUES(?,?,?)', [title, description, review], (error, result) => {
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