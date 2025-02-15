import { Material } from "./Material";

export class Liquid extends Material
{

    /**
     *
     */
    constructor(name : string,density : number, sharpnnessMultiplier : number) {
        super(name,density,sharpnnessMultiplier);
    }
}