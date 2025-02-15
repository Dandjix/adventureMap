import { Material } from "./Material";

export class Leather extends Material
{

    constructor(name : string, desnsity : number, sharpnnessMultiplier : number) {
        super(name,desnsity,sharpnnessMultiplier);
    }
}