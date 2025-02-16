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

    constructor(creature_name : string, date_of_birth : WorldDate, gender:"male"|"female",sexual_orientation:"heterosexual" | "homosexual" | "bisexual" | "asexual" = "heterosexual") {
        const bodyParts = [
            new Hand("left",0.75),
            new Hand("right",0.75),
            new Torso(1),
            new Head(0.66),
            new Leg("left",0.9),
            new Leg("right",0.9)
            ]
        
        super(creature_name,
            date_of_birth,
            0,
            100,
            100,
            0.5,
            100,
            bodyParts,
            []);

        this.gender = gender
        this.sexual_orientation = sexual_orientation
    }
    gender: "male" | "female";
    sexual_orientation: "heterosexual" | "homosexual" | "bisexual" | "asexual";
}