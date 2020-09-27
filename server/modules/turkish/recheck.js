import { parseAnswerKey} from "../multipleChoiceChecker";
import { checkTurkish } from "../multipleChoiceChecker";
import { checkTurkishEmpty } from "../multipleChoiceChecker";
import { calculateRating } from "./rating";

export const recheck = (academicYear,variant) => {

    let answerKey = TurkishAnswerKeys.findOne({academicYear:academicYear,variant:variant});
    let results = TurkishResults.find({academicYear:academicYear,variant:variant}).fetch()
    
    _.each(results,(result) => {  
        result["turkishCorrect"] = checkTurkish(parseAnswerKey(answerKey.turkish),result.keys.slice(0,400))
        result["turkishInCorrect"] = 80-result.turkishCorrect-checkTurkishEmpty(parseAnswerKey(answerKey.turkish),result.keys.slice(0,400))
        result["turkish"] = (result.turkishCorrect-result.turkishInCorrect/3)*1.25
        TurkishResults.update({_id:result._id},{$set:result})
    })
    let schools = Schools.find().fetch()
    _.each(schools,(school) => {
    //console.log("admin: rechek shkol")
        calculateRating(academicYear,school.schoolId)
    })
}
