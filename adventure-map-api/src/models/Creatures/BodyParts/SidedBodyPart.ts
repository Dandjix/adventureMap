import { BodyPart } from "./BodyPart";

export abstract class SidedBodyPart extends BodyPart
{
    readonly side : "Right"|"Left"

    constructor(side: "Right"|"Left") {
        super();
        this.side = side
    }
}