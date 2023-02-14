import IVehicle from '../Interfaces/IVehicle';

abstract class Vehicle {
  protected id: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;

  constructor(infos: IVehicle) {
    this.id = infos._id || '';
    this.model = infos.model;
    this.year = infos.year;
    this.color = infos.color;
    this.status = infos.status || false;
    this.buyValue = infos.buyValue;
  }
}

export default Vehicle;
