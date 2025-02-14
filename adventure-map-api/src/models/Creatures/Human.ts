import { WorldDate } from "../util/WorldDate";
import { World } from "../World/World";
import { Adventurer } from "./Adventurer";
import { BodyPart } from "./BodyParts/BodyPart";
import { Hand } from "./BodyParts/Hand";
import { Head } from "./BodyParts/Head";
import { Torso } from "./BodyParts/Torso";
import { GenderedCreature } from "./GenderedCreature";
import { Accessory } from "./Items/Accessory/Accessory";
import { ArmorPiece } from "./Items/ArmorPiece";
import { Item } from "./Items/Item";
import { Weapon } from "./Items/Weapon";

export class Human extends Adventurer implements GenderedCreature
{
    stowedItems: Item[];

    natural_attractiveness: number;
    natural_speed: number;
    natural_health: number;
    natural_berserk: number;
    natural_strength: number;
    body_parts: BodyPart[];
    /**
     *
     */
    constructor(creature_name : string, date_of_birth : WorldDate, world : World,gender:"Male"|"Female",sexual_orientation:"Heterosexual" | "Homosexual" | "Bisexual" | "Asexual" = "Heterosexual") {
        super(creature_name,date_of_birth,world);
        this.natural_speed = 100
        this.natural_health = 100
        this.natural_berserk = 0.5
        this.natural_strength = 100
        this.natural_attractiveness = 0
        this.body_parts = [
            new Hand("Left",0.75),
            new Hand("Right",0.75),
            new Torso(1),
            new Head(0.66)
        ]
        this.stowedItems = []

        this.gender = gender
        this.sexual_orientation = sexual_orientation
    }
    gender: "Male" | "Female";
    sexual_orientation: "Heterosexual" | "Homosexual" | "Bisexual" | "Asexual";
}