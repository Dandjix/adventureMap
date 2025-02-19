import BodyPart from '../../Creature/BodyPart/BodyPart';
import { Creature } from "../../Creature/Creature";
import Turn, { Affected } from "./Turn";
import Weapon from '../../Creature/Items/Weapon/Weapon';
import { GenderedCreature } from '../../Creature/GenderedCreature';
import { ArmorPiece } from '../../Creature/Items/Armor/ArmorPiece';
import Fighter from '../Fighter';


/**
 * Bob [verb] Alice with his head
 * or Bob [verb] Alice with the Battle Axe in his right hand
 */
export abstract class GlobalAttackTurn extends Turn
{
    weapon? : Weapon
    defenders : Fighter[]

    play() {
        const healthDamage = this.getHealthDamage()
        const limbDamage = this.getLimbDamage()
        const affected :Affected[] = []
        for (let i = 0; i < this.defenders.length; i++) {
            const defender = this.defenders[i];
            const affectedLimbs : BodyPart[] = []
            if(limbDamage>0)
            {
                defender.creature.bodyParts.forEach(bodyPart => {
                    if(!bodyPart.isMissing)
                    {
                        bodyPart.health -= limbDamage
                        affectedLimbs.push(bodyPart)
                    }
                });
            }
            affected.push(new Affected(defender,affectedLimbs))

            defender.creature.health -= healthDamage
        }

        return {recap:this.getRecap(healthDamage,limbDamage),affected:affected}
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
     * this is only used once
     */
    abstract getLimbDamage() : number

    public getRecap(healthDamage : number,limbDamage : number)
    {
        const attackerPronoun = (('gender' in this.actor.creature) && this.actor.creature.gender=="female") ? "her" : "his"
        let recap = `${this.actor.creature.creatureName} ${this.getVerb()} ${this.getDefendersNames()} `
        if(this.weapon)
            recap += ` using the ${this.weapon.getName()} in ${attackerPronoun} ${this.attackerBodyPart.getName()}`
        else
            recap += ` using ${attackerPronoun} ${this.attackerBodyPart.getName()}`
        return `${recap} for ${healthDamage} health damage and ${limbDamage} limb damage.`
    }

    private getDefendersNames()
    {
        if(this.defenders.length>5)
            return `${this.defenders.length} creatures`

        let names = ``
        for (let i = 0; i < this.defenders.length; i++) {
            const defender = this.defenders[i];
            names = `${names}${defender.creature.creatureName}`
            if(i<this.defenders.length-1)
                names = `${names}, `
        }
        return names
    }
    

    attackerBodyPart : BodyPart
    /**
     *
     */
    constructor(attacker : Fighter,attackerBodyPart:string|BodyPart,defenders : Fighter[]) {
        super(attacker);

        if (attackerBodyPart instanceof BodyPart) 
            this.attackerBodyPart = attackerBodyPart
        else{
            const optional = BodyPart.find(attacker.creature.bodyParts,attackerBodyPart)
            if(optional == undefined)
                throw new Error(`could not find body part named ${attackerBodyPart} in ${attacker.creature.getSpeciesName()} ${attacker.creature.creatureName}`)

            this.attackerBodyPart = optional
        }
        this.weapon = this.attackerBodyPart.weapon
        this.defenders = defenders
    }
}