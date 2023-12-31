import mongoose from 'mongoose';

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)