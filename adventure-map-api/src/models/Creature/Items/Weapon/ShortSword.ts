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
    protected getWeightMultiplier(): number {
        return 1
    }
}