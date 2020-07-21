let express = require('express')
let app = express()

app.use(express.urlencoded({extended: false}))

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/introgoose')
let db = mongoose.connection
let User = require('./models/user')

// db.once runs this function ONCE the parameter is fulfilled. In this case, when the DB connection is opened.
db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

// db.on runs EVERY TIME the parameter is fulfilled. In this case, in the event of an error.
db.on('error', (err) => {
    console.error(`Database error: ${err}`)
})

// Some basic seeder code, if you want it.
// let newUser = User({
//     name: 'Nick',
//     email: 'nick@nick.com',
//     meta: {
//         age: 200,
//         website: 'google.com'
//     }
// })

// newUser.save((err) => {
//     if(err) return console.log(err)
//     console.log('User created!')
// })

// User.create({
//     name: 'Eliott',
//     email: 'saruman@thewhitetower.com',
//     meta: {
//         age: 1500,
//         website: 'hobbits-r-bad.com'
//     }   
// }, (err, user) => {
//     if (err) return console.log(err)
//     console.log(user)
// })

// Home route populates a list of all users
app.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.send(err)
        res.send(users)
    })
})

// Route to get a user by their ID
app.get('/gettheid/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.send(err)
        res.send(user)
    })
})

// Route to get a user by their email
app.get('/:email', (req, res) => {
    User.find({email: req.params.email}, (err, user) => {
        if (err) res.send(err)
        res.send(user)
    })
})

// Route to update the age of all users matching name
app.post('/age/:name', (req, res) => {
    User.updateMany({name: req.params.name}, {meta: {age: req.body.age}}, (err, user) => {
        if (err) res.send(err)
        res.send(user)
    })
})

// Route to add a user
app.post('/new', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        meta: {
            age: req.body.age,
            website: req.body.website
        }
    }, (err, user) => {
        if(err) res.send(err)
        res.send(user)
    })
})

// Route deletes *all* users with the entered name
app.delete('/deleteall/:name', (req, res) => {
    User.remove({ name: req.params.name }, (err) => {
        if (err) res.send(err)
        res.send('Users deleted!')
    })
})

// Route deletes ONE user with the entered name.
app.delete('/delete/:name', (req, res) => {
    User.findOneAndRemove({name: req.params.name}, (err) => {
        if(err) res.send(err)
        res.send('User deleted.')
    })
})


app.listen(3000, () => {console.log('Hey hey hey, its port 3000')})