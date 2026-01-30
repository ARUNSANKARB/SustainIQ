const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const quizRoutes = require('./routes/quiz');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/quiz', quizRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`SustainIQ backend running on port ${PORT}`));
