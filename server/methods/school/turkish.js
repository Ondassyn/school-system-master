import { upload } from "../../modules/turkish/upload";
import { calculateRating } from "../../modules/turkish/rating";

Meteor.methods({
    'TurkishResults.Upload':function(academicYear,results) {

        /*exam = Configs.findOne({
            _id: 'turkishUpload'
        });
        if (exam == 'disabled')
            throw new Meteor.Error('upload-disabled', 'Жүктеу жабық.Өтініш, IT Department-ке хабарласыңыз.')
        */
        if (!Roles.userIsInRole(this.userId,"school"))
            throw new Meteor.Error('access-denied', 'Access denied!')


        let school = Schools.findOne({
            userId: this.userId
        })

        if (school) {
            upload(academicYear,school.schoolId,results)
            calculateRating(academicYear,school.schoolId)
        }
    }
});
