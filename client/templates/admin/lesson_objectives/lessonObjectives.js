import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './lessonObjectives.html';
Template.lessonObjectives.onCreated(function() {
    let template = this
    template.grade_select = new ReactiveVar('7')
    template.subject_select = new ReactiveVar('01')
    template.objective_search = new ReactiveVar()

    template.subscribe('subjects')
    template.subscribe("lessonObjectives")

})

Template.lessonObjectives.helpers({
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    objectives() {
        let grade_select = new RegExp(Template.instance().grade_select.get())
        let subject_select = new RegExp(Template.instance().subject_select.get())
        let objective_search = new RegExp(Template.instance().objective_search.get(),'i')

        return LessonObjectives.find({
            grade:grade_select,
            subjectId:subject_select,
            id:objective_search

        },{sort:{subjectId:1,grade:1,id:1}})
    },

})

Template.lessonObjectives.events({
    
    "keyup #search"(event,template) {
        template.objective_search.set(template.find('[name=objective_search]').value)
    },

    "change #select"(event,template) {
        template.grade_select.set(template.find('[name=grade_select]').value)
        template.subject_select.set(template.find('[name=subject_select]').value)

        let grade_select = FlowRouter.getParam('_id')
        let subject_select = FlowRouter.getParam('_id')

    },

    "click #delete"(event,template) {
        if (confirm('Сабақ мақсатты өшіргіңіз келеді ме?')) {
            Meteor.call("lessonObjectives.Delete", this._id, function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/admin/lessonObjectives')
                }
            })
        }
    }
})