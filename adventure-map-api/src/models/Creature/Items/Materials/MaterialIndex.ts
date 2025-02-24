import { Leather } from "./Leather"
import { Liquid } from "./Liquid"
import { Material } from "./Material"
import { Metal } from "./Metal"

export class MaterialIndex
{
    public Add(material : Material)
    {
        if(!!this.materials[material.name])
            throw new Error("material already exists")
        
        this.materials[material.name] = material
    }
    public readonly materials :{[id:string] : Material} = {}

    public static createDefaultMaterialIndex()
    {
        const index = new MaterialIndex()
        index.Add(new Liquid("water",1,0,10,0))
        index.Add(new Metal("adamantine",8,1,300,0.95))
        index.Add(new Metal("steel",8,1,300,0.75))
        index.Add(new Metal("lead",11.3,0.5,100,0.5))
        index.Add(new Metal("gold",19.3,0.5,1000,0.25))
        index.Add(new Leather("cow leather",1,0.1,50,0.1))
        return index
    }
}