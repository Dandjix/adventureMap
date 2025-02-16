import BodyPart from '../../Creature/BodyPart/BodyPart';
import { Creature } from "../../Creature/Creature";
import Weapon from '../../Creature/Items/Weapon/Weapon';
import Fighter from '../Fighter';
import { OneOnOneAttackTurn } from './OneOnOneAttackTurn';
import { Turn } from "./Turn";


/**
 * Bob Bashes Alice with his head
 * or Bob Bashes Alice with the Battle Axe in his right hand
 */
export class Bash extends OneOnOneAttackTurn
{
    recap: string | undefined;
    getVerb(): string {
        return "bashes"
    }
    getHealthDamage(): number {
        let damage = 0
        if(this.weapon)
            damage = this.weapon.getWeight()*this.attacker.creature.naturalStrength

        //we return the max
        return Math.max(this.attacker.creature.naturalStrength,damage)
    }
    getLimbDamage(): number {
        return this.getHealthDamage()
    }

    constructor(attacker : Fighter,attackerBodyPart:string|BodyPart,defender : Fighter,defenderBodypart:string|BodyPart) {
        super(attacker,attackerBodyPart,defender,defenderBodypart);
    }
}