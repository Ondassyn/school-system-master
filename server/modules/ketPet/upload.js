export const upload = (academicYear, schoolId, grade, examPeriod, results) => {
    var total7Grade = 0;
    var total8Grade = 0;
    var count7Grade = 0;
    var count8Grade = 0;

    if(results){

      _.each(results,(result) => {
          let student = Students.findOne({studentId:parseInt(result.studentId)});


          if (!student || student.schoolId != schoolId || (!result.ReadingAndWriting && !result.Reading)){
              return;
          }

          let studentRecord;

          if(grade == '7'){

             studentRecord = {
                 academicYear: academicYear,
                 studentId: student.studentId,
                 schoolId: schoolId,
                 name: student.name,
                 surname: student.surname,
                 examPeriod: examPeriod,
                 grade: student.grade,
                 division: student.division,
                 ReadingAndWriting: result.ReadingAndWriting?result.ReadingAndWriting:0,
                 WritingTask9: result.WritingTask9?result.WritingTask9:0,
                 Listening: result.Listening?result.Listening:0,
                 Speaking: result.Speaking?result.Speaking:0,
                 level: 0,
                 total: 0,
             }

             var total50 = (result.ReadingAndWriting?parseInt(result.ReadingAndWriting):0) +
                           (result.WritingTask9?parseInt(result.WritingTask9):0)
             total50 = (total50 * 5)/6;

             var totalL25 = result.Listening?parseInt(result.Listening):0;
             var totalS25 = (result.Speaking?parseInt(result.Speaking):0) * 5

             studentRecord.total = parseInt(total50) + parseInt(totalL25) + parseInt(totalS25);
             studentRecord.total = parseFloat(studentRecord.total)


             if(studentRecord.total >= 90 && studentRecord.total <= 100){
                studentRecord.level = "Pass with Distinction(B1)"

             }else if(studentRecord.total >= 85 && studentRecord.total <= 89){
                studentRecord.level = "Pass with Merit(A2)"

             }else if(studentRecord.total >= 70 && studentRecord.total <= 84){
                studentRecord.level = "Pass(A2)"

             }else if(studentRecord.total >= 45 && studentRecord.total <= 69){
                studentRecord.level = "A1"
             }else{
               studentRecord.level = "Fail"
             }

             total7Grade += studentRecord.total;
             count7Grade++;

          }else if(grade == '8'){

             studentRecord = {
                 academicYear: academicYear,
                 studentId: student.studentId,
                 schoolId: schoolId,
                 name: student.name,
                 surname: student.surname,
                 examPeriod: examPeriod,
                 grade: student.grade,
                 division: student.division,
                 Reading: result.Reading?result.Reading:0,
                 WritingPart1: result.WritingPart1?result.WritingPart1:0,
                 WritingPart2: result.WritingPart2?result.WritingPart2:0,
                 WritingPart3: result.WritingPart3?result.WritingPart3:0,
                 Listening: result.Listening?result.Listening:0,
                 Speaking: result.Speaking?result.Speaking:0,
                 level: 0,
                 total: 0,
             }

             var total50 = (result.Reading?parseInt(result.Reading):0) +
                           (result.WritingPart1?parseInt(result.WritingPart1):0) +
                           (result.WritingPart2?parseInt(result.WritingPart2):0) +
                           (result.WritingPart3?parseInt(result.WritingPart3):0);

             total50 = (total50 * 5)/6;

             var totalL25 = result.Listening?parseInt(result.Listening):0;
             var totalS25 = (result.Speaking?parseInt(result.Speaking):0) * 5

             studentRecord.total = parseInt(total50) + parseInt(totalL25) + parseInt(totalS25);
             studentRecord.total = parseFloat(studentRecord.total)


             if(studentRecord.total >= 90 && studentRecord.total <= 100){
                studentRecord.level = "Pass with Distinction(B2)"

             }else if(studentRecord.total >= 85 && studentRecord.total <= 89){
                studentRecord.level = "Pass with Merit(B1)"

             }else if(studentRecord.total >= 70 && studentRecord.total <= 84){
                studentRecord.level = "Pass(B1)"

             }else if(studentRecord.total >= 45 && studentRecord.total <= 69){
                studentRecord.level = "A2"

             }else{
               studentRecord.level = "Fail"
             }


             total8Grade += studentRecord.total;
             count8Grade++;
          }


          let recordInDb = KetPetResults.findOne({academicYear:academicYear, studentId:student.studentId, schoolId:schoolId})

          if (recordInDb) {
              KetPetResults.update({_id:recordInDb._id},{$set:studentRecord})
          } else {
              KetPetResults.insert(studentRecord)
          }


      })

      if(grade == '7'){
          total7Grade = total7Grade / count7Grade;
          //ket
          var level7Ket;
          if(total7Grade >= 90 && total7Grade <= 100){
             level7Ket = "Pass with Distinction(B1)"

          }else if(total7Grade >= 85 && total7Grade <= 89){
             level7Ket = "Pass with Merit(A2)"

          }else if(total7Grade >= 70 && total7Grade <= 84){
             level7Ket = "Pass(A2)"

          }else if(total7Grade >= 45 && total7Grade <= 69){
             level7Ket = "A1"

          }else{
             level7Ket = "Fail"
          }

          var ratingRecord = {
              academicYear: academicYear,
              schoolId: schoolId,
              examPeriod: examPeriod,
              total7Grade: total7Grade,
              total7Level: level7Ket,
              total: total7Grade
          }

      }else if(grade == '8'){

          total8Grade = total8Grade / count8Grade;
          var level8Pet;
          if(total8Grade >= 90 && total8Grade <= 100){
             level8Pet = "Pass with Distinction(B2)"

          }else if(total8Grade >= 85 && total8Grade <= 89){
             level8Pet = "Pass with Merit(B1)"

          }else if(total8Grade >= 70 && total8Grade <= 84){
             level8Pet = "Pass(B1)"

          }else if(total8Grade >= 45 && total8Grade <= 69){
             level8Pet = "A2"

          }else{
              level8Pet = "Fail"
          }

          let recordLast = KetPetRatings.findOne({academicYear:academicYear, schoolId:schoolId, examPeriod:examPeriod})
          var total7Grade = recordLast?recordLast.total7Grade:0;
          var total7Level = recordLast?recordLast.total7Level:0;

          var ratingRecord = {
              academicYear: academicYear,
              schoolId: schoolId,
              examPeriod: examPeriod,
              total8Grade: total8Grade,
              total8Level: level8Pet,
              total7Grade: total7Grade,
              total7Level: total7Level,
              total: (total7Grade + total8Grade)
          }
      }

      let recordInRating = KetPetRatings.findOne({academicYear:academicYear, schoolId:schoolId, examPeriod:examPeriod})

      if (recordInRating) {
          KetPetRatings.update({_id:recordInRating._id},{$set:ratingRecord})
      } else {
          KetPetRatings.insert(ratingRecord)
      }
    }
}
