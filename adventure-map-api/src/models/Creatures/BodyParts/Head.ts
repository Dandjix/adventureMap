import { BodyPart } from "./BodyPart";

export class Head extends BodyPart
{
    natural_toughness: number
    size: number

    /**
     *
     */
    constructor(natural_toughness : number, size : number = 0.5) {
        super();
        this.natural_toughness = natural_toughness
        this.size = size
    }

    getIsVital(): boolean {
        return true
    }
    getName(): string {
        return "Head"
    }
    getCanEquipArmor(): boolean {
        return true
    }
    getNumberOfEquipableAccessories(): number {
        return 5
    }
}