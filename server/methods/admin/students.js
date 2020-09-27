import { Meteor } from 'meteor/meteor';
Meteor.methods({

    "Student.deleteFromList": function(student_id) {
        if(Roles.userIsInRole(this.userId,'admin')) {
            let student = StudentTransferList.findOne({_id:student_id})
            if(student) {
                StudentTransferList.remove({_id:student_id})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    }
})
