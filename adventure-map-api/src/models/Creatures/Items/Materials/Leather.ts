import { Material } from "./Material";

export class Leather extends Material
{

    constructor(name : string, density : number, sharpnessMultiplier : number,valueMultiplier : number) {
        super(name,density,sharpnessMultiplier,valueMultiplier);
    }
}