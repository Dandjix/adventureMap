export default class Random {
    public random()
    {
        return Math.random()
    }
    /**
     * @param min the minimum (included)
     * @param max the maximum (excluded)
     * @returns 
     */
    public randint(min:number,max:number)
    {
        return Math.floor(min+Math.random()*(max-min))
    }
}