import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;
  
  constructor(infos: ICar) {
    super(infos);
    this.seatsQty = infos.seatsQty;
    this.doorsQty = infos.doorsQty;
  }

  /* getModel() { return this.model };
  getYear() { return this.year };
  getColor() { return this.color };
  getStatus() { return this.status };
  getBuyValue() { return this.buyValue }; */
  getDoorsQty() { return this.doorsQty; }
  getSeatsQty() { return this.seatsQty; }
}

export default Car;
