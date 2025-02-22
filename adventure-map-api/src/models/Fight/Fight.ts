import Random from '../../random/random';
import { Creature } from '../Creature/Creature';
import Turn from './Turns/Turn';
import Fighter from './Fighter';
import Surrender from './Turns/Surrender';
import { Item } from '../Creature/Items/Item';

class Prisoner
{
    fighter : Fighter
    group : Fighter[]
    /**
     *
     */
    constructor(fighter : Fighter, group : Fighter[]) {
        this.fighter = fighter
        this.group = group
    }
}
export default class Fight
{
    turnRecaps : string[] = []
    fighterGroups : Fighter[][] 
    prisoners : Prisoner[] = []
    victors? : Fighter[] = undefined
    loot : Item[] = []
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
            this.victors = []
            this.turnRecaps.push(`there is no clear winner : no one is still standing.`)
            if(this.prisoners.length>0)
            {
                this.prisoners.forEach(prisoner => {
                    prisoner.fighter.creature.health = 0
                });
                this.turnRecaps.push(`the ${this.prisoners.length} prisoners starve to death.`)
            }
        }
        else if(this.fighterGroups.length == 1)
        {
            this.prisoners.forEach(prisoner => {
                if(prisoner.group == this.fighterGroups[0])
                {
                    this.turnRecaps.push(`${prisoner.fighter.creature.creatureName} is liberated by the victors.`)
                    this.fighterGroups[0].push(prisoner.fighter)
                }
            })

            if(this.fighterGroups[0].length==1)
            {
                this.victors = this.fighterGroups[0]
                this.turnRecaps.push(`the winner of the fight is ${this.fighterGroups[0][0].creature.creatureName}.`)
            }
            else
            {
                this.victors = this.fighterGroups[0]
                let recap = `the winners of the fight are`
                if(this.victors.length<=13)
                {
                    for (let i = 0; i < this.victors.length; i++) {
                        const fighter = this.victors[i];
                        recap = `${recap} ${fighter.creature.creatureName}`
                        if(i<this.victors.length-1)
                            recap = `${recap}, `
                    }
                    recap = `${recap}.`
                }
                else
                {
                    recap = `there are ${this.victors.length} victors.`
                }
                this.turnRecaps.push(recap)
            }
        }
        if(this.loot.length>0)
        {
            this.turnRecaps.push(`the loot consists of ${this.loot.length} items.`)
        }
        this.turnRecaps.push(this.getPrisonersRecap())
    }

    private getPrisonersRecap()
    {
        let prisonnersRecap : string
        if(this.prisoners.length<=0)
        {
            prisonnersRecap = `there are no prisoners.`
        }
        else if(this.prisoners.length==1)
        {
            prisonnersRecap = `${this.prisoners[0].fighter.creature.creatureName} is taken prisoner.`
        }
        else //if(this.prisoners.length>1)
        {
            prisonnersRecap = `the prisoners are`
            if(this.prisoners.length<=13)
            {
                for (let i = 0; i < this.prisoners.length; i++) {
                    const prisoner = this.prisoners[i];
                    prisonnersRecap = `${prisonnersRecap} ${prisoner.fighter.creature.creatureName}`
                    if(i<this.prisoners.length-1)
                        prisonnersRecap = `${prisonnersRecap}, `
                }
                prisonnersRecap = `${prisonnersRecap}.`
            }
            else
            {
                prisonnersRecap = `there are ${this.prisoners.length} prisoners.`
            }
        }
        return prisonnersRecap
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
        const turn = fighter.fightBehavior.chooseTurn(this.fighterGroups)

        fighter.cooldown = turn.cooldown

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
                this.loot.push(...affectedFighter.fighter.creature.strip())
                this.turnRecaps.push(`${affectedFighter.fighter.creature.creatureName} is dead !`)
            }
            else if(affectedFighter.fighter.surrendering)
            {
                this.prisoners.push(new Prisoner(affectedFighter.fighter,Fighter.getFighterGroup(this.fighterGroups,affectedFighter.fighter)))
                Fighter.removeFighter(this.fighterGroups,affectedFighter.fighter)
            }
        }
    }
}
