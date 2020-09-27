export const calculateObjRating = (academicYear,btsNo,grade,schoolId) => {
    let ratingObj = {
        academicYear:academicYear,
        quarter: btsNo,
        schoolId: schoolId,
        grade: grade,
    }
    
    let objectives = BtsObjectivesList.find({academicYear:academicYear,quarter:btsNo,grade:grade}).fetch()
    _.each(objectives,(objective) => {
        
        ratingObj.objectiveId = objective.objectiveId
        ratingObj.objectiveDefinition = objective.objectiveDefinition
        ratingObj.topic = objective.topic
        ratingObj.subject = objective.subject
        ratingObj.success = 0;

        let records = BtsObjectivesResults.find({academicYear:academicYear,quarter:btsNo,grade:grade,schoolId:schoolId,objective:objective.objectiveId}).fetch()
        if (records.length > 0) {
            _.each(records,(record) => {
                if(record.success) {
                    ratingObj.success += record.success
                }
            })

            console.log(ratingObj.success)
            console.log(records.length)
            ratingObj.success = parseFloat(((ratingObj.success) / records.length).toFixed(2))

            // insert rating to db
            var sameRating = BtsObjectivesRatings.findOne({
                objectiveId:ratingObj.objectiveId,
                quarter: btsNo,
                academicYear: academicYear,
                schoolId: schoolId,
                grade: grade
            })
            
            if (!sameRating)
                BtsObjectivesRatings.insert(ratingObj)
            else {
                BtsObjectivesRatings.update({_id:sameRating._id}, {$set: ratingObj})
            }
        }
    })
}
