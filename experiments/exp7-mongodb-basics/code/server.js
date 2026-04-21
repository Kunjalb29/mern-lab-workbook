const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

const UserSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model('User', UserSchema);

console.log('Mongoose schema defined.');