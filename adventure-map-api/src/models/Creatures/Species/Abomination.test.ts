import { WorldDate } from "../../util/WorldDate";
import { World } from "../../World/World";
import Backpack from "../Items/Accessories/Backpack";
import { Ring } from "../Items/Accessories/Ring";


import { Adventurer } from "../Adventurer";
import { BodyPart } from "../BodyParts/BodyPart";
import { Hand } from "../BodyParts/Hand";
import { Head } from "../BodyParts/Head";
import { NumerousHand } from "../BodyParts/NumerousHand";
import { Torso } from "../BodyParts/Torso";
import { Creature } from "../Creature";
import { GenderedCreature } from "../GenderedCreature";
import { Item } from "../Items/Item";
import { Abomination } from "./Abomination";

let world : World
beforeAll(()=>{
    world = new World(
        "Tropica",
        new Date()
      )
})

test("ring equip test", () => {

  const bob = new Abomination("Bob",WorldDate.now(world),world,"male")

  let numberOfLeftHands = 0
  bob.bodyParts.forEach((bodyPart)=>{
    if(bodyPart.getName().includes("left hand"))
        numberOfLeftHands+=1
  })

  const rings = []
  for (let i = 0; i < numberOfLeftHands*5+1; i++) {
      rings.push(new Ring())
  }

  for (let i = 0; i < numberOfLeftHands; i++) {
    for (let j = 0; j < 5; j++) {
      const ring = rings[i*5+j];
      expect(bob.equipAccessory(ring,`#${i} left hand`)).toBe(true)
    }
  }
  expect(bob.equipAccessory(new Ring(),`#0 left hand`)).toBe(false)
});

test("ring unequip test", () => {

  const bob = new Abomination("Bob",WorldDate.now(world),world,"male")

  const rings = []
  for (let i = 0; i < 5; i++) {
      rings.push(new Ring())
  }

  for (let i = 0; i < 5; i++) {
      const ring = rings[i];
      expect(bob.equipAccessory(ring,`#3 left hand`)).toBe(true)
  }
  expect(bob.equipAccessory(new Ring(),`#3 left hand`)).toBe(false)

  for (let i = 0; i < 5; i++) {
    console.log(`unequipping ${i}`);
    expect(bob.unEquipAccessory(`#3 left hand`,0)).toBeDefined()
  }
  expect(bob.unEquipAccessory(`#3 left hand`,0)).toBeUndefined()
});