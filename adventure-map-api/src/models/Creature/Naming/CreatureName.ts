import Random from "../../../random/random"

import adjectives from './adjectives.json'
import male_first_names from './male_first_names.json'
import female_first_names from './female_first_names.json'
import last_names from './last_names.json'

export function createCreatureName(gender : 'male'|'female'|undefined = undefined,random? : Random)
{
    if(!random)
        random = new Random()
    
    let prepend : string = ""
    let append : string = ""

    if(random.random()<0.1)
        prepend = adjectives[random.randint(0,adjectives.length)]+' '
    if(random.random()<0.1)
        append = ` the ${adjectives[random.randint(0,adjectives.length)]}`

    const firstNamePool = getNamePool(gender,male_first_names,female_first_names)
    const firstName = firstNamePool[random.randint(0,firstNamePool.length)]
    const lastName = last_names[random.randint(0,last_names.length)]

    const name = `${prepend}${firstName} ${lastName}${append}`

    return name
}

function getNamePool(gender:"female"|"male"|undefined,maleNames : string[],femaleNames:string[])
{
    let namePool : string[]
    if(!gender)
    {
        namePool = maleNames.concat(femaleNames)
    }
    else if(gender == "male")
    {
        namePool = maleNames
    }
    else
    {
        namePool = femaleNames
    }
    return namePool
}