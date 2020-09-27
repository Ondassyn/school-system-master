import { runInThisContext } from "vm";
// 1 and 2 BTS exams needs to be changed if there are any changes, 3 and 4 were changed 
export const calculateRating = (academicYear,schoolId) => {
    //calculated bts rating here
    let grades = ["7","8","9","10","11","1","2","3"]
    //let grades = ["9","10"]
    var counter = 0;


    let totalRating = {
        academicYear:academicYear,
        schoolId: schoolId,
        grade: "all",
        turkish: 0, 
        total: 0,
    }
    _.each(grades,(grade) => {
        let gradeRating = calculateTurkishRatingForGrade(academicYear,schoolId,grade)
        if (grade == gradeRating.grade && gradeRating.total > 0) {
            counter++;
        }
        totalRating.turkish += (gradeRating.turkish || 0)
        totalRating.total += (gradeRating.total || 0)
    })

    totalRating.turkish = totalRating.turkish / (counter || 1)
    totalRating.total = totalRating.total / (counter || 1)

   

    // insert total rating to db
    var sameSchoolRating = TurkishRatings.findOne({
        schoolId: schoolId,
        academicYear: academicYear,
        grade: 'all'
    })

    if (sameSchoolRating) {
        TurkishRatings.update({_id:sameSchoolRating._id},{$set:totalRating})
    } else {
        TurkishRatings.insert(totalRating)
    }
}

calculateTurkishRatingForGrade = (academicYear,schoolId,grade) => {
    let ratingObj = {
        academicYear:academicYear,
        schoolId: schoolId,
        grade: grade,
        turkish: 0       
    }

    let records = TurkishResults.find({academicYear:academicYear,grade:grade,schoolId:schoolId}).fetch()
    let firstDayCounter = 0;

    _.each(records,(record) => {

        ratingObj.turkish += (record.turkish || 0)
        firstDayCounter++;     
    })

    if (firstDayCounter != 0) {
        ratingObj.turkish = (ratingObj.turkish / firstDayCounter)     
    }

    // insert rating to db
    var sameRating = TurkishRatings.findOne({
        academicYear: academicYear,
        schoolId: schoolId,
        grade: grade
    })
    if (!sameRating)
        TurkishRatings.insert(ratingObj)
    else {
        TurkishRatings.update({_id:sameRating._id}, {
            $set: ratingObj
        })
    }

    return ratingObj
}
