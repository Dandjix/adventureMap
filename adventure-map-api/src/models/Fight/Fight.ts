import Random from '../../random/random';
import { Creature } from '../Creature/Creature';
import { Turn } from './Turns/Turn';
import Fighter from './Fighter';
export default class Fight
{
    turns : Turn[] = []
    fighterGroups : Fighter[][] 
    /**
     * the timeline is in seconds. The timeline advances with the fight. It allows to know the length of the fight.
     */
    timeLine : number = 0

    /**
     * the random object can be overriden and passed for unit tests
     */
    random : Random

    constructor(fighterGroups : Fighter[][],random? : Random) {
        this.fighterGroups = fighterGroups

        if(!random)
            this.random = new Random()
        else
            this.random = random
    }

    advance()
    {
        const readyToFight : Fighter[] = []
        this.fighterGroups.forEach(fighterGroup => {
            fighterGroup.forEach(fighter => {
                if(fighter.cooldown<=0)
                {
                    readyToFight.push(fighter)
                }
            });
        });

        while(readyToFight.length>1)
        {
            const i = Math.floor(this.random.random()*(readyToFight.length))
            const nextFighter = readyToFight[i]
            readyToFight.splice(i,1)
            
            const{cooldown, turn} = nextFighter.fightBehavior.doTurn(this.fighterGroups)

            nextFighter.cooldown = cooldown
            this.turns.push(turn)
        }        
        this.timeLine+=1
    }



}
