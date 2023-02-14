import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarModel extends AbstractODM<ICar> {
  constructor() {
    const options = {
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: Boolean,
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    };
    super(options, 'Car');
  }
}

export default CarModel;