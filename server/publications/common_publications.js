import { Meteor } from 'meteor/meteor'

Meteor.publish('subjects', function(){
    return Subjects.find()
})

Meteor.publish('timeFormat', function(){
    return TimeFormat.find()
})

Meteor.publish('schoolPerformaCriterias', function(){
    return SchoolPerformaCriterias.find()
})

Meteor.publish('kboSubjects',function() {
    return KboCourses.find()
})

Meteor.publish('btsElectiveGroup',function() {
    return BtsElectiveGroup.find()
})

Meteor.publish('schools',function() {
    return Schools.find()
})

Meteor.publish('schoolsTjo',function() {
    return SchoolsTjo.find()
})

Meteor.publish('school',function(){
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})

        if(school) {
            let cursor = Schools.find({schoolId:school.schoolId})
            return cursor
        }
    } else {
        return this.ready()
    }
})

Meteor.publish('schoolAssessments',function(academicYear) {
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
        let cursor = SchoolAssessments.find({academicYear:academicYear,schoolId:school.schoolId})
        return cursor
    } else {
        return this.ready()
    }
})

Meteor.publish('allSchoolAssessments',function(academicYear) {
    if (this.userId) {
        return SchoolAssessments.find({academicYear:academicYear})
    } else {
        return this.ready()
    }
})

Meteor.publish("schoolAssessment",function(schoolId,academicYear) {
    if (this.userId) {
        return SchoolAssessments.find({schoolId:schoolId,academicYear:academicYear})
    }
    return this.ready()
})

Meteor.publish('schoolPerformaRatings',function(academicYear) {
    let school;
    if (this.userId) {
        school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
        
        let cursor = SchoolPerformaRatings.find({academicYear:academicYear,schoolId:school.schoolId})

        return cursor
    } else {
        return this.ready()
    }
})

Meteor.publish('allSchoolPerformaRatings',function(academicYear) {
    if (this.userId) {
        return SchoolPerformaRatings.find({academicYear:academicYear})
    } else {
        return this.ready()
    }
})

Meteor.publish('olympiads',function() {
    return Olympiads.find()
})

Meteor.publish('joba', function() {
    return Joba.find()
})

Meteor.publish('olympiadResults',function(academicYear) {
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
        if(school) {
            let cursor = OlympiadResults.find({academicYear:academicYear,schoolId:school.schoolId})
            return cursor
        }
    } else {
        return this.ready()
    }
})

Meteor.publish('jobaResults',function(academicYear) {
    if (this.userId) {
        let school = Schools.findOne({userId:this.userId})
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
        if(school) {
            let cursor = JobaResults.find({academicYear:academicYear,schoolId:school.schoolId})
            return cursor
        }
    } else {
        return this.ready()
    }
})

Meteor.publish('olympiadAllResults',function(academicYear) {
    if (this.userId) {
            return OlympiadResults.find({academicYear:academicYear})
    } else {
        return this.ready()
    }
})

Meteor.publish('jobaAllResults',function(academicYear) {
    if (this.userId) {
            return JobaResults.find({academicYear:academicYear})
    } else {
        return this.ready()
    }
})

Meteor.publish('olympiadRatings',function(academicYear) {
    if (this.userId) {
            return OlympiadRatings.find({academicYear:academicYear})
    } else {
        return this.ready()
    }
})

Meteor.publish('jobaRatings',function(academicYear) {
    if (this.userId) {
            return JobaRatings.find({academicYear:academicYear})
    } else {
        return this.ready()
    }
})
