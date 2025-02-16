import BodyPart from "../../BodyPart/BodyPart";
import { Creature } from "../../Creature";
import { Item } from "../Item";
import { Material } from "../Materials/Material";

export abstract class ArmorPiece extends Item {
    readonly bodyParts: string[];
    readonly creatures: string[];

    /**
     * @returns 0 if no damage is deflected, 1 if all damage is deflected
     */
    public getDamageDeflected()
    {
        const qualityMultiplier = (this.quality +1)/2
        return qualityMultiplier*this.material.protection
    }

    constructor(material : Material,quality:number,bodyParts: string[], creatures: string[]) {
        if (bodyParts.length === 0 || creatures.length === 0) {
            throw new Error("Body parts and creatures arrays cannot be empty");
        }
        if(!BodyPart.validateBodyPartOptions(bodyParts))
        {
            throw new Error("the body part options for that armor piece are incorrect")
        }
        super(material,quality);
        this.bodyParts = bodyParts;
        this.creatures = creatures;
    }

    // abstract getName(): string;
    // abstract getWeightMultiplier(): number;
}