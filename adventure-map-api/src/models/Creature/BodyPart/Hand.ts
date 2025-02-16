import BodyPart from "./BodyPart";
import SidedBodyPart from "./SidedBodyPart";

export class Hand extends BodyPart implements SidedBodyPart
{
    natural_toughness: number
    size: number
    side:"right"|"left"
    /**
     * a hand is kinda small, so 0.5.
     */
    constructor(side:"right"|"left",natural_toughness : number,size:number=0.5) {
        super()
        this.side = side
        this.natural_toughness = natural_toughness
        this.size = size
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
    getCanEquipArmor(): boolean {
        return true
    }
    /**
     * one for each finger
     * @returns 
     */
    getNumberOfEquipableAccessories(): number {
        return 5
    }
}