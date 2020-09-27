import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsArhiv.html';

Template.btsArhiv.onCreated(function() {
    let template = this
    
})

Template.btsArhiv.helpers({
    clickedButton() {
        return "clicked"==Template.instance().state.get()
    },
})

Template.btsArhiv.events({
    "change #select"(event,template) {
        template.subject.set(template.find('[name=subject]').value)
        template.jobaToChoose.set(template.find('[name=jobaToChoose]').value)
        template.subjectToChoose.set(template.find('[name=subjectToChoose]').value)
        template.studentToChoose.set(template.find('[name=studentToChoose]').value)
        template.grade.set(template.find('[name=grade]').value)

        let subject = FlowRouter.getParam('_id')
        let jobaToChoose = FlowRouter.getParam('_id')
        let subjectToChoose = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
        let studentToChoose = FlowRouter.getParam('_id')
    },


    "click #save"(event,template) {
        event.preventDefault()

        let studentId = template.find('[name=studentToChoose]').value

    },

})

Template.btsArhiv.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
