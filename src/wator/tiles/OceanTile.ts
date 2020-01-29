import { OceanCoordinates } from '../OceanCoordinates';
import { LivingCreature } from './LivingCreature';
import { OceanTileContent, OceanTileContentType } from './OceanTileContent';

export class OceanTile {
  private contents: OceanTileContent[] = [];
  public readonly coordinates: OceanCoordinates;

  public constructor(coordinates: OceanCoordinates) {
    this.coordinates = coordinates;
  }

  public isEmpty = (): boolean => {
    return this.contents.length === 0 || this.hasContent('plankton');
  };

  public hasContent = (type: OceanTileContentType) => {
    return this.contents.find(content => content.type === type) !== undefined;
  };

  public getContents = () => this.contents;

  public progressSimulation = () => {
    this.contents.forEach(content => content.progressSimulation());
  };

  public addContent = (newContent: OceanTileContent) => {
    this.contents = [...this.contents, newContent];
    if (newContent instanceof LivingCreature) {
      newContent.setTile(this);
    }
  };

  public removeContent = (contentToRemove: LivingCreature) => {
    this.contents = this.contents.filter(
      content => content !== contentToRemove
    );
  };
}
