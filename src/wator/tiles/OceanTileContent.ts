export type OceanTileContentType = 'plankton' | 'rock' | 'fish' | 'shark';

export abstract class OceanTileContent {
  public abstract readonly type: OceanTileContentType;
  public abstract progressSimulation: Function;
}
