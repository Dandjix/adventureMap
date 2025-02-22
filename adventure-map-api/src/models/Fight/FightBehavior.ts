import { Creature } from "../Creature/Creature";
import ShortSword from "../Creature/Items/Weapon/ShortSword";
import Fighter from "./Fighter";
import { OneOnOneAttackTurn } from "./Turns/OneOnOneAttackTurn";
import { Bash } from "./Turns/Bash";
import Slash from "./Turns/Slash";
import Turn from "./Turns/Turn";
import Nuke from "../Creature/Items/Weapon/Nuke";
import NukeEveryone from "./Turns/NukeEveryone";
import Surrender from "./Turns/Surrender";
import BodyPart from "../Creature/BodyPart/BodyPart";
import Random from "../../random/random";

/**
 * AI behavior of a creature. it's a state machine. This is never going to be saved.
 */
export default class FightBehavior
{
    readonly fighter : Fighter
    private random : Random
    /**
     *
     */
    constructor(fighter : Fighter, random? : Random) {
        this.fighter = fighter
        this.random = random??new Random()
    }
    /**
     * @param fighterGroups the ennemies and allies to choose from (or not fight and surrender / run away, whatever)
     * @returns the turn to play
     */
    chooseTurn(fighterGroups : Fighter[][]) : Turn
    {
        const ennemies = Fighter.getEnnemies(this.fighter,fighterGroups)  
        const everyone = Fighter.getEveryone(fighterGroups)
        
        if((this.fighter.creature.healthPercentage)*this.fighter.creature.courage<0.25 || (ennemies.length/everyone.length)*this.fighter.creature.courage>0.75)
            return  new Surrender(this.fighter)

        let highest_priority_ennemy = ennemies.reduce((accumulator,current)=>{
            const currentPriority = this.getEnnemyPriority(current)
            const accumulatorPriority = this.getEnnemyPriority(accumulator)
            if(currentPriority==accumulatorPriority)
            {
                return Math.random() < 0.5 ? accumulator : current
            }
            if(currentPriority<accumulatorPriority)
            {
                return accumulator
            }
            return current
        },ennemies[0])

        const searchDepth = this.fighter.creature.intelligence*100

        let bestTurn : Turn|undefined = undefined
        let bestScore = Number.MIN_VALUE
        this.fighter.creature.bodyParts.forEach(bodyPart => {
            const oneOnOneAttackTurnPossibilities = bodyPart.getPossibleOneOnOneAttackTurns(this.fighter,highest_priority_ennemy,searchDepth,this.random)
            const globalAttackTurnPossibilities = bodyPart.getPossibleGlobalAttackTurns(this.fighter,everyone,searchDepth,this.random)
            const possibleTurns = [...oneOnOneAttackTurnPossibilities,...globalAttackTurnPossibilities]
            
            
            if(possibleTurns.length<=0)
                return

            const turn = possibleTurns.reduce((previousTurn,currentTurn)=>{
                return currentTurn.score>previousTurn.score ?  currentTurn : previousTurn
            })
            if(turn.score>=bestScore){
                bestTurn = turn
                bestScore = turn.score
            }
        });

        if(bestTurn == undefined)
        {
            const functionnalBodyParts = this.fighter.creature.bodyParts.filter(bp=>bp.isFunctionnal)
            const randomFunctionnalBodypart = functionnalBodyParts[this.random.randint(0,functionnalBodyParts.length)]
            const randomEnnemyBodypart = highest_priority_ennemy.creature.bodyParts[this.random.randint(0,highest_priority_ennemy.creature.bodyParts.length)]
            return new Bash(this.fighter,randomFunctionnalBodypart,highest_priority_ennemy,randomEnnemyBodypart)
        }

        return bestTurn
    }

    private getEnnemyPriority(ennemy : Fighter)
    {
        return ennemy.creature.health*(this.fighter.creature.honor*2-1)
    }

    private getMaxDps(ennemy : Fighter)
    {
        ennemy.creature.bodyParts.reduce((accumulator,current)=>{
            return accumulator
        })
    }
}