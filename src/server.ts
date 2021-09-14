import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/lookup/:id', async (request, response) => {
  const { id } = request.params;
  const user = await fetch(`https://fortniteapi.io/v1/lookup?username=${id}`, {
    headers: {
      Authorization: 'e63f4351-b625ddac-254af606-5a2d8ef0',
    },
  });
  const userData = await user.json();
  response.json(userData);
});

app.get('/api', (_request, response) => {
  response.send('Hello API');
});

app.use('/storybook', express.static('dist/storybook'));
app.use(express.static('dist/app'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
