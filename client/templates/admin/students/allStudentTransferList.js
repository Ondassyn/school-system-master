import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './allStudentTransferList.html';

Template.allStudentTransferList.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.subscribe("transferStudents")
    template.subscribe("schools")
})

Template.allStudentTransferList.helpers({
    students() {
        let name_search = new RegExp(Template.instance().name_search.get())
        let surname_search = new RegExp(Template.instance().surname_search.get())

        return StudentTransferList.find({
            name:name_search,
            surname:surname_search,
        },{sort:{grade:1,division:1,surname:1,name:1}})
    }
});

Template.allStudentTransferList.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
    },
    "click #delete"(event,template) {
        if (confirm('Оқушыны тізіміне өшіргіңіз келеді ме?')) {
            Meteor.call('Student.deleteFromList',this._id,function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/admin/students/transfer')
                }
            })
        }

    }
})
