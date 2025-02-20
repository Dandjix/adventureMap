import { Creature } from "../Creature"

/**
 * -1 : loathes, 0 neutral, 1 adores
 */
type TOpinons = {
    [subject:string]:number
}


export default class Personality
{
    constructor(courage:number=0.5,intelligence:number=0.25,opinions : TOpinons = {}) {
        this.opinions = opinions
    }

    private opinions : TOpinons

    getOpinionValue(subject : string) : number
    {
        return this.opinions[subject]
    }

    /**
     * ex : "has no opinion on toads"
     * "despises weakness"
     * "admires beauty"
     * @param subject 
     */
    getOpinion(subject:string) : string
    {
        let value = this.opinions[subject]
        if(!value)
            value = 0

        return `${Personality.getOpinionVerb(value)} ${subject}`
    }

    private static getOpinionVerb(value: number): string {
        if (value < -0.9) return "absolutely loathes";
        if (value < -0.7) return "despises with passion";
        if (value < -0.5) return "strongly hates";
        if (value < -0.25) return "harbors dislike for";
        if (value < -0.1) return "mildly dislikes";
        if (value < 0.1) return "is indifferent to";
        if (value < 0.25) return "somewhat likes";
        if (value < 0.5) return "genuinely enjoys";
        if (value < 0.7) return "deeply loves";
        if (value < 0.9) return "cherishes";
        return "absolutely adores";
    }
}