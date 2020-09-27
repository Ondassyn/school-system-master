import { parseAnswerKey } from "../multipleChoiceChecker";
/*
* Подсчитывает рейтинг школы по кбо
* */
export const calculateRating = (academicYear,tatNo,schoolId) => {
    
    let subjects = Subjects.find().fetch();

    _.each(subjects,function(subject) {
        subjectRating = {
        academicYear:academicYear,
        schoolId:schoolId,
        tatNo:tatNo,
        total:0
    };

        let results = TatResults.find({academicYear:academicYear,schoolId:schoolId,tatNo:tatNo,subjectId:subject.subjectId,position:{$ne:'intern'}}).fetch();
        if (results.length!==0) {
            _.each(results,function(result) {
                let answerKey = TatAnswerKeys.findOne({academicYear:academicYear,tatNo:tatNo,variant:result.variant})
                if (answerKey) {
                    let amountOfQuestions = parseAnswerKey(answerKey.keys).length                    
                    subjectRating.total+=(100*result.result)/amountOfQuestions;
                }

            });

            subjectRating.total = (subjectRating.total/results.length).toFixed(2)
            
            subjectRating.subjectId=subject.subjectId
            let sameRating = TatRating.findOne({academicYear:academicYear,schoolId:schoolId,tatNo:tatNo,subjectId:subject.subjectId});
            if (sameRating===undefined)
                TatRating.insert(subjectRating);
            else {
                TatRating.update(sameRating,{$set:subjectRating});
            }
        }
    });

    generalRating = {
        academicYear:academicYear,
        schoolId:schoolId,
        subjectId: 'all',
        tatNo:tatNo,
        total:0
    };

    let generalTeachers = TatResults.find({academicYear:academicYear,schoolId:schoolId,tatNo:tatNo,position:{$ne:'intern'}}).fetch();
    if (generalTeachers.length!==0) {
        _.each(generalTeachers,function(result) {
            let answerKey = TatAnswerKeys.findOne({academicYear:academicYear,tatNo:tatNo,variant:result.variant})
                if (answerKey) {
                    let amountOfQuestions = parseAnswerKey(answerKey.keys).length                    
                    generalRating.total+=(100*result.result)/amountOfQuestions; 
                }
        });

        generalRating.total = (generalRating.total/generalTeachers.length).toFixed(2);
        let sameRating = TatRating.findOne({academicYear:academicYear,schoolId:schoolId,tatNo:tatNo,subjectId:'all'});
        if (sameRating===undefined)
            TatRating.insert(generalRating);
        else {
            TatRating.update(sameRating,{$set:generalRating});
            }
        
    }

}