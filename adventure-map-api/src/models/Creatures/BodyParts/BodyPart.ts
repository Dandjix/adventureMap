import { clamp } from "../../../util/clamp"
import { Accessory } from "../Items/Accessories/Accessory"
import { ArmorPiece } from "../Items/Armor/ArmorPiece"
import { getQualificator } from "./NumerousBodyPart"

export abstract class BodyPart
{
    /**
     * The name of the body part. Only one bodypart should have the same name for a given creature.
     */
    abstract getName():string
    abstract getIsVital() : boolean
    abstract getCanEquipArmor() : boolean
    abstract getNumberOfEquipableAccessories() : number
    /**
     * this goes from 0 to 1. At 0, the body part should be removed as it has been pulverized.
     */
    private health : number = 1

    setHealth(health:number)
    {
        this.health = clamp(health,0,1)
    }

    isMissing()
    {
        return this.health == 0
    }

    /**
     * this goes from 0 and up. At zero, a light breeze will amputate the body part. 
     * at 99999, the body part is for all intents and purposes indestructible.
     * a hit on an indestructible body part still transfers 100% of the damage to the creature itself.
     */
    abstract natural_toughness : number

    /**
     * this is the size of the body part. A bigger size means it will be picked more frequently as a target in a fight.
     */
    abstract size : number

    /**
     * default implementation of whether a body part is functionnal.
     * a vital body part that is not functionnal results in death.
     * @returns whether this body part is functionnal.
     */
    getIsFunctionnal() {
        return this.health > 0.5
    }

    armorPiece? : ArmorPiece

    accessories : Accessory[] = []
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
export function bodyPartIncludes(bodyParts : string[],bodyPartName : string)
{
    let matcherBodyPartName = bodyPartName.replace(/\b[0-9]{1,}[a-z]{2,2}\b/g,"#index")
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
export function nameMatches(realBodyPartName : string, matcher : string)
{
    const indicesRegexp = new RegExp(/(?<=(\s|^)#)[0-9]+(?=\s|$)/g).exec(matcher)

    indicesRegexp && indicesRegexp.forEach(element => {
        matcher = matcher.replace(`#${element}`,getQualificator(parseInt(element)))
    });
    // console.log("matcher : ",matcher,"real : ",realBodyPartName);
    
    return matcher == realBodyPartName
}