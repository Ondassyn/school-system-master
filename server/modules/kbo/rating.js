import { parseAnswerKey } from "../multipleChoiceChecker";
/*
* Подсчитывает рейтинг школы по кбо
* */
export const calculateRating = (academicYear,kboNo,schoolId) => {
    generalRating = {
        academicYear:academicYear,
        schoolId:schoolId,
        kboNo:kboNo,
        grade:'all',
        total:0
    };
    let subjects = KboCourses.find().fetch();

    _.each(['6','7','8','9','10','11'],function(grade) {
        var gradeRating = {
            academicYear:academicYear,
            schoolId:schoolId,
            kboNo:kboNo,
            grade:grade,
            total:0
        };
        _.each(subjects,function(subject) {
            // console.log("SubjectId: " + subject.subjectId);
            gradeRating[subject.subjectId]=0;
            let results = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade,subjectId:subject.subjectId}).fetch();
            if (results.length!==0) {
                _.each(results,function(result) {
                    let answerKey = KboKeys.findOne({academicYear:academicYear,kboNo:kboNo,variant:result.variant})
                    if (answerKey) {
                        let amountOfQuestions = parseAnswerKey(answerKey.keys).length
                        // console.log('answerKeys: ' + answerKey.keys);
                        // console.log("🚀 ~ file: rating.js ~ line 31 ~ _.each ~ amountOfQuestions", amountOfQuestions)
                        gradeRating[subject.subjectId]+=(100*result.result)/amountOfQuestions;
                        // console.log("🚀 ~ file: rating.js ~ line 33 ~ _.each ~ gradeRating[subject.subjectId]", gradeRating[subject.subjectId])
                        gradeRating.total+= (100*result.result)/amountOfQuestions;
                        // console.log("🚀 ~ file: rating.js ~ line 35 ~ _.each ~ gradeRating.total", gradeRating.total)

                    }
                });
                gradeRating[subject.subjectId]=(gradeRating[subject.subjectId]/results.length).toFixed(2);
                // console.log("🚀 ~ file: rating.js ~ line 40 ~ _.each ~ gradeRating[subject.subjectId]", gradeRating[subject.subjectId])
            } else {
                gradeRating[subject.subjectId] = 0;
            }
        });

        let gradeStudents = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade}).count();
        if (gradeStudents!==0) {
            gradeRating.total = (gradeRating.total/gradeStudents).toFixed(2);
            let sameRating = KboRatings.findOne({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:grade});
            if (sameRating===undefined)
                KboRatings.insert(gradeRating);
            else {
                KboRatings.update(sameRating,{$set:gradeRating});
            }
        }
    });

    _.each(subjects,function(subject) {
        // console.log("General SubjectId: " + subject.subjectId);
        generalRating[subject.subjectId] = 0;
        let results = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,subjectId:subject.subjectId}).fetch();
        if (results.length!==0) {
            _.each(results,function(result) {
                // console.log("Result: " + result.result)
                let answerKey = KboKeys.findOne({academicYear:academicYear,kboNo:kboNo,variant:result.variant})
                if (answerKey) {
                    let amountOfQuestions = parseAnswerKey(answerKey.keys).length
                    // console.log('Amount of questions: ' + amountOfQuestions);
                    generalRating[subject.subjectId]+=(100*result.result)/amountOfQuestions;
                    // console.log("🚀 ~ file: rating.js ~ line 64 ~ _.each ~ generalRating[subject.subjectId]", generalRating[subject.subjectId])
                    generalRating.total+=(100*result.result)/amountOfQuestions;
                    // console.log("🚀 ~ file: rating.js ~ line 66 ~ _.each ~ generalRating.total", generalRating.total)
                }
            });
            generalRating[subject.subjectId]=(generalRating[subject.subjectId]/results.length).toFixed(2);
            // console.log("Length: " + results.length)
            // console.log("🚀 ~ file: rating.js ~ line 70 ~ _.each ~ generalRating[subject.subjectId]", generalRating[subject.subjectId])
        }
    });

    let generalStudents = KboResults.find({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo}).count();
    if (generalStudents!==0) {
        //console.log("#####")
        generalRating.total = (generalRating.total/generalStudents).toFixed(2);
        let sameRating = KboRatings.findOne({academicYear:academicYear,schoolId:schoolId,kboNo:kboNo,grade:'all'});
        if (sameRating===undefined){
            KboRatings.insert(generalRating);
            // console.log("insert: "+generalRating.schoolId);
        }else {
            KboRatings.update(sameRating,{$set:generalRating});
            // console.log("update: "+generalRating.schoolId);
        }
    }

}
