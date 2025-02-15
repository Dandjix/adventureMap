import { WorldDate } from "../../util/WorldDate"
import { World } from "../../World/World"
import { Gauntlet } from "../Items/Armor/Gauntlet"
import { Helmet } from "../Items/Armor/Helmet"
import { Human } from "../Species/Human"

let world : World

beforeAll(()=>
{
  world = new World(
    "Tropica",
    new Date()
)
})

test("equipping armor",()=>
{
    const bob = new Human("bob",new WorldDate(0,world),world,"male")

    const helmet1 = new Helmet(world.materialIndex.materials["gold"])
    const helmet2 = new Helmet(world.materialIndex.materials["steel"])

    expect(bob.equip(helmet1)).toBe(true)
    expect(bob.equip(helmet2)).toBe(false)

    expect(bob.unEquipArmor("head")).toBeDefined()

    expect(bob.unEquipArmor("head")).toBeUndefined()
})

test("equipping sided armor (gauntlets)",()=>{
    const bob = new Human("bob",new WorldDate(0,world),world,"male")

    const g1 = new Gauntlet(world.materialIndex.materials["steel"],"left")
    const g2 = new Gauntlet(world.materialIndex.materials["steel"],"left")

    expect(bob.equip(g1)).toBe(true)
    expect(bob.equip(g2)).toBe(false)

    expect(bob.unEquipArmor("left hand")).toBeDefined()

    expect(bob.unEquipArmor("left hand")).toBeUndefined()
})