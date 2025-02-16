import { WorldDate } from "../../util/WorldDate"
import { World } from "../../World/World"
import { Gauntlet } from "../Items/Armor/Gauntlet"
import { Helmet } from "../Items/Armor/Helmet"
import Pistol from "../Items/Weapon/Pistol"
import ShortSword from "../Items/Weapon/ShortSword"
import { Abomination } from "../Species/Abomination"
import { Human } from "../Species/Human"
import NumerousHand from "./NumerousHand"

let world : World

beforeAll(()=>
{
  world = new World(
    "Tropica",
    new Date()
)
})

test("equipping weapon",()=>
{
    const bob = new Human("bob",new WorldDate(0,world),"male")

    const shortSword1 = new ShortSword(world.materialIndex.materials["steel"])
    const shortSword2 = new ShortSword(world.materialIndex.materials["steel"])
    const shortSword3 = new ShortSword(world.materialIndex.materials["steel"])

    expect(bob.equip(shortSword1)).toBe(true)
    expect(bob.equip(shortSword2)).toBe(true)
    expect(bob.equip(shortSword3)).toBe(false)

    expect(bob.unEquipWeapon("right hand")).toBeDefined()

    expect(bob.unEquipArmor("right hand")).toBeUndefined()
})

test("equipping sided weapon (pistol)",()=>{
    const bob = new Human("bob",new WorldDate(0,world),"male")

    const g1 = new Pistol(world.materialIndex.materials["steel"],"left")
    const g2 = new Pistol(world.materialIndex.materials["steel"],"left")

    expect(bob.equip(g1)).toBe(true)
    expect(bob.equip(g2)).toBe(false)

    expect(bob.unEquipWeapon("left hand")).toBeDefined()

    expect(bob.unEquipWeapon("left hand")).toBeUndefined()
})

test("unequipping weapons",() =>{
    const bob = new Human("bob",new WorldDate(0,world),"male")

    const g1 = new Pistol(world.materialIndex.materials["steel"],"left")
    const g2 = new Pistol(world.materialIndex.materials["steel"],"left")

    expect(bob.equip(g1)).toBe(true)
    expect(bob.equip(g2)).toBe(false)

    expect(bob.unEquipWeapon("left hand")).toBeDefined()

    expect(bob.unEquipWeapon("left hand")).toBeUndefined()
})

test("equipping sided numerous weapon (pistol)",()=>{
    const bob = new Abomination("bob",new WorldDate(0,world),"male")

    for (let i = 0; i < bob.bodyParts.length; i++) {
        const hand = bob.bodyParts[i];
        if(hand instanceof NumerousHand && hand.side == "right")
            expect(bob.equip(new Pistol(world.materialIndex.materials["steel"],"right"),hand)).toBe(true)
    }

    expect(bob.unEquipWeapon("#0 right hand")).toBeDefined()

    expect(bob.unEquipWeapon("#0 right hand")).toBeUndefined()
})