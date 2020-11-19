import { Meteor } from 'meteor/meteor'

Meteor.publish('schoolStudents', function() {
    if(this.userId) {
        let school = Schools.findOne({userId: this.userId});
        if(school) {
            return Students.find({schoolId: school.schoolId});
        }
    }
    return this.ready();
})
