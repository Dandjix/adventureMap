import { Material } from "../Materials/Material";
import { SidedItem } from "../SidedItem";
import { ArmorPiece } from "./ArmorPiece";

export class Gauntlet extends ArmorPiece implements SidedItem{
    readonly side: "right" | "left";

    constructor(material : Material,side : "right"|"left",quality:number=0) {
        super(material,quality,[`${side} hand`,`#index ${side} hand`],["human","abomination"])
        this.side = side
    }

    getName(): string {
        return `${this.material.name} ${this.side} gauntlet`
    }
    getWeightMultiplier(): number {
        return 1
    }

}