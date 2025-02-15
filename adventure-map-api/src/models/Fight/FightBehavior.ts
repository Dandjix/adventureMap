import { Creature } from "../Creature/Creature";
import Fighter from "./Fighter";
import { Bash } from "./Turns/Bash";
import { Turn } from "./Turns/Turn";

/**
 * AI behavior of a creature. it's a state machine. This is never going to be saved.
 */
export default class FightBehavior
{
    readonly fighter : Fighter
    /**
     *
     */
    constructor(fighter : Fighter) {
        this.fighter = fighter
    }
    /**
     * @param fighterGroups the ennemies to choose from (or not fight and run away, whatever)
     * @returns the number of seconds until the next turn
     */
    doTurn(fighterGroups : Fighter[][])
    {
        const ennemies = Fighter.getEnnemies(this.fighter,fighterGroups)

        const  turn : Turn = new Bash(this.fighter.creature,ennemies[0].creature,"head")
        return {cooldown:1 , turn:turn}
    }
}