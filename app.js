const express = require('express') // express is used to create the server

// const cookieParser = require('cookie-parser') // cookie parser is used to parse the cookies
const session = require('express-session') // express session is used to create the session
const store = new session.MemoryStore(); // store is used to store the session id in the server
const passport = require('passport'); // passport is used to authenticate the user

const local = require('./strategies/local'); // local is used to authenticate the user using local strategy
const userRoute = require('./routes/users') // userRoute is used to get the user routes
const postRoute = require('./routes/posts') // postRoute is used to get the post routes
const authRoute = require('./routes/auth') // authRoute is used to get the auth routes

const app = express(); // app is used to create the server
const port = 3000; // port is used to set the port number of the server
const cors = require('cors'); // cors is used to allow the cross origin resource sharing




// Middleware functions are functions that have access to the request object (req), 
// the response object (res), and the next middleware function in the application’s request-response cycle. 
// The next middleware function is commonly denoted by a variable named next().
// Middleware functions can perform the following tasks:
// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.



app.use(cors());    // cors is used to allow the cross origin resource sharing
// app.use(cookieParser());    // cookie parser is used to parse the cookies
app.use(session({
    secret: 'secret',   // secret is used to encrypt the session id
    saveUninitialized: false,  // saveUninitialized is used to save the session id in the server
    cookie: {  // cookie is used to set the cookie
        maxAge: 1000 * 60 * 60 * 24 * 2, // maxAge is used to set the expiry time of the cookie
    },
    resave: true, // save is used to save the cookie
    store // store is used to store the session id in the server
}))
app.use(express.json());   // express.json is used to parse the json data
app.use(express.urlencoded({ extended: false })); // express.urlencoded is used to parse the url encoded data
app.use((req, res, next) => {  // middleware function to log the request object
    // console.log(store) // store is used to store the session id in the server
    console.log(`${req.method} - ${req.url}`); // req.method is used to get the method of the request
    next(); // next is used to call the next middleware function
    // console.log(req.method);
})
app.use(passport.initialize()); // passport.initialize is used to initialize the passport
app.use(passport.session()); // passport.session is used to create the session


app.use('/users', userRoute); // userRoute is used to get the user routes
app.use('/posts', postRoute); // postRoute is used to get the post routes
app.use('/auth', authRoute); // authRoute is used to get the auth routes

// app listening on port 3000 means that the server is running on port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})




// Datas to be sent to the server

// const users = [
//     {
//         id: 1,
//         name: 'Michael',
//         age: 22
//     },
//     {
//         id: 2,
//         name: 'Don',
//         age: 22

//     },
//     {
//         id: 3,
//         name: 'Christ',
//         age: 22

//     }
// ]

// const post = [
//     {
//         title: 'The Food Center',
//         location: 'Orange Grove Park',
//         description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         distance: '1.2km away from you',
//         image: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg'
//     },
//     {
//         title: 'No Kid Hungry',
//         location: 'Orange Grove PickNPay',
//         description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         distance: '1.5km away from you',
//         image: 'https://hips.hearstapps.com/hmg-prod/images/no-kid-hungry-humanitarian-seal-1574275240.jpg'
//     }

// ]
// // post method to send data to the server 

// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.status(201).send('Post request received')
// })



// // get method to get the data from the server 

// app.get('/', (req, res) => {
//     res.status(200).send('Hello World!');
// })


// // get method to get the data from the server by title 
// app.get('/post/:title', (req, res) => {
//     const { title } = req.query;
//     console.log(req.query);
//     if (title) {
//         const findpost = post.find((post) => post.title === title);
//         if (findpost) {
//             res.status(200).send(findpost)
//         }
//         else {
//             res.status(404).send('Post not found')
//         }
//     }
//     // res.send(post)
// })

// // get method to get the data from the server
// app.get('/post', (req, res) => {
//     res.send(post)
// })

// app.get('/users', (req, res) => {
//     res.status(200).send(users)
// })

// app.get('/users/:name', (req, res) => {
//     console.log(req.params);
//     const { name } = req.params;
//     const user = users.find((user) => user.name === name);
//     if (user) {
//         res.status(200).send(user)
//     }
//     else {
//         res.status(404).send('User not found')
//     }
// })


// // function to validate the cookies 
// function validateCookies(req, res, next) {
//     const { cookies } = req;
//     console.log(cookies);
//     next();
//     // if('session_id' in cookies){
//     //     if(cookies.session_id === '123456'){
//     //         next();
//     //         console.log("Session id is valid")
//     //     }
//     //     else{
//     //         res.status(403).send('Forbidden')
//     //     }
//     // }
//     // else{
//     //     res.status(403).send('Forbidden')
//     // }

// }
// // cookies parsing means that the cookies are parsed and stored in the cookies object
// // app.get('/signin', validateCookies, (req, res) => {
// //     res.cookie('session_id', '123456')
// //     res.status(200).json({'msg': 'Sign in page'})
// // })

// // app.get('/signout', (req, res) => {
// //     res.clearCookie('session_id')
// //     res.status(200).json({'msg': 'Sign out page'})
// // })


// // session parsing means that the session id is parsed and stored in the session object
// app.post('/login', (req, res) => {
//     console.log(req.sessionID)
//     const { username, password } = req.body;
//     if (username && password) {
//         if (req.session.authenticated) {
//             res.json(req.session)
//         }
//         else {
//             if (password === '123456') {
//                 req.session.authenticated = true;
//                 req.session.user = {username, password};
//                 res.json(req.session)
//             }
//             else {
//                 res.status(401).json({ 'msg': 'Unauthorized' })
//             }
//         }
//     }
//     // res.status(200).json({ 'msg': 'Login page' })
// })



