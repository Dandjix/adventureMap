import { Human } from "../Creature/Species/Human"
import { WorldDate } from "../util/WorldDate"
import { World } from "../World/World"

let world : World

beforeAll(()=>{
    world = new World("Noxus",new Date())
})

test('should first', () => { 
    const Alice = new Human("alice",WorldDate.now(world),"female")
    const Bob = new Human("bob",WorldDate.now(world),"male")
 })