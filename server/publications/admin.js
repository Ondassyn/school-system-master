import { Meteor } from 'meteor/meteor'

Meteor.publish('userList', function (){
  return Meteor.users.find({});
});

Meteor.publish('configAccounts', function (){
  return Configs.find({_id: "accounts"});
});

Meteor.publish('guestSchools',function() {
    return GuestSchools.find()
})

Meteor.publish('currentGuestSchools',function(userId) {
    return GuestSchools.find({userId: userId})

})

Meteor.publish('opeAdminReports', function(academicYear, schoolId, reportPeriod) {
    if (this.userId) {
        let cursor = OpeReports.find({academicYear:academicYear, reportPeriod:reportPeriod, schoolId:schoolId})
        return cursor
    }
    return this.ready()
})

Meteor.publish('ubtAdminResults',function(academicYear, schoolId) {
    if (this.userId) {
        let cursor = UhdResults.find({academicYear:academicYear,schoolId:schoolId})
        return cursor
    } else {
        return this.ready()
    }
})

Meteor.publish('btsKeys', function(academicYear, quarter){
	if (this.userId) {
		return BtsAnswerKeys.find({academicYear:academicYear,quarter:quarter})
	}
	return this.ready()
})

Meteor.publish('turkishKeys', function(academicYear){
	if (this.userId) {
		return TurkishAnswerKeys.find({academicYear:academicYear})
	}
	return this.ready()
})

Meteor.publish('btsLevels', function(academicYear, quarter){
	if (this.userId) {
		return BtsLevels.find({academicYear:academicYear,quarter:quarter})
	}
	return this.ready()
})

Meteor.publish('btsSchoolKeys', function(academicYear){
	if (this.userId) {
		return BtsAnswerKeys.find({academicYear:academicYear})
	}
	return this.ready()
})

Meteor.publish('turkishSchoolKeys', function(academicYear){
	if (this.userId) {
		return TurkishAnswerKeys.find({academicYear:academicYear})
	}
	return this.ready()
})

Meteor.publish('btsSchoolLevels', function(academicYear){
	if (this.userId) {
		return BtsLevels.find({academicYear:academicYear})
	}
	return this.ready()
})

Meteor.publish("btsKey", function(keyId) {
	if (this.userId) {
		return BtsAnswerKeys.find({_id:keyId})
	}
	return this.ready()
})

Meteor.publish("turkishKey", function(keyId) {
	if (this.userId) {
		return TurkishAnswerKeys.find({_id:keyId})
	}
	return this.ready()
})

Meteor.publish("btsLevel", function(keyId) {
	if (this.userId) {
		return BtsLevels.find({_id:keyId})
	}
	return this.ready()
})

Meteor.publish('btsObjectivesList',function(academicYear,quarter) {
    if (this.userId) {
        return BtsObjectivesList.find({academicYear:academicYear,quarter:quarter})
    }
    return this.ready()
})

Meteor.publish("btsObjective", function(objectiveId) {
	if (this.userId) {
		return BtsObjectivesList.find({_id:objectiveId})
	}
	return this.ready()
})

Meteor.publish('lessonObjectives',function() {
    if (this.userId) {
        return LessonObjectives.find()
    }
    return this.ready()
})

Meteor.publish("lessonObjective", function(objectiveId) {
    if (this.userId) {
        return LessonObjectives.find({_id:objectiveId})
    }
    return this.ready()
})

Meteor.publish('tatKeys', function(academicYear,tatNo){
	if (this.userId) {
		return TatAnswerKeys.find({academicYear:academicYear,tatNo:tatNo})
	}
	return this.ready()
})

Meteor.publish('tatSchoolKeys', function(academicYear){
	if (this.userId) {
		return TatAnswerKeys.find({academicYear:academicYear})
	}
	return this.ready()
})

Meteor.publish("tatKey",function (id) {
	if (this.userId) {
		return TatAnswerKeys.find({_id: id})
	}
	return this.ready()
})

Meteor.publish('kboKeysGeneral', function(){
	if (this.userId) {
		return KboKeys.find()
	}
	return this.ready()
})

Meteor.publish('kboKeys', function(academicYear,kboNo){
	if (this.userId) {
		return KboKeys.find({academicYear:academicYear,kboNo:kboNo})
	}
	return this.ready()
})

Meteor.publish('kboSchoolKeys', function(academicYear){
	if (this.userId) {
		return KboKeys.find({academicYear:academicYear})
	}
	return this.ready()
})

Meteor.publish("kboKey",function (id) {
	if (this.userId) {
		return KboKeys.find({_id: id})
	}
	return this.ready()
})

Meteor.publish("configs",function() {
	if (this.userId) {
		return Configs.find()
	}
	return this.ready()
})
