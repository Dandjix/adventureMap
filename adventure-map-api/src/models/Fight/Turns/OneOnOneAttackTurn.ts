import BodyPart from '../../Creature/BodyPart/BodyPart';
import { Creature } from "../../Creature/Creature";
import { Turn } from "./Turn";
import Weapon from '../../Creature/Items/Weapon/Weapon';
import { GenderedCreature } from '../../Creature/GenderedCreature';
import { ArmorPiece } from '../../Creature/Items/Armor/ArmorPiece';
import Fighter from '../Fighter';


/**
 * Bob [verb] Alice with his head
 * or Bob [verb] Alice with the Battle Axe in his right hand
 */
export abstract class OneOnOneAttackTurn extends Turn
{
    attackerBodyPart : BodyPart
    defender: Fighter;
    defenderBodyPart:BodyPart;

    constructor(attacker : Fighter,attackerBodyPart:string|BodyPart,defender : Fighter,defenderBodyPart:string|BodyPart) {
        super(attacker);

        this.defender = defender

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
        const healthDamage = this.getHealthDamage()
        const limbDamage = this.getLimbDamage()

        this.defender.creature.health -= healthDamage
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


    public getRecap(healthDamage : number,limbDamage : number)
    {
        const attackerPronoun = (('gender' in this.attacker.creature) && this.attacker.creature.gender=="female") ? "her" : "his"
        const defenderPronoun = (('gender' in this.defender.creature) && this.defender.creature.gender=="female") ? "her" : "his"


        let action : string
        if(this.weapon){
            action =  
            `${this.attacker.creature.creatureName} `+
            `${this.getVerb()} ${this.defender.creature.creatureName} `+
            `in the ${this.defenderBodyPart.getName()} `+
            `with the ${this.weapon.getName()} `+
            `equipped in ${attackerPronoun} ${this.attackerBodyPart.getName()}.`
        }
        else{
            action = 
            `${this.attacker.creature.creatureName} `+
            `${this.getVerb()} `+
            `${this.defender.creature.creatureName} ` +
            `in the ${this.defenderBodyPart.getName()} `+
            `with ${attackerPronoun} ${this.attackerBodyPart.getName()}.`
        }

        let effect : string
        effect = 
        `${this.defender.creature.creatureName} takes ${healthDamage} health damage, `+
        `plus ${limbDamage} in ${defenderPronoun} ${this.defenderBodyPart.getName()}.`

        if(this.defenderBodyPart.armorPiece)
        {
            effect = `${effect} The ${this.defenderBodyPart.armorPiece.getName()} deflected some of the damage.`
        }

        return `${action}\n${effect}`
    }
}