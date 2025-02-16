import Random from "../../../random/random"
import { Creature } from "../../Creature/Creature"
import Fighter from "../Fighter"

/**
 * A fight action. This could for instance be "Alice Strikes Bob"
 */
export abstract class Turn
{
    random : Random
    attacker : Fighter

    constructor(attacker : Fighter,random : Random = new Random()) {
        this.attacker = attacker
        this.random = random
    }
    abstract play() : {recap:string,affected:Fighter[]}
}