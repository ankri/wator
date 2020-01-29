import { OceanTile } from './OceanTile';
import { OceanTileContent } from './OceanTileContent';

export abstract class LivingCreature extends OceanTileContent {
  private tile: OceanTile;

  constructor({ tile }: { tile: OceanTile }) {
    super();
    this.tile = tile;
  }

  protected die = () => {
    this.getTile().removeContent(this);
  };

  protected getTile = () => this.tile;
  public setTile = (newTile: OceanTile) => {
    this.tile = newTile;
  };
}
