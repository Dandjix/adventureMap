import { BodyPart, validateBodyPartOptions } from "../../BodyParts/BodyPart";
import { Creature } from "../../Creature";
import { Item } from "../Item";

export abstract class ArmorPiece extends Item {
    readonly bodyParts: string[];
    readonly creatures: string[];

    constructor(bodyParts: string[], creatures: string[]) {
        if (bodyParts.length === 0 || creatures.length === 0) {
            throw new Error("Body parts and creatures arrays cannot be empty");
        }
        if(!validateBodyPartOptions(bodyParts))
        {
            throw new Error("the body part options for that armor piece are incorrect")
        }
        super();
        this.bodyParts = bodyParts;
        this.creatures = creatures;
    }

    abstract getName(): string;
    abstract getWeight(): number;
}