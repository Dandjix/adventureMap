import { BodyPart } from "../../Creature/BodyParts/BodyPart";
import { Creature } from "../../Creature/Creature";
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
    constructor(attacker : Creature,defender : Creature,bodyPart:string|BodyPart) {
        super(attacker,defender);
        if (bodyPart instanceof BodyPart) 
        {
            this.bodyPart = bodyPart
        }
        else
        {
            B
        }

        attacker.
    }

    play(): void {
        throw new Error("Method not implemented.");
    }
    recap(): string {
        throw new Error("Method not implemented.");
    }
    
}