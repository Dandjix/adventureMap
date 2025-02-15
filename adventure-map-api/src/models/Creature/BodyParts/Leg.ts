import BodyPart from "./BodyPart";
import SidedBodyPart from "./SidedBodyPart";

export class Leg extends BodyPart implements SidedBodyPart
{
    side: "right" | "left";
    natural_toughness: number
    size: number

    constructor(side:"right"|"left",natural_toughness : number, size : number = 0.7) {
        super();
        this.side = side
        this.natural_toughness = natural_toughness
        this.size = size
    }

    
    getIsVital(): boolean {
        return false
    }
    getName(): string {
        return this.side+" leg"
    }
    getCanEquipArmor(): boolean {
        return true
    }
    getNumberOfEquipableAccessories(): number {
        return 4
    }
}