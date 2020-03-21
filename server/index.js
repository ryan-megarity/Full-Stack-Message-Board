const express = require('./node_modules/express');
const cors = require('./node_modules/cors/lib');
const bodyParser = require('./node_modules/body-parser');
const morgan = require('./node_modules/morgan');

const messages = require('./db/messages');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.json({
        message: "Full Stack Message Board! WITH NODEMON"
    });
});

app.get('/messages', (req,res) => {
    messages.getAll().then((messages) => {
        res.json(messages);
    });
});

app.post('/messages', (req,res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`listening on ${port}`);
})