import BodyPart from "./BodyPart";

export class Head extends BodyPart
{
    constructor(natural_health : number, size : number = 0.5) {
        super(natural_health,size);
    }
    get isVital(): boolean {
        return true
    }
    getName(): string {
        return "head"
    }
    getNumberOfEquipableAccessories(): number {
        return 5
    }
}