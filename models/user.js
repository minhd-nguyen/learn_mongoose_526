let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    meta: {
        age: Number,
        website: String
    }
},  {
        timestamps: true
    }
)

userSchema.methods.sayHello = function() {
    return 'Hi ' + this.name
}

let User = mongoose.model('User', userSchema)

module.exports = User