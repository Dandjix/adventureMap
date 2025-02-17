import { Creature } from "../Creature/Creature";
import ShortSword from "../Creature/Items/Weapon/ShortSword";
import Fighter from "./Fighter";
import { OneOnOneAttackTurn } from "./Turns/OneOnOneAttackTurn";
import { Bash } from "./Turns/Bash";
import Slash from "./Turns/Slash";
import Turn from "./Turns/Turn";
import Nuke from "../Creature/Items/Weapon/Nuke";
import NukeEveryone from "./Turns/NukeEveryone";

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
        const everyone = Fighter.getEveryone(fighterGroups)
        
        if(this.fighter.creature.bodyParts.find((bp)=>bp.getName()=="right hand")?.weapon instanceof Nuke)
        {
            const turn = new NukeEveryone(this.fighter,"right hand",everyone)
            return {cooldown:4 , turn:turn}
        }
        else if(this.fighter.creature.bodyParts.find((bp)=>bp.getName()=="right hand")?.weapon instanceof ShortSword)
        {
            const turn = new Slash(this.fighter,"right hand",ennemies[0],"head")
            return {cooldown:4 , turn:turn}
        }
        else
        {
            const turn = new Bash(this.fighter,"right hand",ennemies[0],"head")
            return {cooldown:2 , turn:turn}
        }

    }
}