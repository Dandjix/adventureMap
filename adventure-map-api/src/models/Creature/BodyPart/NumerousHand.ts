import BodyPart from "./BodyPart";
import { Hand } from "./Hand";
import NumerousBodyPart, { getQualificator } from "./NumerousBodyPart";

export default class NumerousHand extends Hand implements NumerousBodyPart
{
    index: number;

    constructor(side : "right"|"left",natural_toughness : number ,index:number, size:number = 0.5) {
        super(side,natural_toughness,size);
        this.index = index
    }

    getName(): string {
        return `${getQualificator(this.index)} ${super.getName()}`
    }
}