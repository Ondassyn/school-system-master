import { runInThisContext } from "vm";

/*
  7 grade: total 80
  8 grade: total 160
  9 grade: total 160
  10 grade: total 100
*/

export const calcTotalRating = (academicYear, schoolId, btsNo) => {
    console.log('======================================================');
    let grades= ["7","8","9","10"]
    let pointsDict = {
      "7": 80,
      "8": 160,
      "9": 160,
      "10": 100,
    }

    let grade7AveAndStudentCount = []
    let grade8AveAndStudentCount = []
    let grade9AveAndStudentCount = []
    let grade10AveAndStudentCount = []

    let totalOfSchool = 0;

    _.each(grades,(grade) => {

      let records = BtsResults.find({academicYear:academicYear, btsNo: btsNo, schoolId: schoolId, grade: grade}).fetch()
      let totalPoint = pointsDict[grade];
      let sumOfPoints = 0;
      let countOfStudents = records.length;

      _.each(records,(record) => {
          sumOfPoints += record.total
      })

      // let res = sumOfPoints * 100 / (totalPoint * countOfStudents)
      let res = sumOfPoints * 100 / (totalPoint * countOfStudents)
      totalOfSchool += res;

      if(grade == '7'){
        grade7AveAndStudentCount[0] = countOfStudents
        grade7AveAndStudentCount[1] = res?res:0;
      }else if(grade == '8'){
        grade8AveAndStudentCount[0] = countOfStudents
        grade8AveAndStudentCount[1] = res?res:0;
      }else if(grade == '9'){
        grade9AveAndStudentCount[0] = countOfStudents
        grade9AveAndStudentCount[1] = res?res:0;
      }else if(grade == '10'){
        grade10AveAndStudentCount[0] = countOfStudents
        grade10AveAndStudentCount[1] = res?res:0;
      }

      // console.log("grade: "+grade);
      // console.log("sumOfPoints: "+sumOfPoints);
      // console.log("countOfStudents: "+countOfStudents);
      // console.log("res: "+res);

      var totalRatingObj = {
          academicYear:academicYear,
          btsNo: btsNo,
          schoolId: schoolId,
          grade: grade,
          total: res,
          totalA: 0,
          totalB: 0
      }

      var sameRating = BtsRatings.findOne({
          academicYear: academicYear,
          schoolId: schoolId,
          btsNo: btsNo,
          grade: grade
      })

      if(grade == '7'){
        totalRatingObj.totalA = (sameRating.mathematicA + sameRating.kazakh_langA + sameRating.turkish_langA) / 3;
        totalRatingObj.totalB = (sameRating.mathematicB + sameRating.kazakh_langB + sameRating.turkish_langB) / 3;
      }else if(grade == '8'){
        totalRatingObj.totalA = (sameRating.mathematicA + sameRating.kazakh_langA + sameRating.turkish_langA +
                                 sameRating.kazakh_historyA + sameRating.geographyA + sameRating.physicsA + sameRating.chemistryA + sameRating.biologyA) / 8;

        totalRatingObj.totalB = (sameRating.mathematicB + sameRating.kazakh_langB + sameRating.turkish_langB +
                                sameRating.kazakh_historyB + sameRating.geographyB + sameRating.physicsB + sameRating.chemistryB + sameRating.biologyB) / 8;

      }else if(grade == '9'){
        totalRatingObj.totalA = (sameRating.mathematicA + sameRating.kazakh_langA + sameRating.turkish_langA +
                                 sameRating.kazakh_historyA + sameRating.geographyA + sameRating.physicsA + sameRating.chemistryA + sameRating.biologyA) / 8;

       totalRatingObj.totalB = (sameRating.mathematicB + sameRating.kazakh_langB + sameRating.turkish_langB +
              sameRating.kazakh_historyB + sameRating.geographyB + sameRating.physicsB + sameRating.chemistryB + sameRating.biologyB) / 8;

      }else if(grade == '10'){
        var countA = 3;
        var sumA = 0;

        if(sameRating.geographyA){ sumA += sameRating.geographyA; countA++; }
        if(sameRating.physicsA) { sumA += sameRating.physicsA; countA++; }
        if(sameRating.chemistryA) { sumA += sameRating.chemistryA; countA++; }
        if(sameRating.biologyA) { sumA += sameRating.biologyA; countA++; }
        if(sameRating.world_historyA) { sumA += sameRating.world_historyA; countA++; }

        totalRatingObj.totalA = (sameRating.mathematicA + sameRating.kazakh_langA + sameRating.kazakh_historyA + sumA) / countA;


        var countB = 3;
        var sumB = 0;
        if(sameRating.geographyB){ sumB+= sameRating.geographyB; countB++; }
        if(sameRating.physicsB) { sumB += sameRating.physicsB; countB++; }
        if(sameRating.chemistryB) { sumB += sameRating.chemistryB; countB++; }
        if(sameRating.biologyB) { sumB += sameRating.biologyB; countB++; }
        if(sameRating.world_historyB) { sumB += sameRating.world_historyB; countB++; }

        totalRatingObj.totalB = (sameRating.mathematicB + sameRating.kazakh_langB + sameRating.kazakh_historyB + sumB) / countB;
      }


      if (!sameRating){
          BtsRatings.insert(totalRatingObj)
      }else {
          BtsRatings.update({_id:sameRating._id}, {$set: totalRatingObj})
      }

    })

    let allStudentsCount = grade7AveAndStudentCount[0] + grade8AveAndStudentCount[0] + grade9AveAndStudentCount[0] + grade10AveAndStudentCount[0]
    let sumOfPoint = grade7AveAndStudentCount[0]*grade7AveAndStudentCount[1]+
                    grade8AveAndStudentCount[0]*grade8AveAndStudentCount[1]+
                    grade9AveAndStudentCount[0]*grade9AveAndStudentCount[1]+
                    grade10AveAndStudentCount[0]*grade10AveAndStudentCount[1];


    let totalOfSchool2 = sumOfPoint / allStudentsCount;

    console.log("allStudentsCount: "+allStudentsCount);
    console.log("sumOfPoint: "+sumOfPoint);
    console.log("totalOfSchool2: "+totalOfSchool2);

    totalOfSchool = totalOfSchool / 4;


    var totalRatingObj = {
        academicYear:academicYear,
        btsNo: btsNo,
        schoolId: schoolId,
        grade: "all",
        total: totalOfSchool2,
        totalA: 0,
        totalB: 0
    }

    var sameRating = BtsRatings.findOne({
        academicYear: academicYear,
        schoolId: schoolId,
        btsNo: btsNo,
        grade: "all"
    })

    totalRatingObj.totalA = (sameRating.mathematicA + sameRating.kazakh_langA + sameRating.turkish_langA + sameRating.turkish_langA +
                            sameRating.kazakh_historyA + sameRating.geographyA + sameRating.physicsA + sameRating.biologyA) / 8

    totalRatingObj.totalB = (sameRating.mathematicB + sameRating.kazakh_langB + sameRating.turkish_langB + sameRating.turkish_langB +
                            sameRating.kazakh_historyB + sameRating.geographyB + sameRating.physicsB + sameRating.biologyB) / 8

    if (!sameRating){
        BtsRatings.insert(totalRatingObj)
    }else {
        BtsRatings.update({_id:sameRating._id}, {$set: totalRatingObj})
    }
}


    // console.log("mathTotal: "+mathTotal);
    // // let mathTotalProcent = 100 * mathTotal / (mathCount * 20);
    // let mathTotalProcent = mathTotal / mathCount;
    // console.log("mathTotalProcent: "+mathTotalProcent);
    //
    // console.log("turkishCount: "+turkishCount);
    // console.log("turkishTotal: "+turkishTotal);
    // // let tTotalProcent = 100 * turkishTotal / (turkishCount * 20);
    // let tTotalProcent = turkishTotal / turkishCount;
    // console.log("tTotalProcent: "+tTotalProcent);
    //
    // console.log("russianCount: "+russianCount);
    // console.log("russianTotal: "+russianTotal);
    // // let rTotalProcent = 100 * russianTotal / (russianCount * 20);
    // let rTotalProcent = russianTotal / russianCount;
