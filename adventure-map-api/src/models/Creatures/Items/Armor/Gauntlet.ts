import { ArmorPiece } from "./ArmorPiece";
import { SidedArmorPiece } from "./SidedArmorPiece";

export class Gauntlet extends ArmorPiece implements SidedArmorPiece{
    side: "right" | "left";

    constructor(materialName:string,side : "right"|"left") {
        super(materialName,[`${side} hand`,`#index ${side} hand`],["human","abomination"])
        this.side = side
    }

    getName(): string {
        return `${this.materialName} ${this.side} gauntlet`
    }
    getWeightMultiplier(): number {
        return 1
    }

}