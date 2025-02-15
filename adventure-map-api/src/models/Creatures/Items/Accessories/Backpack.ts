import { Torso } from "../../BodyParts/Torso";
import { Creature } from "../../Creature";
import { Human } from "../../Species/Human";
import { Accessory } from "./Accessory";

export default class Backpack extends Accessory
{
    capacity : number

    applyEffect(equipingCreature: Creature): void {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        return `${this.materialName} backpack`
    }
    getWeightMultiplier(): number {
        return 10
    }
    /**
     *
     */
    constructor(materialName : string,capacity : number) {
        super(materialName,["torso"],["human"]);
        this.capacity = capacity
    }
}