import BodyPart from "../../BodyPart/BodyPart";
import { Item } from "../Item";
import { Material } from "../Materials/Material";

export default abstract class Weapon extends Item
{
    abstract getBaseCooldown():number
    abstract getBaseDamage():number

    readonly bodyParts: string[];
    readonly creatures: string[];

    constructor(material : Material,quality:number,bodyParts: string[], creatures: string[]) {
        if (bodyParts.length === 0 || creatures.length === 0) {
            throw new Error("Body parts and creatures arrays cannot be empty");
        }
        if(!BodyPart.validateBodyPartOptions(bodyParts))
        {
            throw new Error("the body part options for that weapon are incorrect")
        }
        super(material,quality);
        this.bodyParts = bodyParts;
        this.creatures = creatures;
    }
}