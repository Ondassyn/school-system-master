export const calculateTotalGradeSubjectJoba = (schoolId,academicYear) => {

    subjects = KboCourses.find().fetch()
    _.each(subjects,(subject) => {
        var c = 0;

        let totalGradeRating = {
                        schoolId:schoolId,
                        academicYear:academicYear,
                        subjectId: subject.subjectId,
                        grade:'all',
                        regBronzeJoba: 0,
                        regSilverJoba: 0,
                        regGoldJoba: 0,
                        regTotalJoba: 0,
                        natBronzeJoba: 0,
                        natSilverJoba: 0,
                        natGoldJoba: 0,
                        natTotalJoba: 0, 
                        interBronzeJoba: 0,
                        interSilverJoba: 0,
                        interGoldJoba: 0,
                        interTotalJoba: 0,
                        regBronzeProject: 0,
                        regSilverProject: 0, 
                        regGoldProject: 0,
                        regTotalProject: 0,
                        natBronzeProject: 0,
                        natSilverProject: 0,
                        natGoldProject: 0, 
                        natTotalProject: 0,
                        interBronzeProject: 0,
                        interSilverProject: 0,
                        interGoldProject: 0,
                        interTotalProject: 0,
                    }

        let grades = ['7','8','9','10','11']

        _.each(grades, (grade) => {
            ratings = JobaRatings.find({schoolId:schoolId,academicYear:academicYear,grade:grade, subjectId:subject.subjectId}).fetch()
            _.each(ratings,(rating) => {

                totalGradeRating.regBronzeJoba += rating.regBronzeJoba
                totalGradeRating.regSilverJoba += rating.regSilverJoba
                totalGradeRating.regGoldJoba += rating.regGoldJoba
                totalGradeRating.regTotalJoba += rating.regTotalJoba
                totalGradeRating.natBronzeJoba += rating.natBronzeJoba
                totalGradeRating.natSilverJoba += rating.natSilverJoba
                totalGradeRating.natGoldJoba += rating.natGoldJoba
                totalGradeRating.natTotalJoba += rating.natTotalJoba
                totalGradeRating.interBronzeJoba += rating.interBronzeJoba
                totalGradeRating.interSilverJoba += rating.interSilverJoba
                totalGradeRating.interGoldJoba += rating.interGoldJoba
                totalGradeRating.interTotalJoba += rating.interTotalJoba
                totalGradeRating.regBronzeProject += rating.regBronzeProject
                totalGradeRating.regSilverProject +=  rating.regSilverProject
                totalGradeRating.regGoldProject += rating.regGoldProject
                totalGradeRating.regTotalProject += rating.regTotalProject
                totalGradeRating.natBronzeProject += rating.natBronzeProject
                totalGradeRating.natSilverProject += rating.natSilverProject
                totalGradeRating.natGoldProject += rating.natGoldProject
                totalGradeRating.natTotalProject += rating.natTotalProject
                totalGradeRating.interBronzeProject += rating.interBronzeProject
                totalGradeRating.interSilverProject += rating.interSilverProject
                totalGradeRating.interGoldProject += rating.interGoldProject
                totalGradeRating.interTotalProject += rating.interTotalProject
                c++;
            })
        })

        let sameTotalGradeRating = JobaRatings.findOne({academicYear:academicYear, schoolId:schoolId, subjectId:subject.subjectId, grade:'all'})

                if (sameTotalGradeRating) {
                    JobaRatings.update({_id:sameTotalGradeRating._id},{$set:totalGradeRating})
                }
                else {
                    if (c > 0)
                        console.log("#")
                        JobaRatings.insert(totalGradeRating)
                }
    })
}