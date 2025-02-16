import BodyPart from '../../Creature/BodyPart/BodyPart';
import { Creature } from "../../Creature/Creature";
import { Turn } from "./Turn";
import Weapon from '../../Creature/Items/Weapon/Weapon';
import { GenderedCreature } from '../../Creature/GenderedCreature';


/**
 * Bob [verb] Alice with his head
 * or Bob [verb] Alice with the Battle Axe in his right hand
 */
export abstract class AttackTurn extends Turn
{
    play() {
        const healthDamage = this.getHealthDamage()
        const limbDamage = this.getHealthDamage()

        return this.getRecap(healthDamage,limbDamage)
    }

    /**
     * can be "bashes", "shoots", "obliterates", "kisses"
     */
    abstract getVerb() : string

    /**
     * this is only used once
     */
    abstract getHealthDamage() : number

    /**
     * this is also only used once : no need to make it consistent.
     */
    abstract getLimbDamage() : number

    abstract Weapon? : Weapon



    private getRecap(healthDamage : number,limbDamage : number)
    {
        const attackerPronoun = (('gender' in this.attacker) && this.attacker.gender=="female") ? "her" : "his"
        const defenderPronoun = (('gender' in this.defender) && this.defender.gender=="female") ? "her" : "his"


        let action : string
        if(this.Weapon){
            action =  
            `${this.attacker.creatureName} 
            ${this.getVerb()} ${this.defender.creatureName} 
            in the ${this.defenderBodyPart} 
            with the ${this.Weapon.getName()} 
            equipped on ${attackerPronoun} ${this.attackingBodyPart}.`
        }
        else{
            action = 
            `${this.attacker.creatureName} 
            ${this.getVerb()} 
            ${this.defender.creatureName} 
            in the ${this.defenderBodyPart} 
            with ${attackerPronoun} ${this.attackingBodyPart}.`
        }

        let effect : string
        effect = 
        `${this.defender.creatureName} 
        takes ${healthDamage} health damage,
         plus ${limbDamage} in ${defenderPronoun} ${this.defenderBodyPart.getName()}.`

        if(this.defenderBodyPart.armorPiece)
        {
            effect = `${effect} The ${this.defenderBodyPart.armorPiece.getName()} deflected some of the damage`
        }

        return `${action}`
    }
    defenderBodyPart : BodyPart
    attackingBodyPart : BodyPart
    /**
     *
     */
    constructor(attacker : Creature,attackingBodyPart:string|BodyPart,defender : Creature,targetBodyPart:string|BodyPart) {
        super(attacker,defender);

        if (targetBodyPart instanceof BodyPart) 
            this.defenderBodyPart = targetBodyPart
        else{
            const optional = BodyPart.find(defender.bodyParts,targetBodyPart)
            if(optional == undefined)
                throw new Error(`could not find body part named ${targetBodyPart} in ${defender.getSpeciesName()} ${defender.creatureName}`)

            this.defenderBodyPart = optional
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