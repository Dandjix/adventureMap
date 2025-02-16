import BodyPart from "../../Creature/BodyPart/BodyPart";
import Nuke from "../../Creature/Items/Weapon/Nuke";
import Pistol from "../../Creature/Items/Weapon/Pistol";
import Fighter from "../Fighter";
import { GlobalAttackTurn } from "./GlobalAttackTurn";
import { OneOnOneAttackTurn } from "./OneOnOneAttackTurn";

export default class NukeEveryone extends GlobalAttackTurn
{
    getVerb(): string {
        return "nukes"
    }
    getHealthDamage(): number {
        return this.weapon!.getBaseDamage()
    }
    getLimbDamage(): number {
        return this.weapon!.getBaseDamage()
    }

    constructor(attacker : Fighter,attackerBodyPart : BodyPart|string,defenders:Fighter[]) {
        super(attacker,attackerBodyPart,defenders);
        if(!(this.weapon)||!(this.weapon instanceof Nuke))
            throw new Error(`${attacker.creature.creatureName} cannot nuke : it does not have a nuke in its ${attackerBodyPart} (it has : ${this.weapon})`)
    }
    
}