import { BodyPart } from "./BodyPart";

export abstract class SidedBodyPart extends BodyPart
{
    readonly side : "right"|"left"

    constructor(side: "right"|"left") {
        super();
        this.side = side
    }
}