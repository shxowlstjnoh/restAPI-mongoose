const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

server.use(bodyParser.json());
const User = require('./models/User');

server.get('/', (req, res) => {
    const newUser = new User();
    newUser.email = 'danny@gmail.com';
    newUser.name = 'danny';
    newUser.age = 25;
    newUser.save().then((user) => {
        console.log(user);
        res.json({ message: 'User Create Successfully' });
    }).catch((err) => {
        res.json({ message: 'User was not successfully created' })
    })
})
/// CRUD(Create, Read, Update, Delete)
const users = [{
    id: "1",
    name: 'taejin',
    email: 'taejin@gmail.com'
}, {
    id: '2',
    name: 'jin',
    email: 'jin@gmail.com'
}];

server.get('/api/user', (req, res) => {
    res.json(users);
})

server.get('/api/user/:id', (req, res) => {
    const user = users.find((u) => {
        return u.id === req.params.id;
    });
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ errorMessage: "user was not found" })
    }
})

server.post('/api/user', (req, res) => {
    users.push(req.body);
    res.json(users);
})

server.put('/api/user/:id', (req, res) => {
    let foundIndex = users.findIndex(u => u.id === req.params.id);
    if (foundIndex === -1) {
        res.status(404).json({ errorMessage: 'User was not found' })
    } else {
        users[foundIndex] = { ...users[foundIndex], ...req.body }
        res.json(users[foundIndex]);
    }
})

server.delete('/api/user/:id', (req, res) => {
    let foundIndex = users.findIndex(u => u.id === req.params.id);
    if (foundIndex === -1) {
        res.status(404).json({ errorMessage: "User was not found" })
    } else {
        let foundUser = users.splice(foundIndex, 1);
        res.json(foundUser[0]);
    }
})

server.listen(8080, (err) => {
    if (err) {
        return console.log(err);
    }
    else {
        mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Connected to database successfully")
            }
        })

    }
})