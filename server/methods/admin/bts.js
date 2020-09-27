import { recheck } from "../../modules/bts/recheck";
import { calculateObj } from "../../modules/bts/calculateObj"
import { calcTotalRating } from "../../modules/bts/totalRating"
import { calculateRating } from "../../modules/bts/rating"


Meteor.methods({

    'BtsResults.studentPlace':function(academicYear, btsNo, studentId, place) {
        // console.log("studentPlace: "+" btsNo: "+btsNo+" studentId: "+studentId+" place: "+place);
          if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
              throw new Meteor.Error(401, 'Please login as administrator')

          let studentResult = BtsResults.findOne({academicYear:academicYear, studentId:studentId, btsNo:btsNo})
          studentResult.place = place;

          BtsResults.update({_id:studentResult._id},{$set:studentResult})

    },

    'BtsResults.calcTotalRating':function(academicYear, btsNo) {
        // let btsNo = "2"
        let btsRatings = BtsRatings.find({academicYear: academicYear, btsNo:btsNo, grade: "all"}).fetch()

        _.each(btsRatings,(btsRating) => {
          calcTotalRating(academicYear, btsRating.schoolId, btsNo)
        })
    },

    'BtsResults.calcSubjectRating':function(academicYear, btsNo) {
        let schools = BtsRatings.find({academicYear:academicYear, btsNo:btsNo, grade: "all"}).fetch()
        console.log("calcSubjectRating: "+btsNo);
        _.each(schools,(school) => {
           calculateRating(academicYear, btsNo, '1', school.schoolId)
           calculateRating(academicYear, btsNo, '2', school.schoolId)
        })
    },

    "BtsAnswerKeys.Insert": function (answerKeys) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

            //check if same variant exists in database
        sameVariant = BtsAnswerKeys.findOne({
            academicYear: answerKeys.academicYear,
            grade: answerKeys.grade,
            quarter: answerKeys.quarter,
            day: answerKeys.day,
            variant: answerKeys.variant
        })
        if (sameVariant)
            throw new Meteor.Error(322, 'Answer keys with same variant already exists please change variant')
        keysId = BtsAnswerKeys.insert(answerKeys)
        return keysId;
    },

    "BtsLevels.Insert": function (levels) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

            //check if same variant exists in database
        sameVariant = BtsLevels.findOne({
            academicYear: levels.academicYear,
            grade: levels.grade,
            quarter: levels.quarter,
            day: levels.day,
            variant: levels.variant
        })
        if (sameVariant)
            throw new Meteor.Error(322, 'Levels with same variant already exists please change variant')
        levelsId = BtsLevels.insert(levels)
        return levelsId;
    },

    "BtsAnswerKeys.Delete": function(id) {
            if(Roles.userIsInRole(this.userId,['admin'])) {
                let answerKeys = BtsAnswerKeys.findOne({_id:id})
                if(answerKeys) {
                    BtsAnswerKeys.remove({_id:id})
                }
            } else {
                throw new Meteor.Error('auth-error','Admin rights required.')
            }
    },

    "BtsLevels.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,['admin'])) {
            let levels = BtsLevels.findOne({_id:id})
            if(levels) {
                BtsLevels.remove({_id:id})
            }
        } else {
            throw new Meteor.Error('auth-error','Admin rights required.')
        }
},

    "BtsAnswerKeys.Update": function(id,answerKeys) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

        sameVariant = BtsAnswerKeys.findOne({_id:id});
        if (sameVariant) {
            BtsAnswerKeys.update({_id:id},{$set:answerKeys})
            let config = Configs.findOne({_id:"btsUpload"})
            if (config[sameVariant.quarter] == "enabled") {
                //let schools = Schools.find().fetch()

                // recheck student results
                recheck(sameVariant.academicYear,sameVariant.quarter,sameVariant.variant,sameVariant.day)
                //
                console.log("admin: calculated rating for schools")
            }
        }
    },

    "BtsLevels.Update": function(id,levels) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

        sameVariant = BtsLevels.findOne({_id:id});
        if (sameVariant) {
            BtsLevels.update({_id:id},{$set:levels})
            let config = Configs.findOne({_id:"btsUpload"})
            if (config[sameVariant.quarter] == "enabled") {
                //let schools = Schools.find().fetch()

                // recheck student results
                recheck(sameVariant.academicYear,sameVariant.quarter,sameVariant.variant,sameVariant.day)
                //
                console.log("admin: calculated rating for schools")
            }
        }
    },


    "BtsObjectives.Insert": function (objectives) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

            //check if same variant exists in database
        sameObjective = BtsObjectivesList.findOne({
            academicYear: objectives.academicYear,
            grade: objectives.grade,
            quarter: objectives.quarter,
            variant1: objectives.variant1,
            variant2: objectives.variant2,
            objectiveId: objectives.objectiveId
        })
        if (sameObjective)
            throw new Meteor.Error(322, 'same objective already exists')
        objectiveId = BtsObjectivesList.insert(objectives)
        return objectiveId;
    },

    "BtsObjectives.Delete": function(id) {
            if(Roles.userIsInRole(this.userId,['admin'])) {
                let objective = BtsObjectivesList.findOne({_id:id})
                if(objective) {
                    BtsObjectivesList.remove({_id:id})
                }
            } else {
                throw new Meteor.Error('auth-error','Admin rights required.')
            }
    },

    "BtsObjectives.Update": function(id,objectives) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

        sameObjective = BtsObjectivesList.findOne({_id:id});
        if (sameObjective) {
            BtsObjectivesList.update({_id:id},{$set:objectives})
        }
    },

    'BtsObjectives.Calculate':function(academicYear,btsNo,grade) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

        bts = Configs.findOne({
            _id: 'btsUpload'
        });
        if (bts[btsNo] == 'disabled')
            throw new Meteor.Error('upload-disabled', 'БТС жүктеу жабық.Өтініш, IT Department-ке хабарласыңыз.')
                if (!Roles.userIsInRole(this.userId,"admin"))
            throw new Meteor.Error('access-denied', 'Access denied!')
            calculateObj(academicYear,btsNo,grade)
            //console.log("it's ok !")

    }
});
