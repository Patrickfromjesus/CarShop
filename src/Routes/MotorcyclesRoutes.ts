import express, { NextFunction, Request, Response } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import validateMongoId from '../middlewares/validateMongoId';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => (
  new MotorcycleController(req, res, next).createMotor()));

router.get('/', async (req: Request, res: Response, next: NextFunction) => (
  new MotorcycleController(req, res, next).getAllMotors()));

router.get('/:id', validateMongoId, async (req: Request, res: Response, next: NextFunction) => (
  new MotorcycleController(req, res, next).getMotorsById()));

router
  .put('/:id', validateMongoId, async (req: Request, res: Response, next: NextFunction) => (
    new MotorcycleController(req, res, next).updateMotor()));

router
  .delete('/:id', validateMongoId, async (req: Request, res: Response, next: NextFunction) => (
    new MotorcycleController(req, res, next).deleteMotor()));
  
export default router;
