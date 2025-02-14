import { Creature } from "./Creature";

export interface GenderedCreature extends Creature
{
    gender : "male"|"female"
    sexual_orientation : "heterosexual"|"homosexual"|"bisexual"|"asexual"
}