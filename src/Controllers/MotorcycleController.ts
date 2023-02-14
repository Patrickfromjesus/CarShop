import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private service: MotorcycleService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.service = new MotorcycleService();
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async createMotor() {
    try {
      const infos = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        category: this.req.body.category,
        engineCapacity: this.req.body.engineCapacity,
      };
      const data = await this.service.createMotor(infos);
      return this.res.status(201).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async getAllMotors() {
    try {
      const data = await this.service.getAllMotors();
      return this.res.status(200).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async getMotorsById() {
    try {
      const { id } = this.req.params;
      const data = await this.service.getMotorsById(id);
      return this.res.status(200).json(data);
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }

  async updateMotor() {
    try {
      const { id } = this.req.params;
      const infos = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        category: this.req.body.category,
        engineCapacity: this.req.body.engineCapacity,
      };
      const data = await this.service.updateMotor(id, infos);
      return this.res.status(200).json(data);
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }

  async deleteMotor() {
    try {
      const { id } = this.req.params;
      await this.service.deleteMotor(id);
      return this.res.status(204).end();
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }
}

export default MotorcycleController;
