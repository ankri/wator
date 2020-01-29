import { Ocean } from '../Ocean';
import { OceanTile } from './OceanTile';
import { LivingCreature } from './LivingCreature';
import { Direction } from '../Direction';
import { allDirections } from '../Direction';
import { Edible } from './Edible';
import { Plankton } from './Plankton';

export abstract class Animal extends LivingCreature {
  private age: number;
  private ageWhenAnimalIsDying: number;
  private weight: number;
  private ageWhenAnimalIsBreeding: number;

  constructor({
    age,
    weight,
    ageWhenAnimalIsDying,
    ageWhenAnimalIsBreeding,
    tile
  }: {
    age: number;
    ageWhenAnimalIsDying: number;
    ageWhenAnimalIsBreeding: number;
    weight: number;
    tile: OceanTile;
  }) {
    super({ tile });
    this.age = age;
    this.ageWhenAnimalIsDying = ageWhenAnimalIsDying;
    this.ageWhenAnimalIsBreeding = ageWhenAnimalIsBreeding;
    this.weight = weight;
  }

  protected moveIntoTile = (newTile: OceanTile) => {
    this.getTile().removeContent(this);
    newTile.addContent(this);
  };

  protected abstract move: Function;

  protected breed = () => {
    if (this.getAge() === this.ageWhenAnimalIsBreeding) {
      const tileToBreedInto = Ocean.getOcean()
        .findNeighboringOceanTiles(this.getTile().coordinates)
        .find(tile => tile.isEmpty());

      if (tileToBreedInto) {
        const weightOfFirstBornAnimal = Math.floor(this.getWeight() / 2);
        const weightOfSecondBornAnimal = Math.ceil(this.getWeight() / 2);
        const currentTile = this.getTile();
        this.die();
        if (this.type === 'fish') {
          currentTile.addContent(
            new Fish({
              tile: currentTile,
              weight: weightOfFirstBornAnimal
            })
          );
          tileToBreedInto.addContent(
            new Fish({
              tile: tileToBreedInto,
              weight: weightOfSecondBornAnimal
            })
          );
        } else if (this.type === 'shark') {
          currentTile.addContent(
            new Shark({
              tile: currentTile,
              weight: weightOfFirstBornAnimal
            })
          );
          tileToBreedInto.addContent(
            new Shark({
              tile: tileToBreedInto,
              weight: weightOfSecondBornAnimal
            })
          );
        }
      }
    }
  };

  protected getAge = () => this.age;
  protected getWeight = () => this.weight;

  protected gainWeight = () => {
    this.weight = this.weight + 1;
  };

  public progressSimulation = () => {
    this.age = this.age + 1;
    if (this.age === this.ageWhenAnimalIsDying) {
      this.die();
    } else {
      this.move();
      this.breed();

      this.weight = this.weight - 1;

      if (this.weight === 0) {
        this.die();
      }
    }
  };
}

export class Shark extends Animal {
  public readonly type = 'shark';

  constructor({ tile, weight = 20 }: { tile: OceanTile; weight?: number }) {
    super({
      tile,
      weight,
      age: 1,
      ageWhenAnimalIsDying: 20,
      ageWhenAnimalIsBreeding: 15
    });
  }

  protected move = () => {
    const possibleTilesToMoveInto = Ocean.getOcean()
      .findNeighboringOceanTiles(this.getTile().coordinates)
      .filter(
        tile =>
          tile.hasContent('fish') ||
          tile.hasContent('plankton') ||
          tile.isEmpty()
      );

    if (
      possibleTilesToMoveInto.find(tile => tile.hasContent('fish')) !==
      undefined
    ) {
      const tileWithFish = possibleTilesToMoveInto.find(tile =>
        tile.hasContent('fish')
      ) as OceanTile;
      (tileWithFish
        .getContents()
        .find(content => content.type === 'fish') as Fish).beEaten();
      this.gainWeight();
      this.moveIntoTile(tileWithFish);
    } else {
      const emptyTile = possibleTilesToMoveInto.find(tile => tile.isEmpty());

      if (emptyTile !== undefined) {
        this.moveIntoTile(emptyTile);
      }
    }
  };
}

export class Fish extends Animal implements Edible {
  public readonly type = 'fish';
  private preferredDirection: Direction;

  constructor({ tile, weight = 15 }: { tile: OceanTile; weight?: number }) {
    super({
      age: 1,
      ageWhenAnimalIsDying: 15,
      ageWhenAnimalIsBreeding: 12,
      tile,
      weight
    });

    this.preferredDirection =
      allDirections[Math.floor(Math.random() * allDirections.length)];
  }

  private calculateMovementDirection = (): Direction => {
    return [...allDirections, this.preferredDirection][
      Math.floor(Math.random() * allDirections.length + 1)
    ];
  };

  protected move = () => {
    const possibleTileToMoveTo = Ocean.getOcean().findOceanTileInDirection({
      fromCoordinates: this.getTile().coordinates,
      inDirection: this.calculateMovementDirection()
    });

    if (possibleTileToMoveTo !== null && possibleTileToMoveTo.isEmpty()) {
      this.moveIntoTile(possibleTileToMoveTo);

      if (possibleTileToMoveTo.hasContent('plankton')) {
        (possibleTileToMoveTo
          .getContents()
          .find(content => content.type === 'plankton') as Plankton).beEaten();
        this.gainWeight();
      }
    }
  };

  public beEaten = () => {
    this.die();
  };
}
