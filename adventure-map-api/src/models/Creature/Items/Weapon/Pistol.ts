import Weapon from "./Weapon";
import { SidedWeapon } from './SidedWeapon';
import { SidedItem } from "../SidedItem";
import { Material } from "../Materials/Material";

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
    }
    getBaseDamage(): number {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        return `${this.material.name} short sword`
    }
    protected getWeightMultiplier(): number {
        return 0.6
    }
}