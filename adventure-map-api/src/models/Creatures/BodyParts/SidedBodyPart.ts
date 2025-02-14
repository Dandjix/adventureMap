import { BodyPart } from "./BodyPart";

export interface SidedBodyPart extends BodyPart
{
    readonly side : "right"|"left"
}