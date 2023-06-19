const express = require('express')

const cookieParser = require('cookie-parser')

const app = express();
const port = 3000;
const cors = require('cors');

// middleware to log the request object 

// Middleware functions are functions that have access to the request object (req), 
// the response object (res), and the next middleware function in the application’s request-response cycle. 
// The next middleware function is commonly denoted by a variable named next.

// Middleware functions can perform the following tasks:
// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.

app.use(cors());    // cors is used to allow the cross origin resource sharing
app.use(cookieParser());    // cookie parser is used to parse the cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
    // console.log(req.method);
})


// cookies and sessions  // cookies are stored in the browser and sessions are stored in the server 


// Datas to be sent to the server

const users = [
    {
        id: 1,
        name: 'Michael',
        age: 22
    },
    {
        id: 2,
        name: 'Don',
        age: 22

    },
    {
        id: 3,
        name: 'Christ',
        age: 22

    }
]

const post = [
    {
        title: 'The Food Center',
        location: 'Orange Grove Park',
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        distance: '1.2km away from you',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg'
    },
    {
        title: 'No Kid Hungry',
        location: 'Orange Grove PickNPay',
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        distance: '1.5km away from you',
        image: 'https://hips.hearstapps.com/hmg-prod/images/no-kid-hungry-humanitarian-seal-1574275240.jpg'
    }

]
// post method to send data to the server 

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('Post request received')
})



// get method to get the data from the server 

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})


// get method to get the data from the server by title 
app.get('/post/:title', (req, res) => {
    const { title } = req.query;
    console.log(req.query);
    if (title) {
        const findpost = post.find((post) => post.title === title);
        if (findpost) {
            res.status(200).send(findpost)
        }
        else {
            res.status(404).send('Post not found')
        }
    }
    // res.send(post)
})

// get method to get the data from the server
app.get('/post', (req, res) => {
    res.send(post)
})

app.get('/users', (req, res) => {
    res.status(200).send(users)
})

app.get('/users/:name', (req, res) => {
    console.log(req.params);
    const { name } = req.params;
    const user = users.find((user) => user.name === name);
    if (user) {
        res.status(200).send(user)
    }
    else {
        res.status(404).send('User not found')
    }
})

function validateCookies(req, res, next){
    const { cookies } = req;
    console.log(cookies);
    next();
    // if('session_id' in cookies){
    //     if(cookies.session_id === '123456'){
    //         next();
    //         console.log("Session id is valid")
    //     }
    //     else{
    //         res.status(403).send('Forbidden')
    //     }
    // }
    // else{
    //     res.status(403).send('Forbidden')
    // }

}

app.get('/signin', validateCookies, (req, res) => {
    res.cookie('session_id', '123456')
    res.status(200).json({'msg': 'Sign in page'})
})

app.get('/signout', (req, res) => {
    res.clearCookie('session_id')
    res.status(200).json({'msg': 'Sign out page'})
})


// put method to update the data in the server

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})