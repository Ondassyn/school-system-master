import { Meteor } from 'meteor/meteor';

Meteor.methods({

    updateSchoolPassword(school, passwordTxt) {
        //adminRequired()

        var schoolAccounts = {
            schoolAccount: 'school'+school.schoolId,
            schoolPassword: passwordTxt
        }

        console.log('updateSchoolPassword');
        console.log(schoolAccounts.schoolAccount);
        console.log('pass: '+schoolAccounts.schoolPassword);
        Schools.update({_id:school._id}, {$set: schoolAccounts})

    },
    resetStudentPassword(studentId) {
        //adminRequired()
        let student = Students.findOne({studentId: studentId})
        if (student) {
            Accounts.setPassword(student.userId,'student'+student.studentId)
        }
    }
})
