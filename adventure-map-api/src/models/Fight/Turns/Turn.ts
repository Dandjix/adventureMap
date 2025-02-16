import Random from "../../../random/random"
import { Creature } from "../../Creature/Creature"

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
    abstract play(random : Random) : string
}