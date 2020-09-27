import { Meteor } from 'meteor/meteor'

Meteor.publish('students', function(){
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
        if(school) {
            let cursor = Students.find({schoolId:school.schoolId, grade: { $in: [ "6","7","8","9","10","11"] }}) //$in: [ "7","8","9","10","11"]
            return cursor
        }
    } else {
        return this.ready()
    }
})

Meteor.publish('allStudents', function(grade){
        return Students.find({grade:grade})
})

Meteor.publish('graduatedStudentList', function(academicYear){
        if (this.userId) {
            return Students.find({grade:academicYear})
        } else {
            return this.ready()
        }
})

Meteor.publish("student",function(student_id) {
    if (this.userId) {
        return Students.find({_id:student_id})
    } else {
        return this.ready()
    }
})

Meteor.publish("transferStudents",function() {
    if (this.userId) {
        return StudentTransferList.find()
    } else {
        return this.ready()
    }
})

Meteor.publish("studentPage",function() {
    if (this.userId) {
        let student = Students.findOne({userId:this.userId})
        if(student) {
            let cursor = Students.find({studentId:student.studentId})
            return cursor
        }
    } else {
        return this.ready()
    }
})

Meteor.publish('btsStudentResults',function(academicYear,btsNo) {
    if (this.userId) {
        let student = Students.findOne({userId:this.userId})
        let cursor = BtsResults.find({academicYear:academicYear,btsNo:btsNo,studentId:student.studentId})
        return cursor
    }
    return this.ready()
})

Meteor.publish('kboStudentResults',function(academicYear,kboNo) {
    if (this.userId) {
        let student = Students.findOne({userId:this.userId})
        let cursor = KboResults.find({academicYear:academicYear,kboNo:kboNo,studentId:student.studentId})
        return cursor
    }
    return this.ready()
})

Meteor.publish('btsStudentObjectivesResults',function(academicYear,quarter) {
    if (this.userId) {
        let student = Students.findOne({userId:this.userId})
        let cursor = BtsObjectivesResults.find({academicYear:academicYear,quarter:quarter,studentId:student.studentId})
        return cursor
    }
    return this.ready()
})
