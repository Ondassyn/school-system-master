import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './allTeachersRating.html';

Template.allTeachersRating.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    //template.week = new ReactiveVar("all")
    template.schoolId_select = new ReactiveVar("")

    template.subscribe("schools")
    template.subscribe("subjects")
    template.autorun(()=>{
        template.subscribe("teacherGeneralPerformaRating",academicYear.get(),FlowRouter.getParam("quarter"))
    })
})

Template.allTeachersRating.helpers({
    quarter() {
        return FlowRouter.getParam('quarter')
    },
    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },
    results() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        //let week = new Template.instance().week.get()

        return TeacherPerformaRating.find({
            schoolId:schoolId_select,
            name:name_search,
            surname:surname_search,
            //week:'all',
        },{sort:{total:-1,schoolId:1,surname:1,name:1,subjectId:1}})
    }
});

Template.allTeachersRating.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
    },
    "change #select"(event,template) {
        //template.week.set(template.find('[name=week]').value)
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)

        let schoolId_select = FlowRouter.getParam('_id')
        //let week = FlowRouter.getParam('_id')
    }    
})

