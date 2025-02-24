import Random from "../../../random/random"
import { clamp } from "../../../util/clamp"
import Fighter from "../../Fight/Fighter"
import { Bash } from "../../Fight/Turns/Bash"
import Turn from "../../Fight/Turns/Turn"
import { Accessory } from "../Items/Accessories/Accessory"
import { ArmorPiece } from "../Items/Armor/ArmorPiece"
import Weapon from "../Items/Weapon/Weapon"
import { getIndex, getQualificator } from "./NumerousBodyPart"

export default abstract class BodyPart
{
    /**
     * The name of the body part. Only one bodypart should have the same name for a given creature.
     */
    abstract getName():string
    abstract get isVital() : boolean
    abstract getNumberOfEquipableAccessories() : number
    /**
     * this goes from 0 and up. At 0, the body part should be removed as it has been pulverized.
     */
    private _health : number

    public set health(health:number)
    {
        this._health = clamp(health,0,this.natural_health)
    }

    public get health()
    {
        return this._health
    }

    public get healthPercentage()
    {
        return this._health/this.natural_health
    }

    get isMissing()
    {
        return this._health == 0
    }

    /**
     * this goes from 0 and up. At zero, a light breeze will amputate the body part. 
     * at 99999, the body part is for all intents and purposes indestructible.
     * a hit on an indestructible body part still transfers 100% of the damage to the creature itself.
     */
    natural_health : number

    /**
     * this is the size of the body part. A bigger size means it will be picked more frequently as a target in a fight.
     * Since body parts are generally homogenous enough, this is equal to the weight.
     */
    size : number


    get equippedWeight()
    {
        const weight = this.size + (this.weapon ? this.weapon.getWeight() : 0)+(this.armorPiece ? this.armorPiece.getWeight() : 0)
        return weight
    }

    //this is a multiplier that signifies how functionnal the body part is.
    get efficiency()
    {
        return Math.max(0.25,Math.pow(this.healthPercentage,0.5))
    }

    getPossibleOneOnOneAttackTurns(attacker : Fighter,defender : Fighter,depth:number,random : Random)
    {
        if(!this.isFunctionnal)
            return []
        const turns : Turn[] = []

        if(this.weapon)
        {
            turns.push(...this.weapon.getOneOnOneAttackTurns(attacker,this,defender,depth,random))
        }
        return turns
    }

    getPossibleGlobalAttackTurns(attacker : Fighter,everyone : Fighter[],depth:number,random : Random)
    {
        if(!this.isFunctionnal)
            return []
        const turns : Turn[] = []

        if(this.weapon)
        {
            turns.push(...this.weapon.getGlobalAttackTurns(attacker,this,everyone,depth,random))
        }
        return turns
    }

    /**
     * default implementation of whether a body part is functional.
     * a vital body part that is not functional results in death.
     * a body part that is not functionnal drops it's weapon.
     * @returns whether this body part is al.
     */
    get isFunctionnal() {
        return this.healthPercentage >= 0.25
    }

    get status()
    {
        if(this.isMissing)
        {
            return "missing"
        }
        let suffix : string = ""
        if(!this.isFunctionnal)
        {
            suffix = "(not functionnal)"
        }
        let body : string
        if(this.healthPercentage<0.25)
            body = "terribly mangled"
        else if(this.healthPercentage<0.5)
            body = "mangled"
        else if(this.healthPercentage<0.75)
            body = "damaged"
        else if(this.healthPercentage<1)
            body = "bruised"
        else
            body = "intact"
        return `${body}${suffix ? ` ${suffix}`:''}`
    }

    armorPiece? : ArmorPiece

    weapon? : Weapon

    accessories : Accessory[] = []

    /**
     *
     */
    constructor(natural_health : number,size : number) {
        this.natural_health = natural_health
        this._health = natural_health
        this.size = size
    }

        /**
     * checks if a body part is included in the body part array provided.
     * 
     * This is used to check if the requirements are met, for instance when i try to equip a ring on the "21st left hand",
     * ring should have a bodyParts string[] with "#index #side hand"
     * 
     * This checks stuff so that "1st left hand" matches "#index left hand"
     * @param bodyParts the body parts that are allowed to equip the object
     * @param bodyPartName the body part that will equip the item
     */
    static bodyPartIncludes(bodyParts : string[],bodyPartName : string)
    {

        // const qualificators = bodyPartName.match(/\b[0-9]{1,}[a-z]{2,2}\b/g)
        // qualificators && qualificators.forEach(qualificator =>{
        //     const index = getIndex(qualificator)
        // })
        let matcherBodyPartName = bodyPartName.replace(/\b[0-9]{1,}[a-z]{2,2}\b/g,"#index")
        const {anySide} = BodyPart.getSidedNess(bodyParts)
        
        if(anySide)
            matcherBodyPartName = matcherBodyPartName.replace(/\bleft|right\b/g,"#side")

        // console.log(
        //     "bodyParts : ",
        //     bodyParts,
        //     "matcher : ",
        //     matcherBodyPartName);
        

        for (let i = 0; i < bodyParts.length; i++) {
            const bodyPart = bodyParts[i];
            // console.log("bodyPart ",bodyPart,"matcher : ",matcherBodyPartName);
            
            if(bodyPart==matcherBodyPartName)
            {
                // console.log("bodyPart ",bodyPart,"matches : ",matcherBodyPartName);
                return true
            }
        }
        return false
    }
    /**
     * 
     * @param realBodyPartName the real internal name of the body part, such as "3rd left hand"
     * @param matcher a string either like 
     * "3rd left hand" 
     * or "#2 left hand" 
     * @returns 
     */
    static nameMatches(realBodyPartName : string, matcher : string)
    {
        const indicesRegexp = new RegExp(/(?<=(\s|^)#)[0-9]+(?=\s|$)/g).exec(matcher)

        indicesRegexp && indicesRegexp.forEach(element => {
            matcher = matcher.replace(`#${element}`,getQualificator(parseInt(element)))
        });
        // console.log("matcher : ",matcher,"real : ",realBodyPartName);
        
        return matcher == realBodyPartName
    }
    /**
     * some options are not allowed. Namely : 
     * ["right hand","#side hand"]
     * does not work : you either accept either right or left interchangeably with #side (a ring for instance does not care if it is put on a right or left hand),
     * or ["right hand"] for an item that can only be put on a right hand
     * or ["right hand","left hand"] for an item that is sided and can only be put on the right or left side depending on its own sidedness 
     * @param bodyParts the body part options to evaluate
     * @returns whether the list is valid
     */
    static validateBodyPartOptions(bodyParts:string[])
    {
        const {anySide,specificSide} = BodyPart.getSidedNess(bodyParts)
        return !(anySide && specificSide)
    }

    static getSidedNess(bodyParts:string[])
    {
        let anySide = false
        let specificSide = false
        for (let i = 0; i < bodyParts.length; i++) {
            const bp = bodyParts[i];
            if(bp.includes("left") || bp.includes("right"))
                specificSide = true
            else if(bp.includes("#side"))
                anySide = true

            if(specificSide && anySide)
                return {anySide:true,specificSide:true}
        }
        return {anySide:anySide,specificSide:specificSide}
    }

    /**
     * finds the first body part by name. this matches "#0 left hand" with first left hand. 
     * @param bodyParts 
     * @param bodyPartName 
     * @returns 
     */
    static find(bodyParts : BodyPart[],bodyPartName : string)
    {
        for (let i = 0; i < bodyParts.length; i++) {
            const bp = bodyParts[i];
            if(BodyPart.nameMatches(bp.getName(),bodyPartName))
                return bp
        }
        return undefined
    }
}
