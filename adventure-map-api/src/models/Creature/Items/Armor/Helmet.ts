import BodyPart from "../../BodyPart/BodyPart";
import { Head } from "../../BodyPart/Head";
import { Creature } from "../../Creature";
import { Human } from "../../Species/Human";
import { Material } from "../Materials/Material";
import { ArmorPiece } from "./ArmorPiece";

export class Helmet extends ArmorPiece {
    constructor(material : Material,quality:number=0) {
        super(material,quality,["head"], ["human"]); // Create instances dynamically
    }

    getName(): string {
        return `${this.material.name} helmet`;
    }

    getWeightMultiplier(): number {
        return 3;
    }
}
