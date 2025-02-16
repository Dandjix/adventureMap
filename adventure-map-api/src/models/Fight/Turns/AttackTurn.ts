import BodyPart from '../../Creature/BodyParts/BodyPart';
import { Creature } from "../../Creature/Creature";
import { Turn } from "./Turn";


/**
 * Bob [verb] Alice with his head
 * or Bob [verb] Alice with the Battle Axe in his right hand
 */
export abstract class AttackTurn extends Turn
{
    play(): void {
        this.targetBodyPart
    }

    /**
     * can be "bashes", "shoots", "obliterates", "kisses"
     */
    abstract getVerb() : string

    abstract getHealthDamage() : number

    abstract getLimbDamage() : number

    recap()
    {
        return `${this.attacker.creatureName} ${this.getVerb()} ${this.defender.creatureName} in the ${this.targetBodyPart} with his ${this.attackingBodyPart}`
    }
    targetBodyPart : BodyPart
    attackingBodyPart : BodyPart
    /**
     *
     */
    constructor(attacker : Creature,attackingBodyPart:string|BodyPart,defender : Creature,targetBodyPart:string|BodyPart) {
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