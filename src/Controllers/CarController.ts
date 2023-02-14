import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private service: CarService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.service = new CarService();
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async createCar() {
    try {
      const infos = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        doorsQty: this.req.body.doorsQty,
        seatsQty: this.req.body.seatsQty,
      };
      const data = await this.service.createCar(infos);
      return this.res.status(201).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async getAllCars() {
    try {
      const data = await this.service.getAllCars();
      return this.res.status(200).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async getCarById() {
    try {
      const { id } = this.req.params;
      const data = await this.service.getCarById(id);
      return this.res.status(200).json(data);
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }

  async updateCar() {
    try {
      const { id } = this.req.params;
      const infos = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        doorsQty: this.req.body.doorsQty,
        seatsQty: this.req.body.seatsQty,
      };
      const data = await this.service.updateCar(id, infos);
      return this.res.status(200).json(data);
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }

  async deleteCar() {
    try {
      const { id } = this.req.params;
      await this.service.deleteCar(id);
      return this.res.status(204).end();
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }
}

export default CarController;
