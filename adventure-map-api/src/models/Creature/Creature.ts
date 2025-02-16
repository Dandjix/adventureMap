import { Schema, model, Document } from 'mongoose';

import { WorldDate } from '../util/WorldDate';
import BodyPart from './BodyPart/BodyPart';
import { Item } from './Items/Item';
import { Weapon } from './Items/Weapon';
import { ArmorPiece } from './Items/Armor/ArmorPiece';
import { Accessory } from './Items/Accessories/Accessory';
import { World } from '../World/World';
import { getQualificator } from './BodyPart/NumerousBodyPart';

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

    public equip(item : ArmorPiece|Accessory): boolean
    {
        if(item instanceof ArmorPiece)
            return this.equipArmorInternal(item)

        return this.equipAccessoryInternal(item)
    }

    private equipArmorInternal(armorPieceToEquip:ArmorPiece) : boolean
    {
        if(!armorPieceToEquip.creatures.includes(this.getSpeciesName())){
            return false
        }


        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];

            if(
                BodyPart.bodyPartIncludes(armorPieceToEquip.bodyParts,bodyPart.getName()) 
                &&!bodyPart.isMissing()
                &&!bodyPart.armorPiece)
            {

                bodyPart.armorPiece = armorPieceToEquip
                return true
            }
            
        }

        return false
    }

    private equipAccessoryInternal(accessoryToEquip:Accessory) : boolean
    {
        if(!accessoryToEquip.species.includes(this.getSpeciesName()))
        {
            // console.log("wrong species");
            
            return false
        }


        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];
            
            // console.log(JSON.stringify(bodyPart));
            // console.log(bodyPart.getName());
            
            // console.log(accessoryToEquip.bodyParts.includes(bodyPart.getName())
            // ,!bodyPart.isMissing()
            // ,!(bodyPart.accessories.length>=bodyPart.getNumberOfEquipableAccessories()));
            
            // console.log();
            

            if(
                BodyPart.bodyPartIncludes(accessoryToEquip.bodyParts,bodyPart.getName())
                &&!bodyPart.isMissing()
                &&!(bodyPart.accessories.length>=bodyPart.getNumberOfEquipableAccessories()))
            {
                bodyPart.accessories.push(accessoryToEquip)
                
                return true
            }
        }
        return false
    }

    public equipAccessory(accessoryToEquip:Accessory,bodyPartName:string)
    {
        if(!accessoryToEquip.species.includes(this.getSpeciesName()))
        {
            return false
        }

        //this is code that determines the qualificator of a numerous body part special string (ie #2 left hand => 2nd left hand)
        const numerousRegexp = /#(\d+)/.exec(bodyPartName);
        if(
            numerousRegexp && numerousRegexp.length>1){
            const index = parseInt(numerousRegexp[1])
            const qualification = getQualificator(index)
            

            bodyPartName = bodyPartName.replace(/#(\d+)/, (_, num) => qualification);
        }
        



        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];
            // console.log("values : ",
            //     "bpn ",bodyPartName,bodyPart.getName(),
            //     "matches : ",bodyPart.getName()==bodyPartName,
            //     "bodyPartIncludes ",bodyPartIncludes(accessoryToEquip.bodyParts,bodyPart.getName()),
            //     "missing ",bodyPart.isMissing(),
            //     "too many acc : ",bodyPart.accessories.length>=bodyPart.getNumberOfEquipableAccessories()
            // );
            
            if(
                bodyPartName == bodyPart.getName()
                && BodyPart.bodyPartIncludes(accessoryToEquip.bodyParts,bodyPart.getName())
                &&!bodyPart.isMissing()
                &&!(bodyPart.accessories.length>=bodyPart.getNumberOfEquipableAccessories()))
            {
                bodyPart.accessories.push(accessoryToEquip)
                
                return true
            }
        }
        return false
    }

    public unEquipArmor(bodyPartToUnequip : string)
    {
        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];
            if(bodyPart.getName()==bodyPartToUnequip && bodyPart.armorPiece)
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
}