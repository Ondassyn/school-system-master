import { Meteor } from 'meteor/meteor'

Meteor.publish('allTeachers',function() {
    return Teachers.find()
})

Meteor.publish('teachers', function(){
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
        if(school) {
            let cursor = Teachers.find({schoolId:school.schoolId})
            return cursor
        }
    } else {
        return this.ready()
    }
})

Meteor.publish("teacher",function(student_id) {
    if (this.userId) {
        return Teachers.find({_id:student_id})
    } else {
        return this.ready()
    }
})

Meteor.publish("transferTeachers",function() {
    if (this.userId) {
        return TeacherTransferList.find()
    } else {
        return this.ready()
    }
})

Meteor.publish("teacherPerformaRating",function(academicYear) {
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
        cursor = TeacherPerformaRating.find({academicYear:academicYear,schoolId:school.schoolId})
        return cursor
    } else {
        return this.ready()
    }
})

Meteor.publish("teacherGeneralPerformaRating",function(academicYear,quarter) {
    if (this.userId) {
        return TeacherPerformaRating.find({academicYear:academicYear,week:'all',quarter:quarter})
    } else {
        return this.ready()
    }
})

Meteor.publish("teacherAssessments",function(academicYear) {
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
        cursor = TeacherAssessments.find({academicYear:academicYear,schoolId:school.schoolId})
        return cursor
    } else {
        return this.ready()
    }
})

Meteor.publish("ProfileImages", function() {
    return ProfileImages.find();
})

Meteor.publish("UserImages", function() {
    return UserImages.find();
})
