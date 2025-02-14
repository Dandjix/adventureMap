import { Creature } from "../Creature";

/**
 * A fight action. This could for instance be "Alice Strikes Bob"
 */
export abstract class Turn
{
    attacker : Creature
    defender : Creature

    constructor(attacker : Creature, defender : Creature) {
        this.attacker = attacker
        this.defender = defender
    }

    abstract play() : void

    abstract recap():string
}