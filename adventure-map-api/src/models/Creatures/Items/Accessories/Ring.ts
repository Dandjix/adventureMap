import { Creature } from "../../Creature";
import { Accessory } from "./Accessory";

export class Ring extends Accessory
{
    applyEffect(equipingCreature: Creature): void {
        return
    }
    getName(): string {
        return `${this.materialName} ring`
    }
    getWeightMultiplier(): number {
        return 0.05
    }

    /**
     *
     */
    constructor(materialName : string) {
        super(materialName,["#side hand","#index #side hand"],["human","abomination"]);
    }
    
}