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
import { clamp } from '../../util/clamp';
import { createCreatureName } from './Naming/CreatureName';
import Personality from './Personalities/Personality';
import Random from '../../random/random';

export abstract class Creature
{
    creatureName:string
    dateOfBirth:WorldDate

    /**
     * the higher this is, the more inhabitants of the world will find the creature beautifull. 
     * Can be negative to denote a creature that is freaky or frightfull.
     * Regular humans start at 0, orcs at -100, unspeakable horrors at -1000, elves at 250, dwarves at 0
     */
    naturalAttractiveness : number

    //fight attributes
    naturalSpeed : number
    /**
     * this is the maximum health of the creature
     */
    naturalHealth : number

    private _health : number


    private _isAlive : boolean

    /** 
     * determines how easily this creature will surrender -> 0 : instant surrender, 1 -> never surrender
     */
    courage : number

    /**
     * determines the depth of the fight computations : 0 -> random moves, 1 -> maximum reasonable computations
     */
    intelligence : number

    /**
     * A honor of 0 means the creature will target weak ennemies. A honor of 1 means it will target strong ennemies.
     */
    honor : number

    personality : Personality
    /**
     * when this is set to false, the creature is a corpse. The undead that are not defeated also have this on true.
     */
    public get isAlive()
    {
        return this._isAlive
    }
    /**
     * this is the current health of the creature.
     */
    public set health(newHealth : number)
    {
        this._health = clamp(newHealth,0,this.naturalHealth)
        this._isAlive = this._health > 0
    }

    public get health()
    {
        return this._health
    }

    public get healthPercentage()
    {
        return this.naturalHealth/this.health
    }

    /**
     * unequips all armor, weapons, accessories and stowed items of a creature
     * @returns all the unequipped items of the creature
     */
    public strip() : Item[]
    {
        const items : Item[] = [...this.stowedItems]
        this.bodyParts.forEach(bodyPart => {
            bodyPart.accessories.forEach(accessory => {
                items.push(accessory)
            });
            bodyPart.accessories = []
            if(bodyPart.weapon)
            {
                items.push(bodyPart.weapon)
                bodyPart.weapon = undefined
            }
            if(bodyPart.armorPiece)
            {
                items.push(bodyPart.armorPiece)
                bodyPart.armorPiece = undefined
            }
        });
        return items
    }

    /** 
     * a creature that is on the edge of death will be very tired. Unless they have a high berserk attribute.
     */
    public get stamina()
    {

        return Math.max(this.healthPercentage + this.naturalBerserk - (this.healthPercentage*this.naturalBerserk),0)
    }

    /**
     * this ranges from 0 to 1 (and possibly beyond but wtf). 
     * 0 means that at 0 natural_health, this creatures natural_strength becomes 0, 
     * 1 means it stays at 1, 2 means it gets to 2
     */
    naturalBerserk : number 
    naturalStrength : number

    bodyParts : BodyPart[]

    stowedItems : Item[]

    /**
     * This is NOT the first or last name of the creature. This is the name of the species, for example new Human("Bob").getSpeciesName() returns "human"
     */
    abstract getSpeciesName() : string

    constructor(
        creatureName : string|undefined = undefined,
        dateOfBirth :WorldDate,
        naturalAttractiveness:number,
        naturalSpeed : number,
        naturalHealth : number,
        naturalBerserk : number,
        naturalStrength : number,
        courage : number,
        intelligence : number,
        honor : number,
        bodyParts : BodyPart[],
        stowedItems : Item[],
        personality? : Personality,
        random? : Random
    ) {
        this._isAlive = true

        this.creatureName = creatureName ?? createCreatureName()
        this.personality = personality ?? new Personality()

        this.dateOfBirth = dateOfBirth

        this.naturalAttractiveness = naturalAttractiveness
        this.naturalSpeed = naturalSpeed
        this.naturalHealth = naturalHealth
        this._health = naturalHealth
        this.naturalBerserk = naturalBerserk
        this.naturalStrength = naturalStrength
        this.courage = courage
        this.intelligence = intelligence
        this.honor = honor

        this.bodyParts = bodyParts
        this.stowedItems = stowedItems
    }

    private firstSuitableBodyPartFor(item : ArmorPiece|Accessory|Weapon) : BodyPart | false
    {
        for (let i = 0; i < this.bodyParts.length; i++) {
            const bodyPart = this.bodyParts[i];
            if(
                BodyPart.bodyPartIncludes(item.bodyParts,bodyPart.getName())
                &&!bodyPart.isMissing
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
        &&!bodyPart.isMissing
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