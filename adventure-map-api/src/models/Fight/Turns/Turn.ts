import Random from "../../../random/random"
import BodyPart from "../../Creature/BodyPart/BodyPart"
import { Creature } from "../../Creature/Creature"
import Fighter from "../Fighter"

/**
 * A fight action. This could for instance be "Alice Strikes Bob"
 */
export default abstract class Turn
{
    random? : Random
    actor : Fighter

    abstract get cooldown():number

    /**
     * most turns have a random element, if they don't, you can just provide undefined
     * @param actor 
     * @param random 
     */
    constructor(actor : Fighter,random : Random|undefined = undefined) {
        this.actor = actor
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