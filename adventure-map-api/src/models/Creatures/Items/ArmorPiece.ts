import { BodyPart } from "../BodyParts/BodyPart";
import { Creature } from "../Creature";
import { Item } from "./Item";

export abstract class ArmorPiece<BP extends BodyPart[], CT extends Creature[]> extends Item {
    validBodyParts: BP; // Allowed body parts for this armor
    validCreatures: CT; // Allowed creature types that can wear this armor

    constructor(validBodyParts: BP, validCreatures: CT) {
        super();
        this.validBodyParts = validBodyParts;
        this.validCreatures = validCreatures;
    }
}
