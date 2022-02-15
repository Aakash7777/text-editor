const express = require('express');
const mongoose = require('mongoose');
const unless = require('express-unless');
const cors = require('cors');

const dbConfig = require('./config/db.config');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/error');

const app = express();
const port = process.env.port || 4000;

app.use(cors({
    origin: 'http://localhost:3000'
}))

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected')
},
(err) => {
    console.log(err)
})

auth.authenticateToken.unless = unless;

app.use(
    auth.authenticateToken.unless({
        path: [
            {url: "/users/login", methods: ['POST']},
            {url: "/users/register", methods: ['POST']}
        ]
    }) 
)

app.use(express.json());

app.use('/users', require('./routes/users.routes'));
app.use('/docs', require('./routes/userDocs.routes'));

app.use(errors.errorHandler);

app.listen(port, function() {
    console.log('ready to go!', port)
})