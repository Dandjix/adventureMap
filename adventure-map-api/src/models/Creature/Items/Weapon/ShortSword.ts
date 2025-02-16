import { Material } from "../Materials/Material";
import Weapon from "./Weapon";

export default class ShortSword extends Weapon{
    getBaseCooldown(): number {
        throw new Error("Method not implemented.");
    }
    getBaseDamage(): number {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        return `${this.material.name} short sword`
    }
    /**
     *
     */
    constructor(material : Material,quality:number=0) {
        super(material,quality,["#side hand","#index #side hand"],["human","abomination"])
    }

    protected getWeightMultiplier(): number {
        return 1
    }
}