require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors({
  origin: 'https://virajka.netlify.app',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

app.get('/', (req,res)=>res.send('API running'));

app.use('/auth', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running'));