import { Material } from "./Material";

export class Metal extends Material
{
    /**
     *
     */
    constructor(name : string, density : number, sharpnnessMultiplier : number) {
        super(name,density,sharpnnessMultiplier);
    }
}