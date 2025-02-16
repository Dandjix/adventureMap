import BodyPart from '../../Creature/BodyPart/BodyPart';
import { Creature } from "../../Creature/Creature";
import Weapon from '../../Creature/Items/Weapon/Weapon';
import { AttackTurn } from './AttackTurn';
import { Turn } from "./Turn";


/**
 * Bob Bashes Alice with his head
 * or Bob Bashes Alice with the Battle Axe in his right hand
 */
export class Bash extends AttackTurn
{
    recap: string | undefined;
    getVerb(): string {
        throw new Error('Method not implemented.');
    }
    getHealthDamage(): number {
        throw new Error('Method not implemented.');
    }
    getLimbDamage(): number {
        throw new Error('Method not implemented.');
    }

    constructor(attacker : Creature,attackerBodyPart:string|BodyPart,defender : Creature,defenderBodypart:string|BodyPart) {
        super(attacker,attackerBodyPart,defender,defenderBodypart);
    }
}