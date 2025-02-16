import BodyPart from '../../Creature/BodyPart/BodyPart';
import { Creature } from "../../Creature/Creature";
import { Turn } from "./Turn";


/**
 * Bob Bashes Alice with his head
 * or Bob Bashes Alice with the Battle Axe in his right hand
 */
export class Bash extends Turn
{
    play(): void {
        this.targetBodyPart
    }

    recap()
    {
        return `${this.attacker.creatureName} bashes ${this.defender.creatureName} in the ${this.targetBodyPart} with his ${this.attackingBodyPart}`
    }
    targetBodyPart : BodyPart
    attackingBodyPart : BodyPart
    /**
     *
     */
    constructor(attacker : Creature,defender : Creature,targetBodyPart:string|BodyPart,attackingBodyPart:string|BodyPart) {
        super(attacker,defender);

        if (targetBodyPart instanceof BodyPart) 
            this.targetBodyPart = targetBodyPart
        else{
            const optional = BodyPart.find(defender.bodyParts,targetBodyPart)
            if(optional == undefined)
                throw new Error(`could not find body part named ${targetBodyPart} in ${defender.getSpeciesName()} ${defender.creatureName}`)

            this.targetBodyPart = optional
        }


        if (attackingBodyPart instanceof BodyPart) 
            this.attackingBodyPart = attackingBodyPart
        else{
            const optional = BodyPart.find(defender.bodyParts,attackingBodyPart)
            if(optional == undefined)
                throw new Error(`could not find body part named ${attackingBodyPart} in ${attacker.getSpeciesName()} ${attacker.creatureName}`)

            this.attackingBodyPart = optional
        }
    }
}