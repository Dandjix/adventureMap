import { Material } from "./Materials/Material"

export abstract class Item
{


    public readonly material : Material

    /**
     *
     */
    constructor(material : Material) {
        this.material = material
        
    }

    abstract getName():string
    /**
     * in kilograms, default reference material is steel.
     */
    protected abstract getWeightMultiplier():number

    public getWeight()
    {
        return this.getWeightMultiplier()*this.material.density
    } 
}