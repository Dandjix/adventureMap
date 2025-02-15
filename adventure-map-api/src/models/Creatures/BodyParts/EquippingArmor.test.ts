import { WorldDate } from "../../util/WorldDate"
import { World } from "../../World/World"
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

    const helmet1 = new Helmet()
    const helmet2 = new Helmet()

    expect(bob.equip(helmet1)).toBe(true)
    expect(bob.equip(helmet2)).toBe(false)

    expect(bob.unEquipArmor("head")).toBeDefined()

    expect(bob.unEquipArmor("head")).toBeUndefined()
})