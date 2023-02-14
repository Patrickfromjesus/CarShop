import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const NOT_FOUND = 'Motorcycle not found';

describe('Testes da camada Service de Motorcycle', function () {
  it('Teste para criação de motos com sucesso', async function () {
    const input: IMotorcycle = {
      model: 'Focus',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 50000,
      category: 'Street',
      engineCapacity: 1000,
    };

    const output = {
      id: '63ea3df3c632aab1a78764e7',
      model: 'Focus',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 50000,
      category: 'Street',
      engineCapacity: 1000,
    };

    const MotorDomain = new Motorcycle(output);

    Sinon.stub(Model, 'create').resolves(output);

    const result = await new MotorcycleService().createMotor(input);
    expect(result).to.be.deep.equal(MotorDomain);
  });

  it('Teste para listar todos os motos com sucesso', async function () {
    const output = [
      {
        id: '63ea3df3c632aab1a78764e7',
        model: 'Focus',
        year: 2012,
        color: 'black',
        status: true,
        buyValue: 50000,
        category: 'Street',
        engineCapacity: 1000,
      },
      {
        id: '63ea3df3c632aab1a7876e10',
        model: 'Civic',
        year: 2018,
        color: 'gold',
        status: true,
        buyValue: 70000,
        category: 'Trail',
        engineCapacity: 2300,
      },
    ];

    const MotorDomain = [
      new Motorcycle(output[0]),
      new Motorcycle(output[1]),
    ];

    Sinon.stub(Model, 'find').resolves(output);

    const result = await new MotorcycleService().getAllMotors();
    expect(result).to.be.deep.equal(MotorDomain);
  });

  it('Teste para listar os motos pelo id com sucesso', async function () {
    const output = {
      id: '63ea3df3c632aab1a7876e10',
      model: 'Civic',
      year: 2018,
      color: 'gold',
      status: true,
      buyValue: 70000,
      category: 'Trail',
      engineCapacity: 2300,
    };

    const MotorDomain = new Motorcycle(output);

    Sinon.stub(Model, 'findById').resolves(output);

    const result = await new MotorcycleService().getMotorsById('63ea3df3c632aab1a7876e10');
    expect(result).to.be.deep.equal(MotorDomain);
  });

  it('Teste para listar as motos pelo id inexistente', async function () {
    const output = '';

    Sinon.stub(Model, 'findById').resolves(output);

    try {
      await new MotorcycleService().getMotorsById('63ea3df3c632aab1a7876e10');
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND);
    }
  });

  it('Teste para alterar as motos pelo id com sucesso', async function () {
    const input: IMotorcycle = {
      model: 'Ranger',
      year: 2016,
      color: 'silver',
      buyValue: 10000,
      category: 'Trail',
      engineCapacity: 10000,
    };

    const output = {
      _id: '63ea3df3c632aab1a7876e10',
      model: 'Ranger',
      year: 2016,
      color: 'silver',
      buyValue: 10000,
      category: 'Trail',
      engineCapacity: 10000,
    };

    const expectedResult = new Motorcycle(output);

    Sinon.stub(Model, 'findOneAndUpdate').resolves(output);
    Sinon.stub(Model, 'findById').resolves(output);

    const result = await new MotorcycleService().updateMotor('63ea3df3c632aab1a7876e10', input);
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('Teste para alterar as motos pelo id com id inválido', async function () {
    const input: IMotorcycle = {
      model: 'Ranger',
      year: 2016,
      color: 'silver',
      buyValue: 10000,
      category: 'Trail',
      engineCapacity: 10000,
    };

    Sinon.stub(Model, 'findOneAndUpdate').resolves();
    Sinon.stub(Model, 'findById').resolves();

    try {
      await new MotorcycleService().updateMotor('63ea3df3c632aab1a7876e10', input);
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND);
    }
  });

  it('Teste para deleter as motos pelo id com id inválido', async function () {
    Sinon.stub(Model, 'deleteOne').resolves({ deletedCount: 0, acknowledged: true });

    try {
      await new MotorcycleService().deleteMotor('63ea3df3c632aab1a7876e10');
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND);
    }
  });

  it('Teste para deleter as motos pelo id com sucesso', async function () {
    Sinon.stub(Model, 'deleteOne').resolves({ deletedCount: 1, acknowledged: true });

    const service = new MotorcycleService();
    await service.deleteMotor('63ea3df3c632aab1a7876e10');
  });

  afterEach(function () { return Sinon.restore(); });
});