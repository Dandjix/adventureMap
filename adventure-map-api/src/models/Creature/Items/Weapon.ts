import { BodyPart } from "../BodyParts/BodyPart";
import { Creature } from "../Creature";
import { Item } from "./Item";

export abstract class Weapon<BodyPartTypes extends BodyPart[], CreatureTypes extends Creature[]> extends Item
{

}