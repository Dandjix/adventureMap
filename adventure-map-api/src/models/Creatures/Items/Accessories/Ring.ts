import { Creature } from "../../Creature";
import { Material } from "../Materials/Material";
import { Accessory } from "./Accessory";

export class Ring extends Accessory
{
    applyEffect(equipingCreature: Creature): void {
        return
    }
    getName(): string {
        return `${this.material.name} ring`
    }
    getWeightMultiplier(): number {
        return 0.05
    }

    /**
     *
     */
    constructor(material : Material) {
        super(material,["#side hand","#index #side hand"],["human","abomination"]);
    }
    
}