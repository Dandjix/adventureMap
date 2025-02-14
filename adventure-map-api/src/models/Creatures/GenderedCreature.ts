import { Creature } from "./Creature";

export interface GenderedCreature extends Creature
{
    gender : "Male"|"Female"
    sexual_orientation : "Heterosexual"|"Homosexual"|"Bisexual"|"Asexual"
}