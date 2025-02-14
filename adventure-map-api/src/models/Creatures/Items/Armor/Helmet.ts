import { BodyPart } from "../../BodyParts/BodyPart";
import { Head } from "../../BodyParts/Head";
import { Creature } from "../../Creature";
import { Human } from "../../Species/Human";
import { ArmorPiece } from "./ArmorPiece";

export class Helmet extends ArmorPiece {
    constructor(
    ) {
        super(["head"], ["human"]); // Create instances dynamically
    }

    getName(): string {
        return "helmet";
    }

    getWeight(): number {
        return 3;
    }
}
