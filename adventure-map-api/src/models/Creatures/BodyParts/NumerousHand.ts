import { BodyPart } from "./BodyPart";
import { getQualificator, NumerousBodyPart } from "./NumerousBodyPart";
import { SidedBodyPart } from "./SidedBodyPart";

export class NumerousHand extends BodyPart implements SidedBodyPart, NumerousBodyPart
{
    getName(): string {
        return `${getQualificator(this.index)} ${this.side} hand`
    }
    getIsVital(): boolean {
        throw new Error("Method not implemented.");
    }
    getCanEquipArmor(): boolean {
        throw new Error("Method not implemented.");
    }
    getNumberOfEquipableAccessories(): number {
        throw new Error("Method not implemented.");
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