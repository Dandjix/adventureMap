import { BodyPart } from "../BodyParts/BodyPart";
import { Creature } from "../Creature";
import { Turn } from "./Turn";

/**
 * Bob Bashes Alice with his head
 * or Bob Bashes Alice with the Battle Axe in his right hand
 */
export class Bash extends Turn
{
    bodyPart : BodyPart
    /**
     *
     */
    constructor(attacker : Creature,defender : Creature,bodyPart:BodyPart) {
        super(attacker,defender);
        this.bodyPart = bodyPart
        attacker.
    }

    play(): void {
        throw new Error("Method not implemented.");
    }
    recap(): string {
        throw new Error("Method not implemented.");
    }
    
}