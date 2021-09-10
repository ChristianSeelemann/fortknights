import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/storybook', express.static('dist/storybook'));

app.get('/api/', async (_req, res) => {
  res.status(200).json({ message: 'API is running' });
});

app.use(express.static('dist/app'));
app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' });
});

app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(`Storybook is at http://localhost:${port}/storybook`);
});
