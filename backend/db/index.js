const mongoose = require('mongoose');

exports.initDataBase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@gmct9cluster.nix2w8h.mongodb.net/?retryWrites=true&w=majority`);
}
