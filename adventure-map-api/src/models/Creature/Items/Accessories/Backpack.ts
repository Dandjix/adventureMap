import { Torso } from "../../BodyPart/Torso";
import { Creature } from "../../Creature";
import { Human } from "../../Species/Human";
import { Material } from "../Materials/Material";
import { Accessory } from "./Accessory";

export default class Backpack extends Accessory
{
    capacity : number

    applyEffect(equipingCreature: Creature): void {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        return `${this.material.name} backpack`
    }
    getWeightMultiplier(): number {
        return 10
    }
    /**
     *
     */
    constructor(material : Material,capacity : number,quality:number=0) {
        super(material,quality,["torso"],["human"]);
        this.capacity = capacity
    }
}