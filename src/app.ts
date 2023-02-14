import express from 'express';
import Routes from './Routes';

const app = express();

app.use(express.json());
app.use('/cars', Routes.CarRoutes);
app.use('/motorcycles', Routes.MotorcyclesRoutes);

export default app;
