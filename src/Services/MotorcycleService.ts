import { Model } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/MotorcycleModel';

const NOT_FOUND = 'Motorcycle not found';

class MotorcycleService {
  private model: Model<IMotorcycle>;

  constructor() {
    this.model = new MotorcycleModel().model;
  }

  private createMotorDomain(motor: IMotorcycle) {
    return new Motorcycle(motor);
  }

  async createMotor(motor: IMotorcycle) {
    const data = await this.model.create(motor);
    return this.createMotorDomain(data);
  }

  async getAllMotors() {
    const data = await this.model.find();
    return data.map((motor) => this.createMotorDomain(motor));
  }

  async getMotorsById(id: string) {
    const data = await this.model.findById({ _id: id });
    if (!data) throw new Error(NOT_FOUND);
    return this.createMotorDomain(data);
  }

  async updateMotor(id: string, infos: IMotorcycle) {
    const data = await this.model.findByIdAndUpdate({ _id: id }, infos);
    const newData = await this.model.findById({ _id: id });
    if (!(data && newData)) throw new Error(NOT_FOUND);
    return this.createMotorDomain(newData);
  }

  async deleteMotor(id: string) {
    const data = await this.model.deleteOne({ _id: id });
    if (data.deletedCount === 0) throw new Error(NOT_FOUND);
  }
}

export default MotorcycleService;
