import { Schema, model, Document } from 'mongoose';

import { WorldDate } from '../util/WorldDate';
import BodyPart from './BodyPart/BodyPart';
import { Item } from './Items/Item';
import Weapon from './Items/Weapon/Weapon';
import { ArmorPiece } from './Items/Armor/ArmorPiece';
import { Accessory } from './Items/Accessories/Accessory';
import { World } from '../World/World';
import { getQualificator } from './BodyPart/NumerousBodyPart';
import { Helmet } from './Items/Armor/Helmet';
import { Material } from './Items/Materials/Material';
import { Metal } from './Items/Materials/Metal';

export abstract class Creature
{
    creatureName:string
    dateOfBirth:WorldDate

    /**
     * the higher this is, the more inhabitants of the world will find the creature beautifull. 
     * Can be negative to denote a creature that is freaky or frightfull.
     * Regular humans start at 0, orcs at -100, unspeakable horrors at -1000, elves at 250, dwarves at 0
     */
    abstract naturalAttractiveness : number

    //fight attributes
    abstract naturalSpeed : number
    abstract naturalHealth : number
    /**
     * this ranges from 0 to 1 (and possibly beyond but wtf). 
     * 0 means that at 0 natural_health, this creatures natural_strength becomes 0, 
     * 1 means it stays at 1, 2 means it gets to 2
     */
    abstract naturalBerserk : number 
    abstract naturalStrength : number

    abstract bodyParts : BodyPart[]

    abstract stowedItems : Item[]

    /**
     * This is NOT the first or last name of the creature. This is the name of the species, for example new Human("Bob").getSpeciesName() returns "human"
     */
    abstract getSpeciesName() : string

    constructor(creature_name : string, date_of_birth :WorldDate) {
        this.creatureName = creature_name
        this.dateOfBirth = date_of_birth
    }

    private firstSuitableBodyPartFor(item : ArmorPiece|Accessory|Weapon) : BodyPart | false
    {
        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];
            if(
                BodyPart.bodyPartIncludes(item.bodyParts,bodyPart.getName())
                &&!bodyPart.isMissing()
                &&(!(item instanceof Accessory) || (bodyPart.accessories.length<bodyPart.getNumberOfEquipableAccessories()))
                &&(!(item instanceof Weapon) || !(bodyPart.weapon))
                &&(!(item instanceof ArmorPiece) || !(bodyPart.armorPiece))
                )
            return bodyPart
        }
        return false
    }

    public equip(item : ArmorPiece|Accessory|Weapon, bodyPart : string | BodyPart | undefined = undefined): boolean
    {
        if(!item.creatures.includes(this.getSpeciesName()))
        {
            return false
        }

        if(typeof bodyPart == "string")
        {
            const result = BodyPart.find(this.bodyParts,bodyPart)
            if (result === undefined)
                return false
            bodyPart = result
        }
        else if(bodyPart == undefined)
        {
            const result = this.firstSuitableBodyPartFor(item)
            if (result === false)
                return false
            bodyPart = result
        }

        if(!(BodyPart.bodyPartIncludes(item.bodyParts,bodyPart.getName())
        &&!bodyPart.isMissing()
        &&(!(item instanceof Accessory) || (bodyPart.accessories.length<bodyPart.getNumberOfEquipableAccessories()))
        &&(!(item instanceof Weapon) || !(bodyPart.weapon))
        &&(!(item instanceof ArmorPiece) || !(bodyPart.armorPiece))))
            return false

        if(item instanceof Accessory)
            bodyPart.accessories.push(item)

        else if(item instanceof ArmorPiece)
            bodyPart.armorPiece = item

        else //if (item instanceof Weapon)
            bodyPart.weapon = item
        
        return true
    }

    public unEquipArmor(bodyPartToUnequip : string)
    {
        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];
            if(BodyPart.nameMatches(bodyPart.getName(),bodyPartToUnequip) && bodyPart.armorPiece)
            {
                const armorPiece = bodyPart.armorPiece
                bodyPart.armorPiece = undefined
                return armorPiece
            }
        }
        return undefined
    }

    public unEquipAccessory(bodyPartToUnequip : string, index : number)
    {
        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];
            if(BodyPart.nameMatches(bodyPart.getName(),bodyPartToUnequip) && bodyPart.accessories.length>index)
            {
                const accessory = bodyPart.accessories[index]
                bodyPart.accessories.splice(index,1)
                return accessory
            }
        }
        return undefined
    }

    public unEquipWeapon(bodyPartToUnequip : string)
    {
        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];
            if(BodyPart.nameMatches(bodyPart.getName(),bodyPartToUnequip) && bodyPart.weapon)
            {
                const weapon = bodyPart.weapon
                bodyPart.weapon = undefined
                return weapon
            }
        }
        return undefined
    }
}