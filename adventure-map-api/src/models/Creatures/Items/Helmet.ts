import { Head } from "../BodyParts/Head";
import { Human } from "../Human";
import { ArmorPiece } from "./ArmorPiece";

class Helmet extends ArmorPiece<[Head],[Human]> {
    getName(): string {
        return "Helmet"
    }
    getWeight(): number {
        return 3
    }

}