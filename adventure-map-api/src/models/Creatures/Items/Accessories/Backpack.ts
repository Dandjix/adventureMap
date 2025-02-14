import { Torso } from "../../BodyParts/Torso";
import { Creature } from "../../Creature";
import { Human } from "../../Human";
import { Accessory } from "./Accessory";

export default class Backpack extends Accessory
{
    capacity : number

    applyEffect(equipingCreature: Creature): void {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        return "backpack"
    }
    getWeight(): number {
        return 10
    }
    /**
     *
     */
    constructor(capacity : number) {
        super(["torso"],["human"]);
        this.capacity = capacity
    }
}