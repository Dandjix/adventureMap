import { Creature } from "../Creature";

/**
 * AI behavior of a creature. it's a state machine.
 */
export class Behavior
{
    readonly creature : Creature
    /**
     *
     */
    constructor(creature : Creature) {
        this.creature = creature
    }
}