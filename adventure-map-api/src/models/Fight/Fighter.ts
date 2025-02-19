import { Creature } from "../Creature/Creature"
import Fight from "./Fight";
import FightBehavior from './FightBehavior';

/**
 * this is also never going to be saved.
 */
export default class Fighter
{
    creature : Creature

    fightBehavior : FightBehavior

    constructor(creature : Creature) {
        this.creature = creature
        this.fightBehavior = new FightBehavior(this)
    }

    cooldown : number = 0

    surrendering : boolean = false

    static getEnnemies(fighter : Fighter,fighterGroups : Fighter[][])
    {

        let index = 0
        let belongingGroup = fighterGroups[index]
        while(!belongingGroup.includes(fighter))
        {
            index++
            belongingGroup = fighterGroups[index]
        }

        const ennemies : Fighter[] = []
        fighterGroups.forEach(group => {
            if(group != belongingGroup)
                group.forEach(fighter => {
                    ennemies.push(fighter)
                });
        });

        return ennemies
    }

    static getAllies(fighter : Fighter,fighterGroups : Fighter[][])
    {
        let i = 0
        let fighterGroup = fighterGroups[i]
        while(!fighterGroup.includes(fighter))
        {
            i++
            fighterGroup = fighterGroups[i]
        }
        const allies : Fighter[] = []
        fighterGroup.forEach(ally => {
            allies.push(ally)
        });
        return allies
    }

    static getEveryone(fighterGroups : Fighter[][])
    {
        const everyone : Fighter[] = []
        fighterGroups.forEach(group => {
            group.forEach(fighter => {
                everyone.push(fighter)
            });
        });
        return everyone
    }

    static getFighterGroup(fighterGroups:Fighter[][],fighter:Fighter)
    {
        for (let i = 0; i < fighterGroups.length; i++) {
            const group = fighterGroups[i];
            for (let j = 0; j < group.length; j++) {
                const f = group[j];
                if(f == fighter)
                {
                    return group
                }
            }
        }
        throw new Error(`fighter ${fighter.creature.creatureName} is not a part of this fight`)
    }

    static removeFighter(fighterGroups:Fighter[][],fighter:Fighter)
    {
        for (let i = 0; i < fighterGroups.length; i++) {
            const group = fighterGroups[i];
            for (let j = 0; j < group.length; j++) {
                const f = group[j];
                if(f == fighter)
                {
                    group.splice(j,1)
                    if(group.length<=0)
                        fighterGroups.splice(i,1)
                    return
                }
            }
        }
    }
}



