import { OceanTileContent } from './OceanTileContent';

export class Rock extends OceanTileContent {
  public readonly type = 'rock';
  public progressSimulation = () => {};
}
