import { BodyPart } from "../../BodyParts/BodyPart";
import { Head } from "../../BodyParts/Head";
import { Creature } from "../../Creature";
import { Human } from "../../Species/Human";
import { Material } from "../Materials/Material";
import { ArmorPiece } from "./ArmorPiece";

export class Helmet extends ArmorPiece {
    constructor(material : Material) {
        super(material,["head"], ["human"]); // Create instances dynamically
    }

    getName(): string {
        return `${this.material.name} helmet`;
    }

    getWeightMultiplier(): number {
        return 3;
    }
}
