import Weapon from "./Weapon";
import { SidedItem } from "../SidedItem";
import { Material } from "../Materials/Material";

/**
 * lol, lmao
 */
export default class Pistol extends Weapon implements SidedItem{
    readonly side: "left" | "right";

    /**
     *
     */
    constructor(material : Material,side : "left"|"right" = "right") {
        super(material,[`${side} hand`,`#index ${side} hand`],["human","abomination"])
        this.side = side
    }

    getBaseCooldown(): number {
        return 1
    }
    getBaseDamage(): number {
        return 999999
    }
    getName(): string {
        return `${this.material.name} short sword`
    }
    protected getWeightMultiplier(): number {
        return 0.6
    }
}