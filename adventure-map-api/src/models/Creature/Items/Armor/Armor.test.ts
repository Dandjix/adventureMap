import { World } from "../../../World/World"
import { Material } from "../Materials/Material"
import { Metal } from "../Materials/Metal"
import { Helmet } from "./Helmet"

let world : World
beforeAll(()=>{
    world = new World("Alphaville",new Date())
})

test('test damage deflection function unit test', () => { 
    const pointFiveMat = new Metal("pointFiveMat",1,1,1,0.5)

    const helmet1 = new Helmet(pointFiveMat,1)
    expect(helmet1.getDamageDeflected()).toBe(0.5)

    const helmet2 = new Helmet(pointFiveMat,-1)
    expect(helmet2.getDamageDeflected()).toBe(0)

    const helmet3 = new Helmet(pointFiveMat,0)
    expect(helmet3.getDamageDeflected()).toBe(0.25)

    const oneMat = new Metal("oneMat",1,1,1,1)

    const helmet4 = new Helmet(oneMat,1)
    expect(helmet4.getDamageDeflected()).toBe(1)

    const helmet5 = new Helmet(oneMat,-1)
    expect(helmet5.getDamageDeflected()).toBe(0)

    const helmet6 = new Helmet(oneMat,0)
    expect(helmet6.getDamageDeflected()).toBe(0.5)
 })