import { Creature } from "./Creature";

/**
 * any creature that inherits from this can be an adventurer. All Humans are adventurers, though not every human is employed as an adventurer.
 */
export interface Adventurer extends Creature
{

}