import { WorldDate } from "../../util/WorldDate";
import { World } from "../../World/World";
import Backpack from "../Items/Accessories/Backpack";
import { Ring } from "../Items/Accessories/Ring";
import { Abomination } from "./Abomination";
import { Human } from "./Human";

test("one backpack equipped, no other can be equipped", () => {

});

test("ring equip test", () => {
  const world = new World(
    "Tropica",
    new Date()
  )
  const bob = new Abomination("Bob",WorldDate.now(world),world,"male")

  let numberOfLeftHands = 0
  bob.bodyParts.forEach((bodyPart)=>{
    if(bodyPart.getName().includes("left hand"))
        numberOfLeftHands+=1
  })

  const rings = []
  for (let i = 0; i < numberOfLeftHands+1; i++) {
    rings.push(new Ring())
  }

  for (let i = 0; i < rings.length; i++) {
    const ring = rings[i];
    expect(bob.equipAccessory(ring,`#${i} left hand`)).toBe(i<numberOfLeftHands)
  }

});