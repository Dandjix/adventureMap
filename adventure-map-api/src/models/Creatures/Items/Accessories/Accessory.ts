import { BodyPart } from "../../BodyParts/BodyPart";
import { Creature } from "../../Creature";
import { Item } from "../Item";

export abstract class Accessory extends Item
{
    readonly bodyParts: string[];
    readonly species: string[];
    
    /**
     *
     */
    constructor(bodyParts : string[],creatures : string[]) {
        super();
        this.bodyParts = bodyParts
        this.species = creatures
    }

    /**
     * accessories modify the stats of the creatures equiping them. 
     * The method is called by the equipping creature when an accessory is equipped or unequipped
     * @param equipingCreature the creature that is equipping the item
     */
    abstract applyEffect(equipingCreature : Creature):void
}