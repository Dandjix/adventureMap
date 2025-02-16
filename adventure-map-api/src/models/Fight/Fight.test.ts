import { Helmet } from "../Creature/Items/Armor/Helmet"
import Pistol from "../Creature/Items/Weapon/Pistol"
import { Human } from "../Creature/Species/Human"
import { WorldDate } from "../util/WorldDate"
import { World } from "../World/World"
import { AttackTurn } from "./Turns/AttackTurn"
import FireAt from "./Turns/FireAt"

let world : World

beforeAll(()=>{
    world = new World("Noxus",new Date())
})

test('bob executes alice', () => { 
    const Alice = new Human("alice",WorldDate.now(world),"female")
    const Bob = new Human("bob",WorldDate.now(world),"male")

    expect(Bob.equip(new Pistol(world.materialIndex.materials["adamantine"],"right",1),"right hand")).toBe(true)
    const bobRightHand = Bob.bodyParts.find((bp)=>bp.getName()=="right hand")!
    
    expect(Alice.equip(new Helmet(world.materialIndex.materials["adamantine"],1))).toBe(true)

    const bobFuckingKillsAlice = new FireAt(Bob,bobRightHand,Alice,"head")
    const recap = bobFuckingKillsAlice.play()

    console.log("recap : ",recap);
    
 })