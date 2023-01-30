const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const skillExchangeRoutes = require('./src/routes/skillExchangeRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('SkillShareHub API is running');
});

/******* Routes ******/
app.use('/api/users', userRoutes);
app.use('/api/skill-exchanges', skillExchangeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ratings', ratingRoutes);



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => console.log(err));
