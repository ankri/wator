import { Ocean } from './Ocean';
import { OceanTile } from './tiles/OceanTile';

export interface SimulationParameters {
  dimensions: {
    width: number;
    height: number;
  };
  population: {
    fish: number;
    sharks: number;
    plankton: number;
    rocks: number;
  };
}

export class Simulation {
  private ocean: Ocean;

  private constructor(parameters: SimulationParameters) {
    this.ocean = Ocean.createOcean(parameters);
  }

  public static createSimulation = (
    parameters: SimulationParameters
  ): Simulation => {
    return new Simulation(parameters);
  };

  public progressSimulation = (): OceanTile[][] => {
    return this.ocean.progressSimulation();
  };

  public getOceanTiles = (): OceanTile[][] => {
    return this.ocean.getOceanTiles();
  };
}
