import dotenv from 'dotenv';
import express from 'express';
import users from './lib/routes/users';
import images from './lib/routes/images';
import { connectDb } from './utils/database';
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/storybook', express.static('dist/storybook'));
app.use('/api', users);
app.use('/api', images);

app.use(express.static('dist/app'));
app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' });
});

connectDb().then(
  () => {
    app.listen(port, async () => {
      console.log('Connected to MongoDB');
      console.log(`Frontend listening at http://localhost:3000`);
      console.log(`Backend listening at http://localhost:${port}`);
      console.log(`Storybook is at http://localhost:6006`);
    });
  },
  (error) => console.error(error)
);
