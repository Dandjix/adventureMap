import BodyPart from "./BodyPart";

export class Torso extends BodyPart
{
    /**
     * a torso is big, so size = 1
     */
    constructor(natural_health : number, size : number = 1) {
        super(natural_health,size);
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