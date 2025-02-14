import { WorldDate } from "../util/WorldDate";
import { World } from "../World/World";
import { Adventurer } from "./Adventurer";
import { BodyPart } from "./BodyParts/BodyPart";
import { Hand } from "./BodyParts/Hand";
import { Head } from "./BodyParts/Head";
import { Torso } from "./BodyParts/Torso";
import { GenderedCreature } from "./GenderedCreature";
import { Accessory } from "./Items/Accessories/Accessory";
import { ArmorPiece } from "./Items/Armor/ArmorPiece";
import { Item } from "./Items/Item";
import { Weapon } from "./Items/Weapon";

export class Human extends Adventurer implements GenderedCreature
{
    getSpeciesName(): string {
        return "human"
    }
    stowedItems: Item[];

    naturalAttractiveness: number;
    naturalSpeed: number;
    naturalHealth: number;
    naturalBerserk: number;
    naturalStrength: number;
    bodyParts: BodyPart[];
    /**
     *
     */
    constructor(creature_name : string, date_of_birth : WorldDate, world : World,gender:"male"|"female",sexual_orientation:"heterosexual" | "homosexual" | "bisexual" | "asexual" = "heterosexual") {
        super(creature_name,date_of_birth,world);
        this.naturalSpeed = 100
        this.naturalHealth = 100
        this.naturalBerserk = 0.5
        this.naturalStrength = 100
        this.naturalAttractiveness = 0
        this.bodyParts = [
            new Hand("left",0.75),
            new Hand("right",0.75),
            new Torso(1),
            new Head(0.66)
        ]
        this.stowedItems = []

        this.gender = gender
        this.sexual_orientation = sexual_orientation
    }
    gender: "male" | "female";
    sexual_orientation: "heterosexual" | "homosexual" | "bisexual" | "asexual";
}