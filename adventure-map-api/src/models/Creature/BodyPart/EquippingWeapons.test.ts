import { WorldDate } from "../../util/WorldDate"
import { World } from "../../World/World"
import { Gauntlet } from "../Items/Armor/Gauntlet"
import { Helmet } from "../Items/Armor/Helmet"
import Pistol from "../Items/Weapon/Pistol"
import ShortSword from "../Items/Weapon/ShortSword"
import { Human } from "../Species/Human"

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