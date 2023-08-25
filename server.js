import { handler } from './build/handler.js';
import express from 'express';
import cors from 'cors';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

app.use(cors());

app.use(handler);

// Your routes and other configurations

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
