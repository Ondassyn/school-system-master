import { parseAnswerKey } from "../multipleChoiceChecker";
import { check } from "../multipleChoiceChecker";
import { calculateRating } from "./rating";

export const recheck = (academicYear,tatNo,variant) => {
    let results = TatResults.find({academicYear:academicYear,tatNo:tatNo,variant:variant}).fetch()
    let answerKeys = TatAnswerKeys.findOne({academicYear:academicYear,tatNo:tatNo,variant:variant})

    _.each(results,(result) => {
        let res = check(parseAnswerKey(answerKeys.keys),result.answers)
        // res = res/2
        percent = (res/parseAnswerKey(answerKeys.keys).length*100).toFixed(2)

        TatResults.update({_id:result._id},{$set:{result:res,percent:percent}})
    })

    let schools = Schools.find().fetch()
    _.each(schools,(school) => {
        calculateRating(academicYear,tatNo,school.schoolId)
    })
}
