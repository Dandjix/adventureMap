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

    constructor(creatureName : string, dateOfBirth : WorldDate, gender:"male"|"female",sexual_orientation:"heterosexual" | "homosexual" | "bisexual" | "asexual" = "heterosexual") {
        const bodyParts = [
            new Hand("left",75),
            new Hand("right",75),
            new Torso(100),
            new Head(66),
            new Leg("left",90),
            new Leg("right",90)
            ]
        
        super(creatureName,
            dateOfBirth,
            0,
            1,
            100,
            0.5,
            5,
            bodyParts,
            []);

        this.gender = gender
        this.sexual_orientation = sexual_orientation
    }
    gender: "male" | "female";
    sexual_orientation: "heterosexual" | "homosexual" | "bisexual" | "asexual";
}