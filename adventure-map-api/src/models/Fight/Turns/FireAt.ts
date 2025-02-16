import BodyPart from "../../Creature/BodyPart/BodyPart";
import { Creature } from "../../Creature/Creature";
import Pistol from "../../Creature/Items/Weapon/Pistol";
import { AttackTurn } from "./AttackTurn";

export default class FireAt extends AttackTurn
{
    getVerb(): string {
        return "fires at"
    }
    getHealthDamage(): number {
        return this.weapon!.getBaseDamage()
    }
    getLimbDamage(): number {
        return this.weapon!.getBaseDamage()
    }
    /**
     *
     */
    constructor(attacker : Creature,attackerBodyPart : BodyPart|string,defender:Creature,defenderBodyPart : BodyPart|string) {
        super(attacker,attackerBodyPart,defender,defenderBodyPart);
        if(!(this.weapon)||!(this.weapon instanceof Pistol))
            throw new Error(`${attacker.creatureName} cannot fire at ${defender.creatureName} : it does not have a pistol in its ${attackerBodyPart} (it has : ${this.weapon})`)
    }
    
}