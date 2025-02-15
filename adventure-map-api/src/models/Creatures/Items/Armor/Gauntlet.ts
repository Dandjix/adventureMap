import { Material } from "../Materials/Material";
import { ArmorPiece } from "./ArmorPiece";
import { SidedArmorPiece } from "./SidedArmorPiece";

export class Gauntlet extends ArmorPiece implements SidedArmorPiece{
    side: "right" | "left";

    constructor(material : Material,side : "right"|"left") {
        super(material,[`${side} hand`,`#index ${side} hand`],["human","abomination"])
        this.side = side
    }

    getName(): string {
        return `${this.material.name} ${this.side} gauntlet`
    }
    getWeightMultiplier(): number {
        return 1
    }

}