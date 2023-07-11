import express from 'express';
import instrumentRoutes from './routes/securities';
import portfolioroutes from './routes/portfolio';
import rightroutes from './routes/subscriptionRight';

export const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const PORT: number = Number(process.env.PORT) || 3001;
app.use('/api/securities', instrumentRoutes);
app.use('/api/portfolio', portfolioroutes);
app.use('/api/subscriptionrights', rightroutes);

app.listen(PORT);
