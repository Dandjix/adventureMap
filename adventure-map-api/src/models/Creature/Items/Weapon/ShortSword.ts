import { Material } from "../Materials/Material";
import Weapon from "./Weapon";

export default class ShortSword extends Weapon{
    getBaseCooldown(): number {
        return 10
    }
    getBaseDamage(): number {
        return this.material.sharpnessMultiplier*(this.quality+2)*5
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