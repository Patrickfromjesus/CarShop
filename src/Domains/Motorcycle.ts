import IMotorcycle from '../Interfaces/IMotorcycle';
import Auto from './Vehicle';

class Motorcycle extends Auto {
  private category: string;
  private engineCapacity: number;

  constructor(infos: IMotorcycle) {
    super(infos);
    this.category = infos.category;
    this.engineCapacity = infos.engineCapacity;
  }

  getCategory() { return this.category; }
  getEngineCapacity() { return this.engineCapacity; }
}

export default Motorcycle;
