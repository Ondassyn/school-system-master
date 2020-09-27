import { Meteor } from 'meteor/meteor';
import { upload } from "../../modules/ketPet/upload";
import { calculateRating } from "../../modules/ketPet/calculateRating";
import XLSX from 'xlsx';

Meteor.methods({

	'KetPet.Upload':function(academicYear, grade, examPeriod, results) {

				if(!Roles.userIsInRole(this.userId,'school') &&
						!Roles.userIsInRole(this.userId,'schoolCoordinator'))
            throw new Meteor.Error('access-denied', 'Access denied!')

        let school = Schools.findOne({
            userId: this.userId
        })

        if (school) {
            upload(academicYear, school.schoolId, grade, examPeriod,results)
        }
  },


	'KetPet.totalRating':function(academicYear) {
			let recordInRating = KetPetRatings.find({academicYear:academicYear}).fetch()

			recordInRating.forEach(school =>{
				let recordResults = KetPetResults.find({academicYear:academicYear, schoolId:school.schoolId, examPeriod:'2'}).fetch()
				let sCount7Grade = 0;
				let sCount8Grade = 0;

				var ratingRecord = {
						academicYear: academicYear,
						schoolId: school.schoolId,
						examPeriod: school.examPeriod,
						total8Grade: school.total8Grade,
						total8Level: school.total8Level,
						total7Grade: school.total7Grade,
						total7Level: school.total7Level,
						total: school.total,
						sCount7Grade: 0,
						grade7DistB1: 0,
						grade7MeritA2:0,
						grade7PassA2:0,
						grade7A1:0,
						grade7Fail:0,
						sCount8Grade: 0,
						grade8DistB2: 0,
						grade8MeritB1:0,
						grade8PassB1:0,
						grade8A2:0,
						grade8Fail:0
				}

				recordResults.forEach(record =>{
						if(record.grade == '7'){
								var studentLevel = record.level;

								if(studentLevel == 'Pass with Distinction(B1)') ratingRecord.grade7DistB1++;
								if(studentLevel == 'Pass with Merit(A2)') 			ratingRecord.grade7MeritA2++;
								if(studentLevel == 'Pass(A2)') 									ratingRecord.grade7PassA2++;
								if(studentLevel == 'A1') 												ratingRecord.grade7A1++;
								if(studentLevel == 'Fail') 											ratingRecord.grade7Fail++;

								ratingRecord.sCount7Grade++;

						}else if(record.grade == '8'){

								var studentLevel = record.level;

								if(studentLevel == 'Pass with Distinction(B2)') ratingRecord.grade8DistB2++;
								if(studentLevel == 'Pass with Merit(B1)') 			ratingRecord.grade8MeritB1++;
								if(studentLevel == 'Pass(B1)') 									ratingRecord.grade8PassB1++;
								if(studentLevel == 'A2') 												ratingRecord.grade8A2++;
								if(studentLevel == 'Fail') 											ratingRecord.grade8Fail++;

								ratingRecord.sCount8Grade++;

						}
				});

				KetPetRatings.update({_id:school._id},{$set:ratingRecord})
			});
			// Grade: 7
			// 90 - 100	Pass with Distinction(B1)
			// 85-89	Pass with Merit(A2)
			// 70-84	Pass(A2)
			// 45-69	A1
			// 0-44	Fail

			// Grade: 8
			// 90–100	Pass with Distinction(B2)
			// 85–89	Pass with Merit(B1)
			// 70–84	Pass(B1)
			// 45–69	A2
			// 0-44	Fail;


			// schoolStore.forEach(schoolId =>{
			// 	calculateRating(academicYear, schoolId)
			// });

		/*
			let recordInRating = KetPetRatings.find({academicYear:academicYear}).fetch()

      _.each(recordInRating,(rating) => {
					var total7Grade = rating.total7Grade?rating.total7Grade:0;
					var total8Grade = rating.total8Grade?rating.total8Grade:0;

					let ratingRecord = {
						_id: rating._id,
						academicYear: academicYear,
						schoolId: rating.schoolId,
						examPeriod: rating.examPeriod,
						total7Grade: total7Grade,
						total7Level: rating.total7Level,
						total8Grade: total8Grade,
						total8Level: rating.total8Level,
						total: (total7Grade+total8Grade)
					}

          KetPetRatings.update({_id:rating._id},{$set:ratingRecord})
			})

			*/
  },
});
Meteor.startup(() => { });
