import { clamp } from "../../../util/clamp"
import { Accessory } from "../Items/Accessories/Accessory"
import { ArmorPiece } from "../Items/Armor/ArmorPiece"

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