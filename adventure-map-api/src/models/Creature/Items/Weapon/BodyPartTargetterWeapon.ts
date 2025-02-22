import Random from "../../../../random/random";
import Fighter from "../../../Fight/Fighter";
import IndividualTurn from "../../../Fight/Turns/IndividualTurn";
import Turn from "../../../Fight/Turns/Turn";
import BodyPart from "../../BodyPart/BodyPart";
import Weapon from "./Weapon";

function getRandomSelection<T>(array : T[],depth : number,random : Random)
{
    const copy = [...array]
    const result : T[] = []
    while(copy.length>0 && depth>0)
    {
        const index = random.randint(0,copy.length)
        result.push(copy[index])
        copy.splice(index,1)
    }
    return result
}

export default abstract class BodyPartTargetterWeapon extends Weapon
{
    getOneOnOneAttackTurns(attacker: Fighter, attackerBodypart: BodyPart, defender: Fighter,depth : number,random : Random): Turn[] {

        const bodyPartsToEvaluate = getRandomSelection(defender.creature.bodyParts,depth,random)

        const turns : Turn[] = []
        bodyPartsToEvaluate.forEach(bodypart => {
            if(attackerBodypart.isFunctionnal && !bodypart.isMissing)
                turns.push(...this.getBodyPartTargetterTurns(attacker,attackerBodypart,defender,bodypart))
        });

        return turns
    }

    abstract getBodyPartTargetterTurns(attacker: Fighter, attackerBodypart: BodyPart, defender: Fighter,defenderBodypart : BodyPart):Turn[];
}