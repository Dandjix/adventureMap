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
     *
     */
    constructor(name : string, density : number, sharpnessMultiplier : number) {
        this.name = name
        this.density = density
        this.sharpnessMultiplier = sharpnessMultiplier
    }
}