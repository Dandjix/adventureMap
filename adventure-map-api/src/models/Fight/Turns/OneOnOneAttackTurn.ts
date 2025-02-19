import BodyPart from '../../Creature/BodyPart/BodyPart';
import { Creature } from "../../Creature/Creature";
import Turn from "./Turn";
import Weapon from '../../Creature/Items/Weapon/Weapon';
import { GenderedCreature } from '../../Creature/GenderedCreature';
import { ArmorPiece } from '../../Creature/Items/Armor/ArmorPiece';
import Fighter from '../Fighter';
import { Affected } from './Turn';
import { clamp } from '../../../util/clamp';


/**
 * Bob [verb] Alice with his head
 * or Bob [verb] Alice with the Battle Axe in his right hand
 */
export abstract class OneOnOneAttackTurn extends Turn
{
    attackerBodyPart : BodyPart
    defender: Fighter;
    defenderBodyPart:BodyPart;
    armorPenetration:number

    /**
     * 
     * @param attacker 
     * @param attackerBodyPart 
     * @param defender 
     * @param defenderBodyPart 
     * @param armorPenetration at 0, the armor is nullified, at 1 it is normal, at >1, it is more than normal
     */
    constructor(attacker : Fighter,attackerBodyPart:string|BodyPart,defender : Fighter,defenderBodyPart:string|BodyPart,armorPenetration:number=1) {
        super(attacker);

        this.defender = defender
        this.armorPenetration = armorPenetration

        if (defenderBodyPart instanceof BodyPart) 
            this.defenderBodyPart = defenderBodyPart
        else{
            const optional = BodyPart.find(defender.creature.bodyParts,defenderBodyPart)
            if(optional == undefined)
                throw new Error(`could not find body part named ${defenderBodyPart} in ${defender.creature.getSpeciesName()} ${defender.creature.creatureName}`)

            this.defenderBodyPart = optional
        }


        if (attackerBodyPart instanceof BodyPart) 
            this.attackerBodyPart = attackerBodyPart
        else{
            const optional = BodyPart.find(attacker.creature.bodyParts,attackerBodyPart)
            if(optional == undefined)
                throw new Error(`could not find body part named ${attackerBodyPart} in ${attacker.creature.getSpeciesName()} ${attacker.creature.creatureName}`)

            this.attackerBodyPart = optional
        }
        this.weapon = this.attackerBodyPart.weapon
        this.armorPiece = this.defenderBodyPart.armorPiece
    }

    play() {
        const armorProtection = this.defenderBodyPart.armorPiece ? this.defenderBodyPart.armorPiece.getDamageDeflected() : 0

        let healthDamage = this.getHealthDamage()
        let limbDamage = this.getLimbDamage()

        healthDamage -= healthDamage*armorProtection
        limbDamage -= limbDamage*armorProtection

        this.defender.creature.health -= healthDamage 
        this.defenderBodyPart.health -= limbDamage 

        return {recap:this.getRecap(healthDamage,limbDamage,armorProtection),affected:[new Affected(this.defender,[this.defenderBodyPart])]}
    }

    get cooldown(): number {
        const cooldown = this.attackerBodyPart.equippedWeight/(this.attackerBodyPart.efficiency*this.actor.creature.naturalStrength)
        return cooldown
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


    public getRecap(healthDamage : number,limbDamage : number,armorProtection : number)
    {
        const attackerPronoun = (('gender' in this.actor.creature) && this.actor.creature.gender=="female") ? "her" : "his"
        const defenderPronoun = (('gender' in this.defender.creature) && this.defender.creature.gender=="female") ? "her" : "his"


        let action : string
        if(this.weapon){
            action =  
            `${this.actor.creature.creatureName} `+
            `${this.getVerb()} ${this.defender.creature.creatureName} `+
            `in the ${this.defenderBodyPart.getName()} `+
            `with the ${this.weapon.getName()} `+
            `equipped in ${attackerPronoun} ${this.attackerBodyPart.getName()}`
        }
        else{
            action = 
            `${this.actor.creature.creatureName} `+
            `${this.getVerb()} `+
            `${this.defender.creature.creatureName} ` +
            `in the ${this.defenderBodyPart.getName()} `+
            `with ${attackerPronoun} ${this.attackerBodyPart.getName()}`
        }
        if(armorProtection>0)
        {
            if(this.armorPiece) 
                return `${action} for ${healthDamage} health damage and ${limbDamage} limb damage. The ${this.armorPiece.getName()} deflected ${(armorProtection*100).toFixed(2)}% of the damage.`
            return `${action} for ${healthDamage} health damage and ${limbDamage} limb damage. ${(armorProtection*100).toFixed(2)}% of the damage was deflected.`
        }
        return `${action} for ${healthDamage} health damage and ${limbDamage} limb damage.`
    }
}