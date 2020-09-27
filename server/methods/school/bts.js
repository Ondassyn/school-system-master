import { upload0 } from "../../modules/bts/upload0";
import { calculateRating } from "../../modules/bts/rating";

Meteor.methods({
    'BtsResults.Upload':function(academicYear,btsNo,day,results) {
        bts = Configs.findOne({
            _id: 'btsUpload'
        });
        if (bts[btsNo] == 'disabled')
            throw new Meteor.Error('upload-disabled', 'БТС жүктеу жабық.Өтініш, IT Department-ке хабарласыңыз.')

        if(!Roles.userIsInRole(this.userId,'school'))
            throw new Meteor.Error('access-denied', 'Access denied!')


        let school = Schools.findOne({
            userId: this.userId
        })
        if(!school) school = Schools.findOne({coordinatorId:this.userId})

        if (school) {
            upload0(academicYear,btsNo,day,school.schoolId,results)
            calculateRating(academicYear,btsNo,day,school.schoolId)

        }

    },
});
