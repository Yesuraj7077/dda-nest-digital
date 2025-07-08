import * as express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/Routes';
const cors = require('cors');

dotenv.config();

const app = express.default();

app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  console.log('Authorization header:', req.headers.authorization);
  console.log(`Request ${req.method} ${req.url}`);
  next();
});
app.use('/api', routes);
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });

