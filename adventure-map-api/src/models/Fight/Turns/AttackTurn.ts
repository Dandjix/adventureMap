import BodyPart from '../../Creature/BodyPart/BodyPart';
import { Creature } from "../../Creature/Creature";
import { Turn } from "./Turn";
import Weapon from '../../Creature/Items/Weapon/Weapon';
import { GenderedCreature } from '../../Creature/GenderedCreature';
import { ArmorPiece } from '../../Creature/Items/Armor/ArmorPiece';


/**
 * Bob [verb] Alice with his head
 * or Bob [verb] Alice with the Battle Axe in his right hand
 */
export abstract class AttackTurn extends Turn
{
    play() {
        const healthDamage = this.getHealthDamage()
        const limbDamage = this.getLimbDamage()

        this.defender.health -= healthDamage
        this.defenderBodyPart.health -= limbDamage

        return {recap:this.getRecap(healthDamage,limbDamage),affected:[this.defender]}
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

    weapon? : Weapon

    armorPiece? : ArmorPiece


    private getRecap(healthDamage : number,limbDamage : number)
    {
        const attackerPronoun = (('gender' in this.attacker) && this.attacker.gender=="female") ? "her" : "his"
        const defenderPronoun = (('gender' in this.defender) && this.defender.gender=="female") ? "her" : "his"


        let action : string
        if(this.weapon){
            action =  
            `${this.attacker.creatureName} `+
            `${this.getVerb()} ${this.defender.creatureName} `+
            `in the ${this.defenderBodyPart.getName()} `+
            `with the ${this.weapon.getName()} `+
            `equipped in ${attackerPronoun} ${this.attackerBodyPart.getName()}.`
        }
        else{
            action = 
            `${this.attacker.creatureName} `+
            `${this.getVerb()} `+
            `${this.defender.creatureName} ` +
            `in the ${this.defenderBodyPart.getName()} `+
            `with ${attackerPronoun} ${this.attackerBodyPart.getName()}.`
        }

        let effect : string
        effect = 
        `${this.defender.creatureName} takes ${healthDamage} health damage, `+
        `plus ${limbDamage} in ${defenderPronoun} ${this.defenderBodyPart.getName()}.`

        if(this.defenderBodyPart.armorPiece)
        {
            effect = `${effect} The ${this.defenderBodyPart.armorPiece.getName()} deflected some of the damage.`
        }

        return `${action}\n${effect}`
    }
    defenderBodyPart : BodyPart
    attackerBodyPart : BodyPart
    /**
     *
     */
    constructor(attacker : Creature,attackerBodyPart:string|BodyPart,defender : Creature,defenderBodyPart:string|BodyPart) {
        super(attacker,defender);

        if (defenderBodyPart instanceof BodyPart) 
            this.defenderBodyPart = defenderBodyPart
        else{
            const optional = BodyPart.find(defender.bodyParts,defenderBodyPart)
            if(optional == undefined)
                throw new Error(`could not find body part named ${defenderBodyPart} in ${defender.getSpeciesName()} ${defender.creatureName}`)

            this.defenderBodyPart = optional
        }


        if (attackerBodyPart instanceof BodyPart) 
            this.attackerBodyPart = attackerBodyPart
        else{
            const optional = BodyPart.find(attacker.bodyParts,attackerBodyPart)
            if(optional == undefined)
                throw new Error(`could not find body part named ${attackerBodyPart} in ${attacker.getSpeciesName()} ${attacker.creatureName}`)

            this.attackerBodyPart = optional
        }
        this.weapon = this.attackerBodyPart.weapon
        this.armorPiece = this.defenderBodyPart.armorPiece
    }
}