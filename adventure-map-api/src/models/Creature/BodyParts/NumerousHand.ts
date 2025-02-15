import { BodyPart } from "./BodyPart";
import { getQualificator, NumerousBodyPart } from "./NumerousBodyPart";
import { SidedBodyPart } from "./SidedBodyPart";

export class NumerousHand extends BodyPart implements SidedBodyPart, NumerousBodyPart
{
    getName(): string {
        return `${getQualificator(this.index)} ${this.side} hand`
    }
    getIsVital(): boolean {
        return false
    }
    getCanEquipArmor(): boolean {
        return true
    }
    getNumberOfEquipableAccessories(): number {
        return 5;
    }
    natural_toughness: number;
    size: number;
    side: "right" | "left";
    index: number;

    /**
     *
     */
    constructor(side : "right"|"left",natural_toughness : number ,index:number, size:number = 0.5) {
        super();
        this.side = side
        this.natural_toughness = natural_toughness
        this.size = size
        this.index = index
    }

}