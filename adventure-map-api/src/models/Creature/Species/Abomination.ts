import { WorldDate } from "../../util/WorldDate";
import { World } from "../../World/World";
import { Adventurer } from "../Adventurer";
import { BodyPart } from "../BodyParts/BodyPart";
import { Hand } from "../BodyParts/Hand";
import { Head } from "../BodyParts/Head";
import { NumerousHand } from "../BodyParts/NumerousHand";
import { Torso } from "../BodyParts/Torso";
import { Creature } from "../Creature";
import { GenderedCreature } from "../GenderedCreature";
import { Item } from "../Items/Item";

export class Abomination extends Creature implements GenderedCreature
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
            new Torso(1),
            new Head(0.66)
        ]

        for (let i = 0; i < 10; i++) {
            this.bodyParts.push(new NumerousHand("right",0.25,i))
            this.bodyParts.push(new NumerousHand("left",0.25,i))
        }


        this.stowedItems = []

        this.gender = gender
        this.sexual_orientation = sexual_orientation
    }
    gender: "male" | "female";
    sexual_orientation: "heterosexual" | "homosexual" | "bisexual" | "asexual";
}