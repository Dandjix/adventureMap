import Random from "../../../random/random"
import BodyPart from "../../Creature/BodyPart/BodyPart"
import { Creature } from "../../Creature/Creature"
import Fighter from "../Fighter"

/**
 * A fight action. This could for instance be "Alice Strikes Bob"
 */
export default abstract class Turn
{
    random : Random
    attacker : Fighter

    constructor(attacker : Fighter,random : Random = new Random()) {
        this.attacker = attacker
        this.random = random
    }
    abstract play() : {recap:string,affected:Affected[]}
}

export class Affected
{
    fighter : Fighter
    bodyParts : BodyPart[]

    constructor(fighter : Fighter,bodyParts : BodyPart[]=[]) {
        this.fighter = fighter,
        this.bodyParts = bodyParts
    }


}