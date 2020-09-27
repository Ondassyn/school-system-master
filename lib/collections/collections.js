Schools = new Mongo.Collection('schools')
GuestSchools = new Mongo.Collection('guestSchools')

SchoolsTjo = new Mongo.Collection('schoolsTjo')
Teachers = new Mongo.Collection('teachers')
TeacherTransferList = new Mongo.Collection('TeacherTransferList')
Subjects = new Mongo.Collection('subjects')
Students = new Mongo.Collection('students')
StudentTransferList = new Mongo.Collection('StudentTransferList')

BtsRatings = new Mongo.Collection('BtsRatings')
BtsResults = new Mongo.Collection('BtsResults')
BtsAnswerKeys = new Mongo.Collection("BtsAnswerKeys")
TurkishRatings = new Mongo.Collection('TurkishRatings')
TurkishResults = new Mongo.Collection('TurkishResults')
TurkishAnswerKeys = new Mongo.Collection("TurkishAnswerKeys")
BtsLevels = new Mongo.Collection("BtsLevels")

KboRatings = new Mongo.Collection('KboRating')
KboResults = new Mongo.Collection('KboResults')
KboKeys = new Mongo.Collection("KboKeys")

TatRating = new Mongo.Collection('TatRating')
TatResults = new Mongo.Collection('TatResults')
TatAnswerKeys = new Mongo.Collection('TatAnswerKeys')

UhdResults = new Mongo.Collection('UhdResults')
UhdStudentRatings = new Mongo.Collection('UhdStudentRatings')
UhdSchoolRatings = new Mongo.Collection('UhdSchoolRatings')

Olympiads = new Mongo.Collection('Olympiads')
OlympiadResults = new Mongo.Collection('OlympiadResults')
OlympiadRatings = new Mongo.Collection('OlympiadRatings')

OpeResults = new Mongo.Collection('OpeResults')
OpeReports = new Mongo.Collection('OpeReports')
OpeRatings = new Mongo.Collection('OpeRatings')

KetPetResults = new Mongo.Collection('KetPetResults')
KetPetRatings = new Mongo.Collection('KetPetRatings')

Joba = new Mongo.Collection('Joba')
JobaResults = new Mongo.Collection('JobaResults')
JobaRatings = new Mongo.Collection('JobaRatings')

KboCourses = new Mongo.Collection("KboCourses")
IdCounter = new Mongo.Collection("IdCounters")

Configs = new Mongo.Collection("Configs")
TimeFormat = new Mongo.Collection("TimeFormat")

BtsElectiveGroup = new Mongo.Collection('BtsElectiveGroup')
BtsObjectivesList = new Mongo.Collection('BtsObjectivesList')
BtsObjectivesResults = new Mongo.Collection('BtsObjectivesResults')
BtsObjectivesRatings = new Mongo.Collection('BtsObjectivesRatings')

LessonObjectives = new Mongo.Collection('LessonObjectives')

SchoolAssessments = new Mongo.Collection('SchoolAssessments')
SchoolPerformaRatings = new Mongo.Collection('SchoolPerformaRatings')
SchoolPerformaCriterias = new Mongo.Collection('SchoolPerformaCriterias')

TeacherAssessments = new Mongo.Collection('TeacherAssessments')
TeacherPerformaRating = new Mongo.Collection('TeacherPerformaRating')

ProfileImages = new FS.Collection('ProfileImages', {
	stores: [new FS.Store.GridFS('ProfileImages')]
})

ProfileImages.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc, fields, modifier) {
		return true;
	},
	download: function() {
		return true;
	},
	remove: function(userId) {
		return true;
	}
})

UserImages = new Mongo.Collection('UserImages');

UserImages.allow({
	insert: function() {
		return true;
	},
	update: function(userId, doc, fields, modifier) {
		return true;
	},
	remove: function(userId) {
		return true;
	}
})
