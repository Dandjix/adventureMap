import { Material } from "./Material";

export class Liquid extends Material
{

    constructor(name : string, density : number, sharpnessMultiplier : number,valueMultiplier : number,protection : number) {
        super(name,density,sharpnessMultiplier,valueMultiplier,protection);
    }
}