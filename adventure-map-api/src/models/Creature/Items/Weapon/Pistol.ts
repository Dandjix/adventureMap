import Weapon from "./Weapon";
import { SidedItem } from "../SidedItem";
import { Material } from "../Materials/Material";
import Fighter from "../../../Fight/Fighter";
import Turn from "../../../Fight/Turns/Turn";
import BodyPart from '../../BodyPart/BodyPart';
import FireAt from "../../../Fight/Turns/FireAt";
import Random from "../../../../random/random";
import BodyPartTargetterWeapon from "./BodyPartTargetterWeapon";

/**
 * lol, lmao
 */
export default class Pistol extends BodyPartTargetterWeapon implements SidedItem{

    getBodyPartTargetterTurns(attacker: Fighter, attackerBodypart: BodyPart, defender: Fighter, defenderBodypart: BodyPart): Turn[] {
        return [new FireAt(attacker,attackerBodypart,defender,defenderBodypart)]
    }

    readonly side: "left" | "right";

    /**
     *
     */
    constructor(material : Material,side : "left"|"right" = "right",quality:number=0) {
        super(material,quality,[`${side} hand`,`#index ${side} hand`],["human","abomination"])
        this.side = side
    }

    getBaseCooldown(): number {
        return 1
    }
    getBaseDamage(): number {
        return 999999
    }
    getName(): string {
        return `${this.material.name} pistol`
    }
    protected getWeightMultiplier(): number {
        return 0.6
    }
}