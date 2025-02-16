import BodyPart from "./BodyPart";

export class Torso extends BodyPart
{
    natural_toughness: number
    size: number

    /**
     * a torso is big, so size = 1
     */
    constructor(natural_toughness : number, size : number = 1) {
        super();
        this.natural_toughness = natural_toughness
        this.size = size
    }

    getIsVital(): boolean {
        return true
    }
    getName(): string {
        return "torso"
    }
    /**
     * one backback
     */
    getNumberOfEquipableAccessories(): number {
        return 1
    }
}