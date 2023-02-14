import { Model } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/CarModel';

const NOT_FOUND = 'Car not found';

class CarService {
  private model: Model<ICar>;

  constructor() {
    this.model = new CarModel().model;
  }

  private createCarDomain(infos: ICar) {
    return new Car(infos);
  }

  async createCar(car: ICar) {
    const data = await this.model.create(car);
    return this.createCarDomain(data);
  }

  async getAllCars() {
    const data = await this.model.find();
    return data.map((car) => this.createCarDomain(car));
  }

  async getCarById(id: string) {
    const data = await this.model.findById({ _id: id });
    if (!data) throw new Error(NOT_FOUND);
    return this.createCarDomain(data);
  }

  async updateCar(id: string, fields: ICar) {
    const data = await this.model.findByIdAndUpdate({ _id: id }, fields);
    const newData = await this.model.findById({ _id: id });
    if (!(data && newData)) throw new Error(NOT_FOUND);
    return this.createCarDomain(newData);
  }

  async deleteCar(id: string) {
    const data = await this.model.deleteOne({ _id: id });
    if (data.deletedCount === 0) throw new Error(NOT_FOUND);
  }
}

export default CarService;
