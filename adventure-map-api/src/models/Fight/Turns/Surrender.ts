import Random from "../../../random/random";
import Fighter from "../Fighter";
import IndividualTurn from "./IndividualTurn";
import { Affected } from "./Turn";

/**
 * Surrender and extending classes will be picked up in fight.
 */
export default class Surrender extends IndividualTurn
{
    get score(): number {
        throw new Error("Method not implemented.");
    }
    get cooldown(): number {
        return 1
    }
    constructor(fighter : Fighter) {
        super(fighter);
    }

    getAffected(): Affected {
        return new Affected(this.actor,[])
    }

    play(): { recap: string; affected: Affected[]; } {
        this.actor.surrendering = true
        return super.play()
    }
    
    get verb(): string {
        return "surrenders"
    }
}