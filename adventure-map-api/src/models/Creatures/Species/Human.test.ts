import { WorldDate } from "../../util/WorldDate";
import { World } from "../../World/World";
import Backpack from "../Items/Accessories/Backpack";
import { Ring } from "../Items/Accessories/Ring";
import { Human } from "./Human";

let world : World

beforeAll(()=>
{
  world = new World(
    "Tropica",
    new Date()
)
})

test("one backpack equipped, no other can be equipped", () => {



  const bob = new Human("Bob",WorldDate.now(world),world,"male")
  const backpack1 = new Backpack(10)
  const backpack2 = new Backpack(10)

  expect(bob.equip(backpack1)).toBe(true)
  expect(bob.equip(backpack2)).toBe(false)
});

test("ring equip test", () => {
  const bob = new Human("Bob",WorldDate.now(world),world,"male")

  const rings = []
  for (let i = 0; i < 11; i++) {
    rings.push(new Ring())
  }

  for (let i = 0; i < rings.length; i++) {
    expect(bob.equip(rings[i])).toBe(i<10)//the first ten are ok, the eleventh is false
  }

  for (let i = 0; i < 5; i++) {
    expect(bob.unEquipAccessory("left hand",0)).toBeDefined()
  }
  expect(bob.unEquipAccessory("left hand",0)).toBeUndefined()
});