export abstract class Item
{
    abstract getName():string

    /**
     * in kilograms, default reference material is steel.
     */
    abstract getWeight():number
}