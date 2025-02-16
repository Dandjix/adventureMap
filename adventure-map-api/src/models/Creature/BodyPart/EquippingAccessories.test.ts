import { WorldDate } from "../../util/WorldDate";
import { World } from "../../World/World";
import Backpack from "../Items/Accessories/Backpack";
import { Ring } from "../Items/Accessories/Ring";
import { Abomination } from "../Species/Abomination";
import { Human } from "../Species/Human";

let world : World

beforeAll(()=>
{
  world = new World(
    "Tropica",
    new Date()
)
})

test("human one backpack equipped, no other can be equipped", () => {



  const bob = new Human("Bob",WorldDate.now(world),"male")
  const backpack1 = new Backpack(world.materialIndex.materials["cow leather"],10)
  const backpack2 = new Backpack(world.materialIndex.materials["cow leather"],10)

  expect(bob.equip(backpack1)).toBe(true)
  expect(bob.equip(backpack2)).toBe(false)
});

test("human ring equip test", () => {
  const bob = new Human("Bob",WorldDate.now(world),"male")

  const rings = []
  for (let i = 0; i < 11; i++) {
    rings.push(new Ring(world.materialIndex.materials["gold"]))
  }

  for (let i = 0; i < rings.length; i++) {
    // console.log("equipping ",i," ring");
    
    expect(bob.equip(rings[i])).toBe(i<10)//the first ten are ok, the eleventh is false
  }

  for (let i = 0; i < 5; i++) {    
    expect(bob.unEquipAccessory("left hand",0)).toBeDefined()
  }
  expect(bob.unEquipAccessory("left hand",0)).toBeUndefined()
});

//abomination --

test("abomination ring equip test", () => {

  const bob = new Abomination("Bob",WorldDate.now(world),"male")

  let numberOfLeftHands = 0
  bob.bodyParts.forEach((bodyPart)=>{
    if(bodyPart.getName().includes("left hand"))
        numberOfLeftHands+=1
  })

  const rings = []
  for (let i = 0; i < numberOfLeftHands*5+1; i++) {
      rings.push(new Ring(world.materialIndex.materials["gold"]))
  }

  for (let i = 0; i < numberOfLeftHands; i++) {
    for (let j = 0; j < 5; j++) {
      const ring = rings[i*5+j];
      expect(bob.equipAccessory(ring,`#${i} left hand`)).toBe(true)
    }
  }
  expect(bob.equipAccessory(new Ring(world.materialIndex.materials["gold"]),`#0 left hand`)).toBe(false)
});

test("abomination unequip test", () => {

  const bob = new Abomination("Bob",WorldDate.now(world),"male")

  const rings = []
  for (let i = 0; i < 5; i++) {
      rings.push(new Ring(world.materialIndex.materials["gold"]))
  }

  for (let i = 0; i < 5; i++) {
      const ring = rings[i];
      expect(bob.equipAccessory(ring,`#3 left hand`)).toBe(true)
  }
  expect(bob.equipAccessory(new Ring(world.materialIndex.materials["gold"]),`#3 left hand`)).toBe(false)

  for (let i = 0; i < 5; i++) {
    // console.log(`unequipping ${i}`);
    expect(bob.unEquipAccessory(`#3 left hand`,0)).toBeDefined()
  }
  expect(bob.unEquipAccessory(`#3 left hand`,0)).toBeUndefined()
});

test("ring equipped on correct hand",()=>{
  const bob = new Abomination("Bob",WorldDate.now(world),"male")

  expect(bob.equipAccessory(new Ring(world.materialIndex.materials["gold"]),`#3 left hand`)).toBe(true)

  for (let i = 0; i < bob.bodyParts.length; i++) {
    const part = bob.bodyParts[i]

    if(part.getName()=="4th left hand")
    {
      expect(part.accessories.length).toBe(1)
    }
  }
})