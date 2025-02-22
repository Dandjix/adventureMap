import Random from "../../../../random/random";
import Fighter from "../../../Fight/Fighter";
import Turn from "../../../Fight/Turns/Turn";
import BodyPart from "../../BodyPart/BodyPart";
import { Item } from "../Item";
import { Material } from "../Materials/Material";

export default abstract class Weapon extends Item
{
    abstract getBaseCooldown():number
    abstract getBaseDamage():number

    /**
     * override this to implement one on one attacks weapons can do.
     * @param attacker 
     * @param attackerBodypart 
     * @param defender 
     * @param depth 
     * @param random 
     * @returns a list of possible turns
     */
    getOneOnOneAttackTurns(attacker : Fighter,attackerBodypart : BodyPart,defender : Fighter,depth:number,random : Random) : Turn[] {return []}
    
    /**
     * override this to implement global attacks weapons can do.
     * @param attacker 
     * @param attackerBodypart 
     * @param everyone 
     * @param depth 
     * @param random 
     * @returns 
     */
    getGlobalAttackTurns(attacker : Fighter,attackerBodypart : BodyPart,everyone : Fighter[],depth:number,random : Random) : Turn[] {return []}


    readonly bodyParts: string[];
    readonly creatures: string[];

    constructor(material : Material,quality:number,bodyParts: string[], creatures: string[]) {
        if (bodyParts.length === 0 || creatures.length === 0) {
            throw new Error("Body parts and creatures arrays cannot be empty");
        }
        if(!BodyPart.validateBodyPartOptions(bodyParts))
        {
            throw new Error("the body part options for that weapon are incorrect")
        }
        super(material,quality);
        this.bodyParts = bodyParts;
        this.creatures = creatures;
    }
}