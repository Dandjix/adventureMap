import { Item } from "./Item"
export interface SidedItem extends Item
{
    readonly side : "left"|"right"
}