import { BodyPart } from "../../BodyParts/BodyPart";
import { Creature } from "../../Creature";
import { Item } from "../Item";

export abstract class Accessory<BodyPartTypes extends BodyPart[],CreatureTypes extends (Creature)[]> extends Item
{
    /**
     * accessories modify the stats of the creatures equiping them. 
     * The method is called by the equipping creature when an accessory is equipped or unequipped
     * @param equipingCreature the creature that is equipping the item
     */
    abstract applyEffect(equipingCreature : Creature):void
}