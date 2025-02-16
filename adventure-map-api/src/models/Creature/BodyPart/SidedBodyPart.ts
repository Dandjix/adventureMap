import BodyPart from "./BodyPart";

export default interface SidedBodyPart extends BodyPart
{
    readonly side : "right"|"left"
}