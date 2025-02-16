import { Material } from "../Materials/Material";
import Weapon from "./Weapon";

export default class Nuke extends Weapon{
    getBaseCooldown(): number {
        return 10
    }
    getBaseDamage(): number {
        return 999999
    }
    getName(): string {
        return `${this.material.name} nuke`
    }

    constructor(material : Material,quality:number=0) {
        super(material,quality,["#side hand","#index #side hand"],["human","abomination"])
    }

    protected getWeightMultiplier(): number {
        return 10
    }
}