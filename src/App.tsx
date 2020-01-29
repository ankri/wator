import React, { FunctionComponent } from 'react';
import DatGui, { DatButton, DatNumber, DatFolder } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';
import { Simulation, SimulationParameters } from './wator/Simulation';
import { OceanTile } from './wator/tiles/OceanTile';
import classNames from 'classnames';
import './app.css';

let simulation = Simulation.createSimulation({
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
  const [parameters, setParameters] = React.useState<
    SimulationParameters & { simulation: { speed: number } }
  >(() => ({
    dimensions: {
      width: 25,
      height: 25
    },
    population: {
      fish: 20,
      sharks: 10,
      plankton: 30,
      rocks: 5
    },
    simulation: {
      speed: 350
    }
  }));
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
      }, parameters.simulation.speed);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isSimulationRunning, doProgressSimulation, parameters]);

  return (
    <>
      <DatGui
        data={parameters}
        onUpdate={(
          newParameters: SimulationParameters & {
            simulation: { speed: number };
          }
        ) => {
          setParameters(newParameters);
        }}
      >
        <DatFolder title="Dimensions" closed={false}>
          <DatNumber
            path="dimensions.width"
            label="Width"
            min={20}
            max={50}
            step={1}
          />
          <DatNumber
            path="dimensions.height"
            label="Height"
            min={20}
            max={50}
            step={1}
          />
        </DatFolder>
        <DatFolder title="Population" closed={false}>
          <DatNumber
            path="population.fish"
            label="% Fishes"
            min={1}
            max={100}
            step={1}
          />
          <DatNumber
            path="population.sharks"
            label="% Sharks"
            min={1}
            max={100}
            step={1}
          />
          <DatNumber
            path="population.plankton"
            label="% Plankton"
            min={1}
            max={100}
            step={1}
          />
          <DatNumber
            path="population.rocks"
            label="% Rocks"
            min={1}
            max={100}
            step={1}
          />
        </DatFolder>
        <DatFolder title="Simulation">
          <DatNumber
            path="simulation.speed"
            label="Speed in ms"
            min={100}
            max={5000}
            step={100}
          />
        </DatFolder>

        <DatButton
          onClick={() => {
            setIsSimulationRunning(false);
            simulation = Simulation.createSimulation(parameters);
            setOceanTiles(simulation.getOceanTiles());
            setYear(1);
          }}
          label="Restart with new Parameters"
        ></DatButton>
        <DatButton
          disabled={isSimulationRunning}
          onClick={() => {
            doProgressSimulation();
          }}
          label="Progress Simulation"
        ></DatButton>
        <DatButton
          onClick={() => {
            setIsSimulationRunning(isRunning => !isRunning);
          }}
          label={isSimulationRunning ? 'stop simulation' : 'start simulation'}
        ></DatButton>
      </DatGui>

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
    </>
  );
};

export default App;
