import BodyPart from "../../BodyPart/BodyPart";
import { Creature } from "../../Creature";
import { Item } from "../Item";
import { Material } from "../Materials/Material";

export abstract class Accessory extends Item
{
    readonly bodyParts: string[];
    readonly creatures: string[];
    
    /**
     *
     */
    constructor(material : Material,bodyParts : string[],creatures : string[]) {
        if(!BodyPart.validateBodyPartOptions(bodyParts))
        {
            throw new Error("the body part options for that armor piece are incorrect")
        }

        super(material);
        this.bodyParts = bodyParts
        this.creatures = creatures
    }

    /**
     * accessories modify the stats of the creatures equiping them. 
     * The method is called by the equipping creature when an accessory is equipped or unequipped
     * @param equipingCreature the creature that is equipping the item
     */
    abstract applyEffect(equipingCreature : Creature):void
}