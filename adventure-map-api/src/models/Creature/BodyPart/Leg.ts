import BodyPart from "./BodyPart";
import SidedBodyPart from "./SidedBodyPart";

export class Leg extends BodyPart implements SidedBodyPart
{
    readonly side: "right" | "left";

    constructor(side:"right"|"left",natural_health : number, size : number = 0.7) {
        super(natural_health,size);
        this.side = side
    }

    get isVital(): boolean {
        return false
    }
    getName(): string {
        return this.side+" leg"
    }
    getNumberOfEquipableAccessories(): number {
        return 4
    }
}