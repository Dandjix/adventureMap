import BodyPart from "./BodyPart";
import SidedBodyPart from "./SidedBodyPart";

export class Hand extends BodyPart implements SidedBodyPart
{
    readonly side:"right"|"left"
    /**
     * a hand is kinda small, so 0.5.
     */
    constructor(side:"right"|"left",natural_health : number,size:number=0.5) {
        super(natural_health,size)
        this.side = side
    }

    getIsVital(): boolean {
        return false
    }
    static getIsVital(): boolean {
        return false
    }
    getName(): string {
        return this.side+" hand"
    }
    /**
     * one for each finger
     * @returns 
     */
    getNumberOfEquipableAccessories(): number {
        return 5
    }
}