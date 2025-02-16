import BodyPart from "../../Creature/BodyPart/BodyPart";
import Pistol from "../../Creature/Items/Weapon/Pistol";
import Fighter from "../Fighter";
import { OneOnOneAttackTurn } from "./OneOnOneAttackTurn";

export default class FireAt extends OneOnOneAttackTurn
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
    constructor(attacker : Fighter,attackerBodyPart : BodyPart|string,defender:Fighter,defenderBodyPart : BodyPart|string) {
        super(attacker,attackerBodyPart,defender,defenderBodyPart);
        if(!(this.weapon)||!(this.weapon instanceof Pistol))
            throw new Error(`${attacker.creature.creatureName} cannot fire at ${defender.creature.creatureName} : it does not have a pistol in its ${attackerBodyPart} (it has : ${this.weapon})`)
    }
    
}