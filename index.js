let express = require('express')
let app = express()

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/introgoose')
let db = mongoose.connection
let User = require('./models/user')

db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', (err) => {
    console.error(`Database error: ${err}`)
})

let newUser = User({
    name: 'Nick',
    email: 'nick@nick.com',
    meta: {
        age: 200,
        website: 'google.com'
    }
})

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

// User.updateMany({name: 'Nick'}, {$set: {meta: {age: 1497}}}, (err, user) => {
//     if (err) console.log(err)
//     console.log(user)
// })

// User.findOneAndUpdate({name: 'Eliott'}, { meta: {age: 1498}}, (err, user) => {
//     if(err) console.log(err)
//     console.log(user)
// })



app.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.send(err)
        res.send(users)
    })
    // User.findOne({email: 'saruman@thewhitetower.com'}, (err, user) => {
    //     if(err) res.send(err)
    //     res.send(user)
    // })
})


app.get('/gettheid/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.send(err)
        res.send(user)
    })
})

app.get('/:email', (req, res) => {
    User.find({email: req.params.email}, (err, user) => {
        if (err) res.send(err)
        res.send(user)
    })
})

app.listen(3000, () => {console.log('Hey hey hey, its port 3000')})