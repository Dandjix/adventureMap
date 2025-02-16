export abstract class Material
{
    /**
     * this is the unique id of the material
     */
    readonly name : string
    /**
     * water is 1 kg/liter or g/cc
     */
    readonly density : number
    /**
     * a sharp weapon made from this material has its damage multiplied by the material sharpness
     */
    readonly sharpnessMultiplier : number


    /**
     * gold is more valuable than steel. This is the price in €/kg
     */
    readonly valueMultiplier : number

    /**
     * from 0 to 1, 0 means it deflects no damage, 1 means it deflects all damage
     */
    readonly protection : number
    /**
     *
     */
    constructor(name : string, density : number, sharpnessMultiplier : number, valueMultiplier : number,protection : number) {
        this.name = name
        this.density = density
        this.sharpnessMultiplier = sharpnessMultiplier
        this.valueMultiplier = valueMultiplier
        this.protection = protection
    }
}