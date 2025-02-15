import BodyPart from "./BodyPart";
import SidedBodyPart from "./SidedBodyPart";

export default interface NumerousBodyPart extends BodyPart
{
    index : number
}

export function getQualificator(index:number) {
    const stringVersion = `${index+1}`
    const lastDigit = stringVersion[stringVersion.length-1]
    switch(lastDigit){
        case "1":
            return `${stringVersion}st`
        case "2":
            return `${stringVersion}nd`
        case "3":
            return `${stringVersion}rd`
        default:
            return `${index+1}th`
    }
}

export function getIndex(qualificator:string):number{
    return parseInt(qualificator.match(/\d+/)![0])-1
}