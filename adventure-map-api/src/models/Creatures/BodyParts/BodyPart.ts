import { clamp } from "../../../util/clamp"
import { Accessory } from "../Items/Accessory/Accessory"
import { ArmorPiece } from "../Items/ArmorPiece"

export abstract class BodyPart
{
    abstract getName():string
    abstract getIsVital() : boolean
    abstract getCanEquipArmor() : boolean
    abstract getNumberOfEquipableAccessories() : number
    /**
     * this goes from 0 to 1. At 0, the body part should be removed as it has been pulverized.
     */
    private health : number

    setHealth(health:number)
    {
        this.health = clamp(health,0,1)
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

    armorPiece? : ArmorPiece<[],[]>

    // equipArmor<BP extends BodyPart[], CT extends Creature[]>(armor_piece: ArmorPiece<BP, CT>): boolean {
    //     // Ensure the creature type is compatible
    //     if (!armor_piece.validCreatures.includes(this.constructor as unknown as CT[number])) {
    //         console.log("This creature cannot equip this armor.");
    //         return false;
    //     }
    
    //     // Ensure the creature has the required body parts
    //     const hasRequiredBodyParts = armor_piece.validBodyParts.every(requiredPart =>
    //         this.body_parts.some(part => part instanceof requiredPart)
    //     );
    
    //     if (!hasRequiredBodyParts) {
    //         console.log("This creature lacks the required body parts for this armor.");
    //         return false;
    //     }
    
    //     // If everything is valid, equip the armor
    //     if (this.armorPiece) {
    //         console.log("Armor slot is already occupied.");
    //         return false;
    //     }
        
    //     this.armorPiece = armor_piece;
    //     return true;
    // }

    unequipArmor()
    {
        const armorPiece = this.armorPiece
        this.armorPiece = undefined
        return armorPiece
    }

    accessories : Accessory<[],[]>[]

    // equipAccessory(accessory : Accessory<[],[]>) : boolean
    // {
    //     if(this.armorPiece)
    //     {
    //         return false
    //     }
    //     this.armorPiece = armor_piece
    //     return true
    // }

    unequipAccessory()
    {
        const armorPiece = this.armorPiece
        this.armorPiece = undefined
        return armorPiece
    }

    constructor() {
        this.health = 1
        this.armorPiece = undefined
        this.accessories = []
    }
}