import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './allTeachersTransfer.html';

Template.allTeachersTransfer.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.subscribe("transferTeachers")
    template.subscribe("schools")
    template.subscribe("subjects")
})

Template.allTeachersTransfer.helpers({
    teachers() {
        let name_search = new RegExp(Template.instance().name_search.get(),'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(),'i')

        return TeacherTransferList.find({
            name:name_search,
            surname:surname_search,
        },{sort:{schoolId:1,subjectId:1,surname:1,name:1}})
    }
});

Template.allTeachersTransfer.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
    },

    "click #delete"(event,template) {
        if (confirm('Мұғалімді өшіргіңіз келеді ме?')) {
            Meteor.call("Teacher.deleteFromList", this._id, function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/admin/allTeachers/transfer')
                }
            })
        }
    }

})
