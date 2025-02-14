import { BodyPart } from "../../BodyParts/BodyPart";
import { Creature } from "../../Creature";
import { Item } from "../Item";

export abstract class ArmorPiece extends Item {
    readonly bodyParts: string[];
    readonly creatures: string[];

    constructor(bodyParts: string[], creatures: string[]) {
        super();
        if (bodyParts.length === 0 || creatures.length === 0) {
            throw new Error("Body parts and creatures arrays cannot be empty");
        }
        this.bodyParts = bodyParts;
        this.creatures = creatures;
    }

    abstract getName(): string;
    abstract getWeight(): number;
}