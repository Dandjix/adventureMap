import { BodyPart, validateBodyPartOptions } from "../../BodyParts/BodyPart";
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
        if(!validateBodyPartOptions(bodyParts))
        {
            throw new Error("the body part options for that armor piece are incorrect")
        }

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