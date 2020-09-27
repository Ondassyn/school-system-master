export const calculateRating = (academicYear,schoolId) => {

    //calculated ubt rating here
    function compareNumbers(a, b) {
      return a - b;
    }

    var ubtCount = 60;

    let totalRating = {
        academicYear:academicYear,
        schoolId: schoolId,
        countOfStudents: 0,
        countOfStudentTakingUbt: 0,
        totalInProcent: 0,
        ubt1PassedStudents: 0,
        ubt2PassedStudents: 0,
        ubt3PassedStudents: 0,
        ubt4PassedStudents: 0,
        ubt5PassedStudents: 0,
        ubt6PassedStudents: 0,
        ubt7PassedStudents: 0,
        ubt8PassedStudents: 0,
        ubt9PassedStudents: 0,
        ubt10PassedStudents: 0,
        ubt11PassedStudents: 0,
        ubt12PassedStudents: 0,
        ubt13PassedStudents: 0,
        ubt14PassedStudents: 0,
        ubt15PassedStudents: 0,
        ubt16PassedStudents: 0,
        ubt17PassedStudents: 0,
        ubt18PassedStudents: 0,
        ubt19PassedStudents: 0,
        ubt20PassedStudents: 0,
        ubt21PassedStudents: 0,
        ubt22PassedStudents: 0,
        ubt23PassedStudents: 0,
        ubt24PassedStudents: 0,
        ubt25PassedStudents: 0,
        ubt26PassedStudents: 0,
        ubt27PassedStudents: 0,
        ubt28PassedStudents: 0,
        ubt29PassedStudents: 0,
        ubt30PassedStudents: 0,
        ubt31PassedStudents: 0,
        ubt32PassedStudents: 0,
        ubt33PassedStudents: 0,
        ubt34PassedStudents: 0,
        ubt35PassedStudents: 0,
        ubt36PassedStudents: 0,
        ubt37PassedStudents: 0,
        ubt38PassedStudents: 0,
        ubt39PassedStudents: 0,
        ubt40PassedStudents: 0,
        ubt41PassedStudents: 0,
        ubt42PassedStudents: 0,
        ubt43PassedStudents: 0,
        ubt44PassedStudents: 0,
        ubt45PassedStudents: 0,
        ubt46PassedStudents: 0,
        ubt47PassedStudents: 0,
        ubt48PassedStudents: 0,
        ubt49PassedStudents: 0,
        ubt50PassedStudents: 0,
        ubt51PassedStudents: 0,
        ubt52PassedStudents: 0,
        ubt53PassedStudents: 0,
        ubt54PassedStudents: 0,
        ubt55PassedStudents: 0,
        ubt56PassedStudents: 0,
        ubt57PassedStudents: 0,
        ubt58PassedStudents: 0,
        ubt59PassedStudents: 0,
        ubt60PassedStudents: 0,
        median: 0,
        total: 0
    }

    counter = [];

    for (var i = 1; i <= ubtCount; i++) {
            var n = 'ubt' + i;
            totalRating[n] = 0;
            counter.push(0)
        }

    var counterTotal = 0;

    ubtResults = UhdResults.find({academicYear:academicYear, schoolId:schoolId}).fetch()

    totalRating.countOfStudents = Students.find({schoolId:schoolId, grade: '11'}).count()
    totalRating.countOfStudentTakingUbt = ubtResults.length

    var ubtPassedStudentCounters = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    _.each(ubtResults,(result) => {
        for (var i = 1; i <= ubtCount; i++) {
            var n = 'ubt' + i;

            if (parseInt(result[n]) > 0) {
                totalRating[n] += parseInt(result[n]);
                counter[i-1]++;
            }else {
                totalRating[n] += parseInt(result[n]);
            }

        }

        for(var j = 1; j <= ubtCount; j++){
          var ubtNumber = 'ubt'+j;
          if(parseInt(result[ubtNumber]) > 0) ubtPassedStudentCounters[j]++;
        }
    })

    totalRating.ubt1PassedStudents  = ubtPassedStudentCounters[1];
    totalRating.ubt2PassedStudents  = ubtPassedStudentCounters[2];
    totalRating.ubt3PassedStudents  = ubtPassedStudentCounters[3];
    totalRating.ubt4PassedStudents  = ubtPassedStudentCounters[4];
    totalRating.ubt5PassedStudents  = ubtPassedStudentCounters[5];
    totalRating.ubt6PassedStudents  = ubtPassedStudentCounters[6];
    totalRating.ubt7PassedStudents  = ubtPassedStudentCounters[7];
    totalRating.ubt8PassedStudents  = ubtPassedStudentCounters[8];
    totalRating.ubt9PassedStudents  = ubtPassedStudentCounters[9];
    totalRating.ubt10PassedStudents  = ubtPassedStudentCounters[10];
    totalRating.ubt11PassedStudents  = ubtPassedStudentCounters[11];
    totalRating.ubt12PassedStudents  = ubtPassedStudentCounters[12];
    totalRating.ubt13PassedStudents  = ubtPassedStudentCounters[13];
    totalRating.ubt14PassedStudents  = ubtPassedStudentCounters[14];
    totalRating.ubt15PassedStudents  = ubtPassedStudentCounters[15];
    totalRating.ubt16PassedStudents  = ubtPassedStudentCounters[16];
    totalRating.ubt17PassedStudents  = ubtPassedStudentCounters[17];
    totalRating.ubt18PassedStudents  = ubtPassedStudentCounters[18];
    totalRating.ubt19PassedStudents  = ubtPassedStudentCounters[19];
    totalRating.ubt20PassedStudents  = ubtPassedStudentCounters[20];
    totalRating.ubt21PassedStudents  = ubtPassedStudentCounters[21];
    totalRating.ubt22PassedStudents  = ubtPassedStudentCounters[22];
    totalRating.ubt23PassedStudents  = ubtPassedStudentCounters[23];
    totalRating.ubt24PassedStudents  = ubtPassedStudentCounters[24];
    totalRating.ubt25PassedStudents  = ubtPassedStudentCounters[25];
    totalRating.ubt26PassedStudents  = ubtPassedStudentCounters[26];
    totalRating.ubt27PassedStudents  = ubtPassedStudentCounters[27];
    totalRating.ubt28PassedStudents  = ubtPassedStudentCounters[28];
    totalRating.ubt29PassedStudents  = ubtPassedStudentCounters[29];
    totalRating.ubt30PassedStudents  = ubtPassedStudentCounters[30];
    totalRating.ubt31PassedStudents  = ubtPassedStudentCounters[31];
    totalRating.ubt32PassedStudents  = ubtPassedStudentCounters[32];
    totalRating.ubt33PassedStudents  = ubtPassedStudentCounters[33];
    totalRating.ubt34PassedStudents  = ubtPassedStudentCounters[34];
    totalRating.ubt35PassedStudents  = ubtPassedStudentCounters[35];
    totalRating.ubt36PassedStudents  = ubtPassedStudentCounters[36];
    totalRating.ubt37PassedStudents  = ubtPassedStudentCounters[37];
    totalRating.ubt38PassedStudents  = ubtPassedStudentCounters[38];
    totalRating.ubt39PassedStudents  = ubtPassedStudentCounters[39];
    totalRating.ubt40PassedStudents  = ubtPassedStudentCounters[40];
    totalRating.ubt41PassedStudents  = ubtPassedStudentCounters[41];
    totalRating.ubt42PassedStudents  = ubtPassedStudentCounters[42];
    totalRating.ubt43PassedStudents  = ubtPassedStudentCounters[43];
    totalRating.ubt44PassedStudents  = ubtPassedStudentCounters[44];
    totalRating.ubt45PassedStudents  = ubtPassedStudentCounters[45];
    totalRating.ubt46PassedStudents  = ubtPassedStudentCounters[46];
    totalRating.ubt47PassedStudents  = ubtPassedStudentCounters[47];
    totalRating.ubt48PassedStudents  = ubtPassedStudentCounters[48];
    totalRating.ubt49PassedStudents  = ubtPassedStudentCounters[49];
    totalRating.ubt50PassedStudents  = ubtPassedStudentCounters[50];
    totalRating.ubt51PassedStudents  = ubtPassedStudentCounters[51];
    totalRating.ubt52PassedStudents  = ubtPassedStudentCounters[52];
    totalRating.ubt53PassedStudents  = ubtPassedStudentCounters[53];
    totalRating.ubt54PassedStudents  = ubtPassedStudentCounters[54];
    totalRating.ubt55PassedStudents  = ubtPassedStudentCounters[55];
    totalRating.ubt56PassedStudents  = ubtPassedStudentCounters[56];
    totalRating.ubt57PassedStudents  = ubtPassedStudentCounters[57];
    totalRating.ubt58PassedStudents  = ubtPassedStudentCounters[58];
    totalRating.ubt59PassedStudents  = ubtPassedStudentCounters[59];
    totalRating.ubt60PassedStudents  = ubtPassedStudentCounters[60];

    // console.log("ubt1 count: "+ubtPassedStudentCounters[1]);
    // console.log("ubt2 count: "+ubtPassedStudentCounters[2]);
    // console.log("ubt3 count: "+ubtPassedStudentCounters[3]);

    var totalOfMediansStore = [];
    var t = 0;
    for (var i = 1; i <= ubtCount; i++) {
        var n = 'ubt' + i;
        var medianName = 'median' + i;
        var medianStore = [];
        var c = 0;

        _.each(ubtResults,(result) => {
            if(result[n] > 0){
              medianStore[c] = result[n];
              c++;
            }
        })

        medianStore.sort(compareNumbers)

        let length = medianStore.length
        let medianRes = 0;

        if(length != 0){
          if(length % 2 == 0){
            medianRes = (parseInt(medianStore[parseInt(length/2)]) + parseInt(medianStore[parseInt(length/2) - 1])) / 2
          }else{
            medianRes = parseInt(medianStore[parseInt(length/2)])
          }
        }

        totalRating[medianName] = medianRes;

        if(medianRes!=0) {
          totalOfMediansStore[t] = medianRes;
          t++;
        }
    }

    totalOfMediansStore.sort(compareNumbers)
    let length = totalOfMediansStore.length

    if(length != 0){
      if(length % 2 == 0){
        totalRating["totalMedian"] = (parseInt(totalOfMediansStore[parseInt(length/2)]) + parseInt(totalOfMediansStore[parseInt(length/2) - 1])) / 2
      }else{
        totalRating["totalMedian"] = parseInt(totalOfMediansStore[parseInt(length/2)])
      }
    }

    // console.log("schoolId: "+schoolId);
    // console.log("median: "+totalRating[medianName]);


    for (var i = 1; i <= ubtCount; i++) {
            var n = 'ubt' + i;

            if (totalRating[n] != 0) {
                totalRating[n] = parseInt((totalRating[n] / counter[i-1]).toFixed(1))

                totalRating.total += parseInt(totalRating[n]);
                counterTotal++;
            }
            else {
                totalRating[n] = 0
            }
    }

    // standard deviation start

    for (var i = 1; i <= ubtCount; i++) {
        var n = 'ubt' + i;
        var sum = 0;

        _.each(ubtResults,(result) => {

          if(result[n]!=0){
            var absAve = Math.abs(parseInt(totalRating[n])-parseInt(result[n]))

            sum += parseInt(absAve)*parseInt(absAve);
            // console.log(parseInt(absAve)*parseInt(absAve));
          }

        })

        var variance = sum/(ubtPassedStudentCounters[i]-1)
        var standarDev = Math.sqrt(variance)

        totalRating["standarDev"+i] = standarDev

        // console.log("average");
        // console.log(totalRating[n]);
        //
        // console.log("count");
        // console.log(ubtPassedStudentCounters[i]);
        //
        // console.log("variance");
        // console.log(variance);
        //
        // console.log("standarDev");
        // console.log(standarDev);

        /*
        console.log(result);
        console.log(result["ubt1"]);
        if(result["ubt1"]!=0){
          var absAve = Math.abs(parseInt(totalRating["ubt1"])-parseInt(result["ubt1"]))


          sum += parseInt(absAve)*parseInt(absAve);
          console.log(parseInt(absAve)*parseInt(absAve));
        }
        */
    }

    // standard deviation end


    // countOfStudentTakingUbt
    // ubtPassedStudentCounters
    var c = 0;
    var sumOftudentCounters = 0;
    _.each(ubtPassedStudentCounters,(item) => {
        if(item > 0){
          c++;
          sumOftudentCounters += item;
        }
    })

    totalRating.totalInProcent = ((sumOftudentCounters / c) * 100) / totalRating.countOfStudentTakingUbt
    // totalRating.totalInProcent = totalRating.total * 100 / 140;
    totalRating.totalInProcent = parseFloat(totalRating.totalInProcent)
    // 10 - 100
    // ave  -  x
    // x = (ave*100)/10


    totalRating.total = (totalRating.total / counterTotal).toFixed(1)
    totalRating.total = parseFloat(totalRating.total)


    // insert total rating to db
    var sameSchoolRating = UhdSchoolRatings.findOne({
        schoolId: schoolId,
        academicYear: academicYear
    })

    if (sameSchoolRating) {
        UhdSchoolRatings.update({_id:sameSchoolRating._id},{$set:totalRating})
    } else {
        UhdSchoolRatings.insert(totalRating)
    }
}
