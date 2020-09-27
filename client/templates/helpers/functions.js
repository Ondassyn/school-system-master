Blaze.registerHelper("schoolName", function(schoolId) {
    return Schools.findOne({schoolId:schoolId}) ? Schools.findOne({schoolId:schoolId}).shortName : undefined
})

Blaze.registerHelper("ope", function(studentId, number) {

    if(number == 1) return OpeResults.findOne({studentId:studentId}) ? OpeResults.findOne({studentId:studentId}).ope1 : undefined
    if(number == 2) return OpeResults.findOne({studentId:studentId}) ? OpeResults.findOne({studentId:studentId}).ope2 : undefined
    if(number == 3) return OpeResults.findOne({studentId:studentId}) ? OpeResults.findOne({studentId:studentId}).ope3 : undefined
    if(number == 4) return OpeResults.findOne({studentId:studentId}) ? OpeResults.findOne({studentId:studentId}).ope4 : undefined
    if(number == 5) return OpeResults.findOne({studentId:studentId}) ? OpeResults.findOne({studentId:studentId}).ope5 : undefined
    if(number == 6) return OpeResults.findOne({studentId:studentId}) ? OpeResults.findOne({studentId:studentId}).ope6 : undefined

})

Blaze.registerHelper("average", function(studentId) {
    return OpeResults.findOne({studentId:studentId}) ? OpeResults.findOne({studentId:studentId}).average : undefined
})

Blaze.registerHelper("getTotalStylе", function(total) {
    var total = parseFloat(total)
    if(total>=55){

      return 'text-align: center; padding-left: 350pt; white-space: nowrap; background-color: #b2fab4'

    }else if(total>=40 && total < 55){

      return 'text-align: center; padding-left: 350pt; white-space: nowrap; background-color: #ffff8b'

    }else{
      return 'text-align: center; padding-left: 350pt; white-space: nowrap; background-color: #ff867c'
    }
})

Blaze.registerHelper("getTotalCategoryStylе", function(total) {
    var total = parseFloat(total)
    if(total>=55){

      return 'text-align: center; padding-left: 470pt; white-space: nowrap; background-color: #b2fab4'

    }else if(total>=40 && total < 55){

      return 'text-align: center; padding-left: 470pt; white-space: nowrap; background-color: #ffff8b'

    }else{
      return 'text-align: center; padding-left: 470pt; white-space: nowrap; background-color: #ff867c'
    }
})

Blaze.registerHelper("getCategoryStylе", function(total) {
    var total = parseFloat(total)
    if(!total || total == 0.0){
      return 'white-space: nowrap;'
    }

    if(total>=55){

      return 'text-align: center; white-space: nowrap; background-color: #b2fab4'

    }else if(total>=40 && total < 55){

      return 'text-align: center; white-space: nowrap; background-color: #ffff8b'

    }else{
      return 'text-align: center; white-space: nowrap; background-color: #ff867c'
    }
})

Blaze.registerHelper("getStylе", function(point) {
    var point = parseFloat(point)
    if(!point || point == 0.0){
      return 'white-space: nowrap;'
    }
    if(point>=11){
      return 'white-space: nowrap; background-color: #b2fab4'
    }else if(point>=8 && point < 11){
      return 'white-space: nowrap; background-color: #ffff8b'
    }else{
      return 'white-space: nowrap; background-color: #ff867c'
    }
})



Blaze.registerHelper("subjectName", function(subjectId) {
    return Subjects.findOne({subjectId:subjectId}) ? Subjects.findOne({subjectId:subjectId}).name_kz : undefined
})

Blaze.registerHelper("subjectFromEnglish", function(subject) {
    return Subjects.findOne({name_en:subject}) ? Subjects.findOne({name_en:subject}).name_kz : undefined
})

Blaze.registerHelper("monthName", function(monthId) {
    return TimeFormat.findOne({monthId:monthId}) ? TimeFormat.findOne({monthId:monthId}).monthKazakh : undefined
})

Blaze.registerHelper("eventName", function(event) {
    return SchoolPerformaCriterias.findOne({criteria:event}) ? SchoolPerformaCriterias.findOne({criteria:event}).criteria_kaz : undefined
})

Blaze.registerHelper("olympiadName", function(olympiadId) {
    return Olympiads.findOne({olympiadId:olympiadId}) ? Olympiads.findOne({olympiadId:olympiadId}).name : undefined
})

Blaze.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue,
        "<": lvalue < rvalue,
        ">": lvalue > rvalue
    }[operator];
})

Blaze.registerHelper("swapToChars", function(index, value) {
    value = parseFloat(value);
    console.log("index: "+index);

    if(index==12){
      if(value == 0) return "жоқ"
      if(value == 1) return "exam"
      if(value == 2) return "exam + uploaded"

    }else if(index==13){
      if(value == 0) return "жоқ"
      if(value == 1) return "иә"
    }

    return value;
})

Blaze.registerHelper("swapToChars2", function(index, value) {
    value = parseFloat(value);

    if(index==13){
      if(value == 0) return "жоқ"
      if(value == 1) return "иә"
    }

    return value;
})

Blaze.registerHelper("strelki", function(ubtPrev, ubtNext) {
    ubtPrev = parseInt(ubtPrev)
    ubtNext = parseInt(ubtNext)

    if(ubtNext != 0){
      if(ubtPrev < ubtNext) return true;
	       // return new Blaze.SafeString('<i class="glyphicon glyphicon-arrow-up"></i>');
    }
})

Blaze.registerHelper("round", function(value,number) {
    return number.toFixed(value)
})

Blaze.registerHelper("notZero", function(value) {
    return value != null  &&  value != 0 && value != 0.00
})

Blaze.registerHelper("divide", function(value,number) {
    return value/number
})
let date = new Date();
let year = date.getFullYear();
let nextYear = year+1;

// academicYear = new ReactiveVar(year+'-'+nextYear)
academicYear = new ReactiveVar('2019-2020')
