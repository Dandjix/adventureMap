import { Schema, model, Document } from 'mongoose';

import { WorldDate } from '../util/WorldDate';
import { BodyPart } from './BodyParts/BodyPart';
import { Item } from './Items/Item';
import { Weapon } from './Items/Weapon';
import { ArmorPiece } from './Items/ArmorPiece';
import { Accessory } from './Items/Accessory/Accessory';
import { World } from '../World/World';

export abstract class Creature
{
    creature_name:string
    date_of_birth:WorldDate

    /**
     * the higher this is, the more inhabitants of the world will find the creature beautifull. 
     * Can be negative to denote a creature that is freaky or frightfull.
     * Regular humans start at 0, orcs at -100, unspeakable horrors at -1000, elves at 250, dwarves at 0
     */
    abstract natural_attractiveness : number

    //fight attributes
    abstract natural_speed : number
    abstract natural_health : number
    /**
     * this ranges from 0 to 1 (and possibly beyond but wtf). 
     * 0 means that at 0 natural_health, this creatures natural_strength becomes 0, 
     * 1 means it stays at 1, 2 means it gets to 2
     */
    abstract natural_berserk : number 
    abstract natural_strength : number

    abstract body_parts : BodyPart[]

    abstract stowedItems : Item[]

    constructor(creature_name : string, date_of_birth :WorldDate, world : World) {
        this.creature_name = creature_name
        this.date_of_birth = date_of_birth
        world.creatures.push(this)
    }
}