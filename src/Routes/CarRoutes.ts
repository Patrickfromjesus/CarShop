import express, { NextFunction, Request, Response } from 'express';
import CarController from '../Controllers/CarController';
import validateMongoId from '../middlewares/validateMongoId';

const router = express.Router();

router.get('/');

router.post('/', async (req: Request, res: Response, next: NextFunction) => (
  new CarController(req, res, next).createCar()));

router.get('/', async (req: Request, res: Response, next: NextFunction) => (
  new CarController(req, res, next).getAllCars()));

router
  .get('/:id', validateMongoId, async (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).getCarById()));

router
  .put('/:id', validateMongoId, async (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).updateCar()));

router
  .delete('/:id', validateMongoId, async (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).deleteCar()));

export default router;
