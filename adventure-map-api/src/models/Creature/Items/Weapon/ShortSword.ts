import Fighter from "../../../Fight/Fighter";
import Slash from "../../../Fight/Turns/Slash";
import Turn from "../../../Fight/Turns/Turn";
import BodyPart from "../../BodyPart/BodyPart";
import { Material } from "../Materials/Material";
import BodyPartTargetterWeapon from "./BodyPartTargetterWeapon";
import Weapon from "./Weapon";

export default class ShortSword extends BodyPartTargetterWeapon{
    getBodyPartTargetterTurns(attacker: Fighter, attackerBodypart: BodyPart, defender: Fighter, defenderBodypart: BodyPart): Turn[] {
        return [new Slash(attacker,attackerBodypart,defender,defenderBodypart)]
    }
    getBaseCooldown(): number {
        return 10
    }
    getBaseDamage(): number {
        return this.material.sharpnessMultiplier*(this.quality+2)*5
    }
    getName(): string {
        return `${this.material.name} short sword`
    }
    /**
     *
     */
    constructor(material : Material,quality:number=0) {
        super(material,quality,["#side hand","#index #side hand"],["human","abomination"])
    }

    protected getWeightMultiplier(): number {
        return 1
    }
}