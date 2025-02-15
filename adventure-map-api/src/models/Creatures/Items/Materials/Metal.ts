import { Material } from "./Material";

export class Metal extends Material
{
    constructor(name : string, density : number, sharpnessMultiplier : number,valueMultiplier : number) {
        super(name,density,sharpnessMultiplier,valueMultiplier);
    }
}