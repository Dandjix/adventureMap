import { Schema, model, Document } from 'mongoose';

import { StaticFeature } from './StaticFeature';
import { ChangingFeature } from './ChangingFeature';
import { Creature } from '../Creature/Creature';
import { Event } from './Event';
import { MaterialIndex } from '../Creature/Items/Materials/MaterialIndex';
// Define the World interface
export class World {
  world_name: string
  creation_date : Date
  static_features: StaticFeature[]
  changing_features: ChangingFeature[]
  creatures: Creature[]
  events: Event[]
  materialIndex : MaterialIndex
  /**
   *
   */
  constructor(world_name : string, creation_date : Date) {
    this.world_name = world_name
    this.creation_date = creation_date
    this.static_features = []
    this.changing_features = []
    this.creatures = []
    this.events = []
    this.materialIndex = MaterialIndex.createDefaultMaterialIndex()
  }
}