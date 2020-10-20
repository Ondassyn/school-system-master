import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'teacher.updateTeacherPassword': function (teacher, newPassword){
        TeacherAccounts.update({userId: teacher.userId}, { $set: {password: newPassword}});
    }
});