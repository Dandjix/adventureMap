import { BodyPart } from "../../BodyParts/BodyPart";
import { Head } from "../../BodyParts/Head";
import { Creature } from "../../Creature";
import { Human } from "../../Species/Human";
import { ArmorPiece } from "./ArmorPiece";

export class Helmet extends ArmorPiece {
    constructor(materialName : string) {
        super(materialName,["head"], ["human"]); // Create instances dynamically
    }

    getName(): string {
        return `${this.materialName} helmet`;
    }

    getWeightMultiplier(): number {
        return 3;
    }
}
