import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

app.use(express.json());
app.disable('x-powered-by');

app.use('/storybook', express.static('dist/storybook'));

app.get('/api/lookup/:id', async (request, response) => {
  const { id } = request.params;
  const user = await fetch(`https://fortniteapi.io/v1/lookup?username=${id}`, {
    headers: {
      Authorization: `${API_KEY}`,
    },
  });
  const userData = await user.json();
  response.json(userData);
});

app.get('/api/stats', async (request, response) => {
  const queries = request.query.id;

  if (typeof queries !== 'string' && !Array.isArray(queries)) {
    response.status(400).json({ error: 'Query is malformed.' });
    return;
  }

  if (typeof queries === 'string') {
    const res = await fetch(
      `https://fortniteapi.io/v1/stats?account=${queries}`,
      {
        headers: {
          Authorization: `${API_KEY}`,
        },
      }
    );
    const data = await res.json();
    const jointData = { data, id: queries };

    response.json([jointData]);
    return;
  }

  const multipleData = await Promise.all(
    queries.map(async (id) => {
      const res = await fetch(`https://fortniteapi.io/v1/stats?account=${id}`, {
        headers: {
          Authorization: `${API_KEY}`,
        },
      });
      const data = await res.json();
      return { data, id };
    })
  );
  response.json(multipleData);
});

app.get('/api/news', async (request, response) => {
  const queries = request.query.mode;
  const newsFetch = await fetch(
    `https://fortniteapi.io/v1/news?lang=en&type=${queries}`,
    {
      headers: {
        Authorization: `${API_KEY}`,
      },
    }
  );
  const newsData = await newsFetch.json();
  const news = newsData.news;
  response.json(news);
});

app.get('/api/items', async (_request, response) => {
  const itemsFetch = await fetch('https://fortniteapi.io/v2/shop?lang=en', {
    headers: {
      Authorization: `${API_KEY}`,
    },
  });
  const itemsData = await itemsFetch.json();
  const items = itemsData.shop;
  response.json(items);
});

app.get('/api', (_request, response) => {
  response.send('Hello API');
});

app.use(express.static('dist/app'));

app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
