import { Torso } from "../BodyParts/Torso";
import { Creature } from "../Creature";
import { Human } from "../Human";
import { Accessory } from "./Accessory/Accessory";

export default class Backpack extends Accessory<[Torso],[Human]>
{
    capacity : number

    applyEffect(equipingCreature: Creature): void {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        return "Backpack"
    }
    getWeight(): number {
        return 10
    }
    /**
     *
     */
    constructor(capacity : number) {
        super();
        this.capacity = capacity
    }
}