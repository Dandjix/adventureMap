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
}

