import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';

import db from './config/db.js'
import routes from './routes/Routes.js'
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());

//connect to database
mongoose.connect(db.connectString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
   console.log('Succeffuly connected to db');
}).catch((err) => {
   console.log(err);
})

app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}`);
})