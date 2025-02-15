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



  const bob = new Human("Bob",WorldDate.now(world),world,"male")
  const backpack1 = new Backpack(10)
  const backpack2 = new Backpack(10)

  expect(bob.equip(backpack1)).toBe(true)
  expect(bob.equip(backpack2)).toBe(false)
});

test("human ring equip test", () => {
  const bob = new Human("Bob",WorldDate.now(world),world,"male")

  const rings = []
  for (let i = 0; i < 11; i++) {
    rings.push(new Ring())
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

test("abomination unequip test", () => {

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
    // console.log(`unequipping ${i}`);
    expect(bob.unEquipAccessory(`#3 left hand`,0)).toBeDefined()
  }
  expect(bob.unEquipAccessory(`#3 left hand`,0)).toBeUndefined()
});