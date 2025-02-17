import { WorldDate } from "../../util/WorldDate";
import { World } from "../../World/World";
import { Adventurer } from "../Adventurer";
import BodyPart from "../BodyPart/BodyPart";
import { Hand } from "../BodyPart/Hand";
import { Head } from "../BodyPart/Head";
import NumerousHand from "../BodyPart/NumerousHand";
import { Torso } from "../BodyPart/Torso";
import { Creature } from "../Creature";
import { GenderedCreature } from "../GenderedCreature";
import { Item } from "../Items/Item";

export class Abomination extends Creature implements GenderedCreature
{
    getSpeciesName(): string {
        return "abomination"
    }

    constructor(creature_name : string, date_of_birth : WorldDate,gender:"male"|"female",sexual_orientation:"heterosexual" | "homosexual" | "bisexual" | "asexual" = "heterosexual") {
        const bodyParts = [
            new Torso(1),
            new Head(66)
        ]
        for (let i = 0; i < 10; i++) {
            bodyParts.push(new NumerousHand("right",25,i))
            bodyParts.push(new NumerousHand("left",25,i))
        }
        
        super(creature_name,
            date_of_birth,
            -100,
            100,
            1,
            0.5,
            10,
            bodyParts,
            []);

        this.gender = gender
        this.sexual_orientation = sexual_orientation
    }
    gender: "male" | "female";
    sexual_orientation: "heterosexual" | "homosexual" | "bisexual" | "asexual";
}