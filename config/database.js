const mongoose = require('mongoose')
const setUpDb = () => {
    mongoose.connect('mongodb://localhost:27017/task-management', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('DB Connected Successfully')
        })
        .catch(err => {
            console.log(err)
        })
}
module.exports = setUpDb