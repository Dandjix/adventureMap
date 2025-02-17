import Random from '../../random/random';
import { Creature } from '../Creature/Creature';
import Turn from './Turns/Turn';
import Fighter from './Fighter';

export default class Fight
{
    turnRecaps : string[] = []
    fighterGroups : Fighter[][] 
    /**
     * the timeline is in seconds. The timeline advances with the fight. It allows to know the length of the fight.
     */
    timeLine : number = 0

    /**
     * the random object can be overriden and passed for unit tests
     */
    random : Random

    get isOver()
    {
        return this.fighterGroups.length<=1
    }

    get recap()
    {
        let recap = ""
        this.turnRecaps.forEach(turnRecap => {
            recap += turnRecap+"\n"
        });
        return recap
    }

    constructor(fighterGroups : Fighter[][],random? : Random) {
        this.fighterGroups = fighterGroups

        if(!random)
            this.random = new Random()
        else
            this.random = random
    }

    advance()
    {
        let readyToFight : Fighter[] = []
        this.fighterGroups.forEach(fighterGroup => {
            fighterGroup.forEach(fighter => {
                if(fighter.cooldown<=0)
                    readyToFight.push(fighter)
            });
        });

        if(readyToFight.length>0)
        {
            readyToFight = Fight.getMinimunCooldowns(readyToFight)

            const index = Math.floor(this.random.random()*readyToFight.length)
    
            const fighter = readyToFight[index]
    
            this.playTurn(fighter)
        }
        this.fighterGroups.forEach(fighterGroup => {
            fighterGroup.forEach(fighter => {
                fighter.cooldown -=1
            });
        });
    }

    /**
     * returns all the fighters whose cooldowns are equal and are the minimum. This is not sorted randomly.
     * @param fighters 
     * @returns 
     */
    private static getMinimunCooldowns(fighters : Fighter[])
    {
        if(fighters.length<=1)
            return fighters

        fighters.sort((a:Fighter,b:Fighter)=>a.cooldown - b.cooldown)

        const minCooldownFighters : Fighter[] = [fighters[0]]

        const minCooldown = fighters[0].cooldown
        let nextCooldown = fighters[1].cooldown

        let i = 1
        while(minCooldown == nextCooldown && i<fighters.length)
        {
            nextCooldown = fighters[i].cooldown
            minCooldownFighters.push(fighters[i])
            i++
        }
        return minCooldownFighters
    }

    public end()
    {
        if(this.fighterGroups.length == 0)
        {
            this.turnRecaps.push(`there is no clear winner : no one is still standing.`)
        }
        else if(this.fighterGroups.length == 1)
        {
            if(this.fighterGroups[0].length==1)
            {
                this.turnRecaps.push(`the winner of the fight is ${this.fighterGroups[0][0].creature.creatureName}.`)
            }
            else
            {
                let recap = `the winners of the fight are `
                for (let i = 0; i < this.fighterGroups[0].length; i++) {
                    const fighter = this.fighterGroups[0][i];
                    recap = `${recap} ${fighter.creature.creatureName}`
                    if(i<this.fighterGroups[0].length-1)
                        recap = `${recap}, `
                }
                this.turnRecaps.push(recap)
            }
        }
    }

    public playAll()
    {
        while(!this.isOver)
        {
            this.advance()
        }
        this.end()
    }

    private playTurn(fighter : Fighter)
    {
        const{cooldown, turn} = fighter.fightBehavior.doTurn(this.fighterGroups)
        fighter.cooldown = cooldown

        const {recap,affected} = turn.play()
        this.turnRecaps.push(recap)

        for (let i = 0; i < affected.length; i++) {
            const affectedFighter = affected[i];
            affectedFighter.bodyParts.forEach(bodyPart => {
                this.turnRecaps.push(`${affectedFighter.fighter.creature.creatureName}'s ${bodyPart.getName()} is ${bodyPart.status}`)
                if(!bodyPart.isFunctionnal && bodyPart.isVital)
                {
                    affectedFighter.fighter.creature.health = 0
                }
            });
            if(!affectedFighter.fighter.creature.isAlive)
            {
                Fighter.removeFighter(this.fighterGroups,affectedFighter.fighter)
                
                this.turnRecaps.push(`${affectedFighter.fighter.creature.creatureName} is dead !`)
            }
        }

    }



}
