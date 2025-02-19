import Random from "../../../random/random";
import Fighter from "../Fighter";
import Turn, { Affected } from "./Turn";

/**
 * for individual actions that only affect the caster, like drinking a potion or surrendering.
 */
export default abstract class IndividualTurn extends Turn
{
    constructor(actor : Fighter, random? : Random) {
        super(actor,random);
    }

    /**
     * this is still to provide because some actions will target a body part. The actor should be returned.
     */
    abstract getAffected():Affected

    play(): { recap: string; affected: Affected[]; } {
        return {recap:`${this.actor.creature.creatureName} ${this.verb}.`,affected:[this.getAffected()]}
    }

    abstract get verb() : string
}