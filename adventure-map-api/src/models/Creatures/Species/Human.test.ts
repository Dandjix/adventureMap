import { WorldDate } from "../../util/WorldDate";
import { World } from "../../World/World";
import Backpack from "../Items/Accessories/Backpack";
import { Ring } from "../Items/Accessories/Ring";
import { Abomination } from "./Abomination";
import { Human } from "./Human";

test("one backpack equipped, no other can be equipped", () => {
    const world = new World(
      "Tropica",
      new Date()
  )


  const bob = new Abomination("Bob",WorldDate.now(world),world,"male")
  const backpack1 = new Backpack(10)
  const backpack2 = new Backpack(10)

  expect(bob.equip(backpack1)).toBe(true)
  expect(bob.equip(backpack2)).toBe(false)
});