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
export abstract class GlobalAttackTurn extends Turn
{
    weapon? : Weapon
    defenders : Fighter[]

    play() {
        const healthDamage = this.getHealthDamage()

        for (let i = 0; i < this.defenders.length; i++) {
            const defender = this.defenders[i];
            defender.creature.health -= healthDamage
        }

        return {recap:this.getRecap(healthDamage),affected:this.defenders}
    }

    /**
     * can be "bashes", "shoots", "obliterates", "kisses"
     */
    abstract getVerb() : string

    /**
     * this is only used once
     */
    abstract getHealthDamage() : number

    public getRecap(healthDamage : number)
    {
        const attackerPronoun = (('gender' in this.attacker.creature) && this.attacker.creature.gender=="female") ? "her" : "his"
        return `${this.attacker.creature.creatureName} ${this.getVerb()} ${this.getDefendersNames()} using ${attackerPronoun} ${this.weapon!.getName()}  for ${this.getHealthDamage()} health of damage.`
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