import adjectives from './adjectives.json';
import male_first_names from './male_first_names.json'
import female_first_names from './female_first_names.json'
import last_names from './last_names.json'
function nonUniques(words : string[],name:string)
{
    const nonUniques = new Set()
    words.sort()
    let previous = words[0]
    for (let i = 1; i < words.length; i++) {
        const current = words[i];
        const previous = words[i-1]
        if(current==previous)
        {
            nonUniques.add(current)
        }
    }
    return nonUniques
}

test("adjectives are unique",()=>
{
    const duplicates = nonUniques(adjectives,"adjectives")
    
    expect(duplicates.size).toBe(0)
})

test("male first names are unique",()=>
{
    const duplicates = nonUniques(male_first_names,"male first names")

    expect(duplicates.size).toBe(0)
})

test("female first names are unique",()=>
{
    const duplicates = nonUniques(female_first_names,"female first names")

    expect(duplicates.size).toBe(0)
})

test("last names are unique",()=>
{
    const duplicates = nonUniques(last_names,"last names")

    expect(duplicates.size).toBe(0)
})