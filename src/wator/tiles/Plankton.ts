import { LivingCreature } from './LivingCreature';
import { OceanTile } from './OceanTile';
import { Edible } from './Edible';

export class Plankton extends LivingCreature implements Edible {
  public readonly type = 'plankton';
  public progressSimulation = () => {};

  constructor({ tile }: { tile: OceanTile }) {
    super({ tile });
  }

  public beEaten = () => {
    this.die();
  };
}
