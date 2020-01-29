import React, { FunctionComponent } from 'react';
import { Simulation } from './wator/Simulation';
import { OceanTile } from './wator/tiles/OceanTile';
import classNames from 'classnames';
import './app.css';

const simulation = Simulation.createSimulation({
  dimensions: {
    width: 25,
    height: 25
  },
  population: {
    fish: 20,
    sharks: 5,
    plankton: 40,
    rocks: 10
  }
});

const Tile: FunctionComponent<{ oceanTile: OceanTile }> = ({
  oceanTile: tile
}) => {
  const className = classNames('tile', {
    water: tile.isEmpty(),
    plankton: tile.hasContent('plankton'),
    fish: tile.hasContent('fish'),
    shark: tile.hasContent('shark'),
    rock: tile.hasContent('rock')
  });

  let content;
  if (tile.hasContent('fish')) {
    content = <>🐟</>;
  } else if (tile.hasContent('shark')) {
    content = <>🦈</>;
  }

  return <div className={className}>{content}</div>;
};

const createKey = (index: number, tile: OceanTile) =>
  `tile-${index}-${tile
    .getContents()
    .map(content => content.type)
    .join('-')}`;

const App: FunctionComponent = () => {
  const [isSimulationRunning, setIsSimulationRunning] = React.useState(false);
  const [year, setYear] = React.useState(1);
  const [oceanTiles, setOceanTiles] = React.useState<OceanTile[][]>(() =>
    simulation.getOceanTiles()
  );

  const doProgressSimulation = React.useCallback(() => {
    const newField = simulation.progressSimulation();
    setOceanTiles(newField);
    setYear(year => year + 1);
  }, []);

  React.useEffect(() => {
    if (isSimulationRunning) {
      const interval = setInterval(() => {
        doProgressSimulation();
      }, 350);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isSimulationRunning, doProgressSimulation]);

  return (
    <>
      <div>
        {oceanTiles.map((row, index) => (
          <div
            key={`row-${index}`}
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            {row.map((tile, index) => (
              <Tile key={createKey(index, tile)} oceanTile={tile}></Tile>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button
          disabled={isSimulationRunning}
          onClick={() => {
            doProgressSimulation();
          }}
        >
          progress by one step
        </button>
        <button
          onClick={() => {
            setIsSimulationRunning(isRunning => !isRunning);
          }}
        >
          {isSimulationRunning ? 'stop simulation' : 'start simulation'}
        </button>
        <span>Year: {year}</span>
      </div>
    </>
  );
};

export default App;
