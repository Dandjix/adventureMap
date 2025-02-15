import { ArmorPiece } from "./ArmorPiece";
import { SidedArmorPiece } from "./SidedArmorPiece";

export class Gauntlet extends ArmorPiece implements SidedArmorPiece{
    side: "right" | "left";

    constructor(side : "right"|"left") {
        super([`${side} hand`,`#index ${side} hand`],["human","abomination"])
        this.side = side
    }

    getName(): string {
        return `${this.side} gauntlet`
    }
    getWeight(): number {
        return 1
    }

}