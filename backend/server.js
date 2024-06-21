const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname,"config/config.env")});

const PORT = process.env.PORT || 3500;


// Middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/login', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))



app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));