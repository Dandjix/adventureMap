import { Helmet } from "../Creature/Items/Armor/Helmet"
import Nuke from "../Creature/Items/Weapon/Nuke"
import Pistol from "../Creature/Items/Weapon/Pistol"
import ShortSword from "../Creature/Items/Weapon/ShortSword"
import { Human } from "../Creature/Species/Human"
import { WorldDate } from "../util/WorldDate"
import { World } from "../World/World"
import Fight from "./Fight"
import Fighter from "./Fighter"
import { OneOnOneAttackTurn } from "./Turns/OneOnOneAttackTurn"
import FireAt from "./Turns/FireAt"
import BodyPart from "../Creature/BodyPart/BodyPart"
import { createCreatureName } from "../Creature/Naming/CreatureName"
import Random from "../../random/random"
import { Gauntlet } from "../Creature/Items/Armor/Gauntlet"

let world : World

beforeAll(()=>{
    world = new World("Noxus",new Date())
})

test('bob executes alice', () => { 
    const Alice = new Human("alice",WorldDate.now(world),"female")
    const Bob = new Human("bob",WorldDate.now(world),"male")

    expect(Bob.equip(new Pistol(world.materialIndex.materials["adamantine"],"right",1),"right hand")).toBe(true)

    expect(Alice.equip(new Helmet(world.materialIndex.materials["adamantine"],1))).toBe(true)

    const bobFuckingKillsAlice = new FireAt(new Fighter(Bob),"right hand",new Fighter(Alice),"head")
    const {recap} = bobFuckingKillsAlice.play()

    console.log("recap : ",recap);
 })

 test('just a regular fight',()=>{
    const Alice = new Human("alice",WorldDate.now(world),"female")
    const Bob = new Human("bob",WorldDate.now(world),"male")

    // expect(Bob.equip(new ShortSword(world.materialIndex.materials["steel"],1),"right hand")).toBe(true)
    // console.log("health of b head : "+Bob.bodyParts.find((bp)=>BodyPart.nameMatches(bp.getName(),"head"))?.health);
    // console.log("health of a head : "+Alice.bodyParts.find((bp)=>BodyPart.nameMatches(bp.getName(),"head"))?.health);

    expect(Alice.equip(new Helmet(world.materialIndex.materials["steel"],1))).toBe(true)

    const fight = new Fight([[new Fighter(Bob)],[new Fighter(Alice)]])
    fight.playAll()

    console.log(fight.recap);
    
 })

 test.only('nuke test, lmao',()=>{
    const Alice = new Human("alice",WorldDate.now(world),"female")
    const Bob = new Human("bob",WorldDate.now(world),"male")
    const Johnson = new Human("johnson",WorldDate.now(world),"male")

    expect(Bob.equip(new Nuke(world.materialIndex.materials["steel"],1),"right hand")).toBe(true)
    
    expect(Alice.equip(new Helmet(world.materialIndex.materials["steel"],1))).toBe(true)

    const fight = new Fight([[new Fighter(Bob)],[new Fighter(Alice)],[new Fighter(Johnson)]])

    fight.playAll()

    console.log(fight.recap);
    
    expect(fight.victors!.length).toBe(0)
 })

 test('full scale battle',()=>{
    const random = new Random()
    const side1 : Fighter[] = []
    const side2 : Fighter[] = []
    for (let i = 0; i < 10; i++) {
        const gender = random.random()<0.5 ? "male" : "female"
        const creature = new Human(createCreatureName(gender,random),WorldDate.now(world),gender)

        creature.equip(new Helmet(world.materialIndex.materials["steel"]))
        creature.equip(new Gauntlet(world.materialIndex.materials["steel"],"left"))
        creature.equip(new Gauntlet(world.materialIndex.materials["steel"],"right"))

        creature.equip(new ShortSword(world.materialIndex.materials["steel"]),"right hand")

        if(random.random()<0.5)
            side1.push(new Fighter(creature))
        else
            side2.push(new Fighter(creature))
        
    }

    const fight = new Fight([side1,side2])

    fight.playAll()

    console.log(fight.recap);
    
 })

 test('full scale battle with prisoners',()=>{
    const random = new Random()
    const side1 : Fighter[] = []
    const side2 : Fighter[] = []
    for (let i = 0; i < 100; i++) {
        const gender = random.random()<0.5 ? "male" : "female"
        const creature = new Human(createCreatureName(gender,random),WorldDate.now(world),gender)

        creature.equip(new Helmet(world.materialIndex.materials["steel"]))
        creature.equip(new Gauntlet(world.materialIndex.materials["steel"],"left"))
        creature.equip(new Gauntlet(world.materialIndex.materials["steel"],"right"))

        creature.equip(new ShortSword(world.materialIndex.materials["steel"]),"right hand")

        if(random.random()<0.1)
            side1.push(new Fighter(creature))
        else
            side2.push(new Fighter(creature))
        
    }

    const fight = new Fight([side1,side2])

    fight.playAll()

    console.log(fight.recap);
    
 })

//below are the tests for a method that is private

//  test('testing the minimums function',()=>{
//     const h1 = new Human("alice",WorldDate.now(world),"female")
//     const f1 = new Fighter(h1)
//     f1.cooldown = 0

//     const h2 = new Human("bob",WorldDate.now(world),"male")
//     const f2 = new Fighter(h2)
//     f2.cooldown = 0

//     const h3 = new Human("charly",WorldDate.now(world),"male")
//     const f3 = new Fighter(h3)
//     f3.cooldown = 2

//     const fighters : Fighter[] = [f1,f2,f3]

//     const mins = Fight.getMinimunCooldowns(fighters)
//     expect(mins[0]==mins[1]).toBeFalsy()

//     expect(mins[0].cooldown).toBe(0)
//     expect(mins[1].cooldown).toBe(0)
//  })

//  test('testing the minimums function : edge case : 0 elements',()=>{
//     const fighters : Fighter[] = []

//     const mins = Fight.getMinimunCooldowns(fighters)
//     expect(mins.length).toBe(0)
//  })

//  test('testing the minimums function : edge case : 1 elements',()=>{
//     const h1 = new Human("alice",WorldDate.now(world),"female")
//     const f1 = new Fighter(h1)
//     f1.cooldown = 0

//     const fighters : Fighter[] = [f1]

//     const mins = Fight.getMinimunCooldowns(fighters)
//     expect(mins.length).toBe(1)
//  })

//  test('testing the minimums function : edge case : 2 elements',()=>{
//     const h1 = new Human("alice",WorldDate.now(world),"female")
//     const f1 = new Fighter(h1)
//     f1.cooldown = 0

//     const h2 = new Human("bob",WorldDate.now(world),"male")
//     const f2 = new Fighter(h2)
//     f2.cooldown = 0

//     const fighters : Fighter[] = [f1,f2]

//     const mins = Fight.getMinimunCooldowns(fighters)
//     expect(mins.length).toBe(2)
//  })