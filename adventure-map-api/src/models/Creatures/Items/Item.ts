export abstract class Item
{


    public readonly materialName : string

    /**
     *
     */
    constructor(materialName : string) {
        this.materialName = materialName
        
    }

    abstract getName():string
    /**
     * in kilograms, default reference material is steel.
     */
    abstract getWeightMultiplier():number

    public getWeight()
    {
        return this.getWeightMultiplier()
    } 
}