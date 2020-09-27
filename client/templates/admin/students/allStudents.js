import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './allStudents.html';

Template.allStudents.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.division_search = new ReactiveVar("")
    template.schoolId_select = new ReactiveVar("")

    template.autorun(()=>{
        template.subscribe("allStudents", FlowRouter.getParam("grade"))
    })
    template.subscribe("schools")
    template.subscribe("kboSubjects")
})

Template.allStudents.helpers({

    getGrade() {
        return FlowRouter.getParam('grade')
    },

    students() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let division_search = new RegExp(Template.instance().division_search.get(), 'i')
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        return Students.find({
            name:name_search,
            surname:surname_search,
            division:division_search,
            schoolId:schoolId_select
        },{sort:{schoolId:1,division:1,surname:1,name:1}})
    },

    schools() {
        return Schools.find({},{sort:{schoolId:1}})
    },

    subjects() {
        return KboCourses.find({},{sort:{subjectId:1}})
    },

});

Template.allStudents.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
        template.division_search.set(template.find('[name=division_search]').value)
    },
    "change #select"(event,template) {
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)

        let schoolId_select = FlowRouter.getParam('_id')

    }
})
