import { ArmorPiece } from "./ArmorPiece";

export interface SidedArmorPiece extends ArmorPiece
{
    readonly side : "left"|"right"
}