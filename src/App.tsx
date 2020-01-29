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

const Tile: FunctionComponent<{ tile: OceanTile }> = ({ tile }) => {
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

const App: FunctionComponent = () => {
  const [isSimulationRunning, setIsSimulationRunning] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [field, setField] = React.useState<OceanTile[][]>(() =>
    simulation.getOceanTiles()
  );

  const doProgressSimulation = React.useCallback(() => {
    const newField = simulation.progressSimulation();
    setField(newField);
    setStep(step => step + 1);
  }, []);

  React.useEffect(() => {
    if (isSimulationRunning) {
      const interval = setInterval(() => {
        doProgressSimulation();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isSimulationRunning, doProgressSimulation]);

  return (
    <>
      <div>
        {field.map((row, index) => (
          <div
            key={`row-${step}-${index}`}
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            {row.map((column, index) => (
              <Tile
                key={`column-${index}-${column
                  .getContents()
                  .map(content => content.type)
                  .join('-')}`}
                tile={column}
              ></Tile>
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
          progress
        </button>
        <button
          onClick={() => {
            setIsSimulationRunning(isRunning => !isRunning);
          }}
        >
          {isSimulationRunning ? 'stop' : 'start'}
        </button>
      </div>
    </>
  );
};

export default App;
