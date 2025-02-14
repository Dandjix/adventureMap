import { SidedBodyPart } from "./SidedBodyPart";

export class Hand extends SidedBodyPart
{
    natural_toughness: number
    size: number

    /**
     * a hand is kinda small, so 0.5.
     */
    constructor(side:"Right"|"Left",natural_toughness : number,size:number=0.5) {
        super(side);
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
        return this.side+" Hand"
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