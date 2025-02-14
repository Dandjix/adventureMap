import { Creature } from "../../Creature";
import { Accessory } from "./Accessory";

export class Ring extends Accessory
{
    applyEffect(equipingCreature: Creature): void {
        return
    }
    getName(): string {
        return "ring"
    }
    getWeight(): number {
        return 0.05
    }

    /**
     *
     */
    constructor() {
        super(["hand"],["human"]);
    }
    
}