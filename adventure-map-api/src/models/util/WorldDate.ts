import { World } from "../World/World"

const months_by_season = {
    "Spring":[
        "March",
        "April",
        "May"
    ],"Summer":[
        "June",
        "July",
        "August"
    ],"Fall":[
        "September",
        "October",
        "November"
    ],"Winter":[
        "December",
        "January",
        "February"
    ],"The Dark Times":[
        "Mensiseius"
    ]
}

export class WorldDate{
    /**
     * this can be negative.
     */
    daysSinceWorldCreation : number

    /**
     * creates a world date from the day since world creation, or a real world date and the world it corresponds to.
     */
    constructor(daysSinceWorldCreationOrRealDate : number | Date,world? : World) {
        if (typeof daysSinceWorldCreationOrRealDate == "number")
        {
            this.daysSinceWorldCreation = daysSinceWorldCreationOrRealDate
        }
        else
        {   
            const worldCreationMsSince1970 = world!.creation_date.getTime()
            const worldCreationDaysSince1970 = worldCreationMsSince1970/(1000*60*60*24)

            const realDateMsSince1970 = daysSinceWorldCreationOrRealDate.getTime()
            const realDateDaysSince1970 = realDateMsSince1970/(1000*60*60*24)

            this.daysSinceWorldCreation = realDateDaysSince1970 - worldCreationDaysSince1970
        }
    }

    static now(world : World)
    {
        return new WorldDate(new Date(),world)
    }
}