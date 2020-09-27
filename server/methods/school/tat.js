import { upload } from "../../modules/tat/upload";
import { calculateRating } from "../../modules/tat/rating";

Meteor.methods({
    'TatResults.Upload':function(academicYear,tatNo,rows){
        tat = Configs.findOne({
            _id: 'tatUpload'
        });
        if (tat[tatNo] == 'disabled')
            throw new Meteor.Error('upload-disabled', 'TAT жүктеу жабық.Өтініш, IT Department-ке хабарласыңыз.')

        if(!Roles.userIsInRole(this.userId,'school') && !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            throw new Meteor.Error('access-denied', 'Access denied!')

        // upload(academicYear,tatNo,'040',rows)

        let school = Schools.findOne({
            userId: this.userId
        })

        if (school) {
            upload(academicYear,tatNo,school.schoolId,rows)
            calculateRating(academicYear,tatNo,school.schoolId)
        }
    }
});
