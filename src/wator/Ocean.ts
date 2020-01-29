import { SimulationParameters } from './Simulation';
import { OceanTile } from './tiles/OceanTile';
import { Direction, allDirections } from './Direction';
import { OceanCoordinates } from './OceanCoordinates';
import { Fish, Shark } from './tiles/Animal';
import { Plankton } from './tiles/Plankton';
import { Rock } from './tiles/Rock';
import { Animal } from './tiles/Animal';

function calculateNewCoordinatesInDirection(
  coordinates: OceanCoordinates,
  direction: Direction
) {
  const { x, y } = coordinates;
  switch (direction) {
    case 'NORTH':
      return {
        x,
        y: y - 1
      };
    case 'NORTH_EAST':
      return {
        x: x + 1,
        y: y - 1
      };
    case 'EAST':
      return {
        x: x + 1,
        y
      };
    case 'SOUTH_EAST':
      return {
        x: x + 1,
        y: y + 1
      };
    case 'SOUTH':
      return {
        x,
        y: y + 1
      };
    case 'SOUTH_WEST':
      return {
        x: x - 1,
        y: y + 1
      };
    case 'WEST':
      return {
        x: x - 1,
        y
      };
    case 'NORTH_WEST':
      return {
        x: x - 1,
        y: y - 1
      };
  }
}

export class Ocean {
  private oceanTiles: OceanTile[][];
  private oceanDimensions: {
    width: number;
    height: number;
  };
  private static oceanInstance: Ocean;

  private populateTile = (
    tile: OceanTile,
    parameterPopulation: SimulationParameters['population']
  ) => {
    const randomNumber = Math.floor(Math.random() * 100);
    const bounds = {
      fish: {
        lower: 0,
        upper: parameterPopulation.fish
      },
      sharks: {
        lower: parameterPopulation.fish,
        upper: parameterPopulation.fish + parameterPopulation.sharks
      },
      plankton: {
        lower: parameterPopulation.fish + parameterPopulation.sharks,
        upper:
          parameterPopulation.fish +
          parameterPopulation.sharks +
          parameterPopulation.plankton
      },
      rocks: {
        lower:
          parameterPopulation.fish +
          parameterPopulation.sharks +
          parameterPopulation.plankton,
        upper:
          parameterPopulation.fish +
          parameterPopulation.sharks +
          parameterPopulation.plankton +
          parameterPopulation.rocks
      }
    };

    if (randomNumber > bounds.fish.lower && randomNumber <= bounds.fish.upper) {
      tile.addContent(new Fish({ tile }));
    } else if (
      randomNumber > bounds.sharks.lower &&
      randomNumber <= bounds.sharks.upper
    ) {
      tile.addContent(new Shark({ tile }));
    } else if (
      randomNumber > bounds.plankton.lower &&
      randomNumber <= bounds.plankton.upper
    ) {
      tile.addContent(new Plankton({ tile }));
    } else if (
      randomNumber > bounds.rocks.lower &&
      randomNumber <= bounds.rocks.upper
    ) {
      tile.addContent(new Rock());
    }
  };

  private constructor(parameters: SimulationParameters) {
    this.oceanDimensions = parameters.dimensions;
    this.oceanTiles = new Array<OceanTile[]>();

    for (let row = 0; row < this.oceanDimensions.height; row++) {
      this.oceanTiles[row] = new Array<OceanTile>();
      for (let column = 0; column < this.oceanDimensions.width; column++) {
        const tile = new OceanTile({ x: column, y: row });
        this.oceanTiles[row][column] = tile;
        this.populateTile(tile, parameters.population);
      }
    }
  }

  public static createOcean = (parameters: SimulationParameters): Ocean => {
    Ocean.oceanInstance = new Ocean(parameters);
    return Ocean.oceanInstance;
  };

  public static getOcean = (): Ocean => {
    if (Ocean.oceanInstance === null) {
      throw new Error(
        'You have to call createOcean before you can get an instance of Ocean'
      );
    } else {
      return Ocean.oceanInstance;
    }
  };

  public getOceanTiles = () => {
    return this.oceanTiles;
  };

  public progressSimulation = () => {
    const animals: Animal[] = [];
    for (const tile of this.oceanTiles.flat()) {
      for (const content of tile.getContents()) {
        if (content.type === 'fish' || content.type === 'shark') {
          animals.push(content as Animal);
        }
      }
    }

    animals.forEach(animal => {
      animal.progressSimulation();
    });

    return this.oceanTiles;
  };

  public findOceanTileInDirection = ({
    fromCoordinates,
    inDirection
  }: {
    fromCoordinates: OceanCoordinates;
    inDirection: Direction;
  }): OceanTile | null => {
    const { x, y } = calculateNewCoordinatesInDirection(
      fromCoordinates,
      inDirection
    );

    if (x < 0 || y < 0) {
      return null;
    } else if (
      x >= this.oceanDimensions.width ||
      y >= this.oceanDimensions.height
    ) {
      return null;
    } else {
      return this.oceanTiles[y][x];
    }
  };

  public findNeighboringOceanTiles = (
    forCoordinates: OceanCoordinates
  ): OceanTile[] => {
    return allDirections
      .map(direction =>
        this.findOceanTileInDirection({
          fromCoordinates: forCoordinates,
          inDirection: direction
        })
      )
      .filter(tile => tile !== null) as OceanTile[];
  };
}
