import { calculateRating } from "../../modules/bts/rating";
import { recheck } from "../../modules/turkish/recheck";
import { calculateObj } from "../../modules/bts/calculateObj"


Meteor.methods({
    "TurkishAnswerKeys.Insert": function (answerKeys) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')
        
            //check if same variant exists in database
        sameVariant = TurkishAnswerKeys.findOne({
            academicYear: answerKeys.academicYear,
            grade: answerKeys.grade,
            variant: answerKeys.variant
        })
        if (sameVariant)
            throw new Meteor.Error(322, 'Answer keys with same variant already exists please change variant')
        keysId = TurkishAnswerKeys.insert(answerKeys)
        return keysId;
    },


    "TurkishAnswerKeys.Delete": function(id) {
            if(Roles.userIsInRole(this.userId,['admin'])) {
                let answerKeys = TurkishAnswerKeys.findOne({_id:id})
                if(answerKeys) {
                    TurkishAnswerKeys.remove({_id:id})
                }
            } else {
                throw new Meteor.Error('auth-error','Admin rights required.')
            }
    },


    "TurkishAnswerKeys.Update": function(id,answerKeys) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')
        
        sameVariant = TurkishAnswerKeys.findOne({_id:id});
        if (sameVariant) {
            TurkishAnswerKeys.update({_id:id},{$set:answerKeys})
            /*let config = Configs.findOne({_id:"turkishUpload"})
            if (config == "enabled") {
                //let schools = Schools.find().fetch()
                
                // recheck student results
                recheck(sameVariant.academicYear,sameVariant.variant)
                //
                console.log("admin: calculated rating for schools")
            }*/
            // recheck student results
            recheck(sameVariant.academicYear,sameVariant.variant)
                            //
            console.log("admin: calculated rating for schools")
        }
    }
});
