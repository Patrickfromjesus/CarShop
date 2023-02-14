import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const NOT_FOUND = 'Car not found';

describe('Testes da camada Service de Car', function () {
  it('Teste para criação de carros com sucesso', async function () {
    const input: ICar = {
      model: 'Focus',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 50000,
      doorsQty: 4,
      seatsQty: 5,
    };

    const output = {
      id: '63ea3df3c632aab1a78764e7',
      model: 'Focus',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 50000,
      doorsQty: 4,
      seatsQty: 5,
    };

    const CarDomain = new Car(output);

    Sinon.stub(Model, 'create').resolves(output);

    const result = await new CarService().createCar(input);
    expect(result).to.be.deep.equal(CarDomain);
  });

  it('Teste para listar todos os carros com sucesso', async function () {
    const output = [
      {
        id: '63ea3df3c632aab1a78764e7',
        model: 'Focus',
        year: 2012,
        color: 'black',
        status: true,
        buyValue: 50000,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '63ea3df3c632aab1a7876e10',
        model: 'Civic',
        year: 2018,
        color: 'gold',
        status: true,
        buyValue: 70000,
        doorsQty: 4,
        seatsQty: 5,
      },
    ];

    const CarDomain = [
      new Car(output[0]),
      new Car(output[1]),
    ];

    Sinon.stub(Model, 'find').resolves(output);

    const result = await new CarService().getAllCars();
    expect(result).to.be.deep.equal(CarDomain);
  });

  it('Teste para listar os carros pelo id com sucesso', async function () {
    const output = {
      id: '63ea3df3c632aab1a7876e10',
      model: 'Civic',
      year: 2018,
      color: 'gold',
      status: true,
      buyValue: 70000,
      doorsQty: 4,
      seatsQty: 5,
    };

    const CarDomain = new Car(output);

    Sinon.stub(Model, 'findById').resolves(output);

    const result = await new CarService().getCarById('63ea3df3c632aab1a7876e10');
    expect(result).to.be.deep.equal(CarDomain);
  });

  it('Teste para listar os carros pelo id inexistente', async function () {
    const output = '';

    Sinon.stub(Model, 'findById').resolves(output);

    try {
      await new CarService().getCarById('63ea3df3c632aab1a7876e10');
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND);
    }
  });

  it('Teste para alterar os carros pelo id com sucesso', async function () {
    const input: ICar = {
      model: 'Ranger',
      year: 2016,
      color: 'silver',
      buyValue: 10000,
      doorsQty: 4,
      seatsQty: 5,
    };

    const output = {
      _id: '63ea3df3c632aab1a7876e10',
      model: 'Ranger',
      year: 2016,
      color: 'silver',
      buyValue: 10000,
      doorsQty: 4,
      seatsQty: 5,
    };

    const expectedResult = new Car(output);

    Sinon.stub(Model, 'findOneAndUpdate').resolves(output);
    Sinon.stub(Model, 'findById').resolves(output);

    const result = await new CarService().updateCar('63ea3df3c632aab1a7876e10', input);
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('Teste para alterar os carros pelo id com id inválido', async function () {
    const input: ICar = {
      model: 'Ranger',
      year: 2016,
      color: 'silver',
      buyValue: 10000,
      doorsQty: 4,
      seatsQty: 5,
    };

    Sinon.stub(Model, 'findOneAndUpdate').resolves();
    Sinon.stub(Model, 'findById').resolves();

    try {
      await new CarService().updateCar('63ea3df3c632aab1a7876e10', input);
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND);
    }
  });

  it('Teste para deleter as carros pelo id com id inválido', async function () {
    Sinon.stub(Model, 'deleteOne').resolves({ deletedCount: 0, acknowledged: true });

    try {
      await new CarService().deleteCar('63ea3df3c632aab1a7876e10');
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND);
    }
  });

  it('Teste para deleter as carros pelo id com sucesso', async function () {
    Sinon.stub(Model, 'deleteOne').resolves({ deletedCount: 1, acknowledged: true });

    const service = new CarService();
    await service.deleteCar('63ea3df3c632aab1a7876e10');
  });

  afterEach(function () { return Sinon.restore(); });
});