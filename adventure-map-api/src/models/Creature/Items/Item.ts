import { Material } from "./Materials/Material"

export abstract class Item
{
    /** 
     * from -1 to 1.
     * -1 means its shit, 0 means it's average, 1 means it is absolutely perfect (no matter the material)
    */
    public readonly quality : number

    public readonly material : Material

    /**
     *
     */
    constructor(material : Material,quality:number) {
        this.material = material
        this.quality = quality
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