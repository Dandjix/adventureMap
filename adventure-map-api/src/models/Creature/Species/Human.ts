import { WorldDate } from "../../util/WorldDate";
import { World } from "../../World/World";
import { Adventurer } from "../Adventurer";
import BodyPart from "../BodyPart/BodyPart";
import { Hand } from "../BodyPart/Hand";
import { Head } from "../BodyPart/Head";
import { Leg } from "../BodyPart/Leg";
import { Torso } from "../BodyPart/Torso";
import { Creature } from "../Creature";
import { GenderedCreature } from "../GenderedCreature";
import { Item } from "../Items/Item";

export class Human extends Creature implements GenderedCreature, Adventurer
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
    constructor(creature_name : string, date_of_birth : WorldDate, gender:"male"|"female",sexual_orientation:"heterosexual" | "homosexual" | "bisexual" | "asexual" = "heterosexual") {
        super(creature_name,date_of_birth);
        this.naturalSpeed = 100
        this.naturalHealth = 100
        this.naturalBerserk = 0.5
        this.naturalStrength = 100
        this.naturalAttractiveness = 0
        this.bodyParts = [
            new Hand("left",0.75),
            new Hand("right",0.75),
            new Torso(1),
            new Head(0.66),
            new Leg("left",0.9),
            new Leg("right",0.9)
        ]
        this.stowedItems = []

        this.gender = gender
        this.sexual_orientation = sexual_orientation
    }
    gender: "male" | "female";
    sexual_orientation: "heterosexual" | "homosexual" | "bisexual" | "asexual";
}