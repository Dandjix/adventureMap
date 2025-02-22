import BodyPart from "../../Creature/BodyPart/BodyPart";
import { Creature } from "../../Creature/Creature";
import Pistol from "../../Creature/Items/Weapon/Pistol";
import ShortSword from "../../Creature/Items/Weapon/ShortSword";
import Fighter from "../Fighter";
import { OneOnOneAttackTurn } from "./OneOnOneAttackTurn";

export default class Slash extends OneOnOneAttackTurn
{
    getVerb(): string {
        return "slashes"
    }
    getBaseHealthDamage(): number {
        return this.weapon!.getBaseDamage()*this.actor.creature.naturalStrength
    }
    getBaseLimbDamage(): number {
        return this.getBaseHealthDamage()
    }

    constructor(attacker : Fighter,attackerBodyPart : BodyPart|string,defender:Fighter,defenderBodyPart : BodyPart|string) {
        super(attacker,attackerBodyPart,defender,defenderBodyPart);
        if(!(this.weapon)||!(this.weapon instanceof ShortSword))
            throw new Error(`${attacker.creature.creatureName} cannot slash ${defender.creature.creatureName} : it does not have a short sword in its ${attackerBodyPart} (it has : ${this.weapon})`)
    }
    
}