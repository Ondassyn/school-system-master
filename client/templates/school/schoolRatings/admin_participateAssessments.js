import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './admin_participateAssessments.html';
Template.admin_participateAssessments.onCreated(function() {
    let template = this

    template.month_select = new ReactiveVar()
    template.scope_select = new ReactiveVar('vice-principal')
    template.subscribe("timeFormat")
    template.autorun(()=>{
        template.subscribe("schoolAssessments",academicYear.get())
    })
})

Template.admin_participateAssessments.helpers({
    results() {

        let month_select = new RegExp(Template.instance().month_select.get())

        return SchoolAssessments.find({event:'admin_participate', month: month_select},{sort:{month:1}})
    }
})

Template.admin_participateAssessments.events({
    
    "click #save"(event,template) {
        event.preventDefault()

        let date = template.find("[name=date]").value
        let month = date.slice(0,2)

        let meetingDetails = {
            academicYear: academicYear.get(),
            event: 'admin_participate',
            month: month,
            date: date,
            scope: template.find("[name=scope_select]").value,
            detail: template.find("[name=detail]").value,
        }

        if (date) {
            Meteor.call("admin_participateAssessments.Insert",meetingDetails,function(err) {
                if (err) {
                    alert(err.reason)
                } else {
    	    	alert("Сақталды")
    	    }
            })
        }
        else {
            alert("дата таңдалмады!")
        }
    },
    "click #delete"(event,template) {
        if (confirm('Өшіргіңіз келеді ме?')) {
            Meteor.call("admin_participateAssessments.Delete", this._id, function(err) {
                if(err){
                    alert(err.reason)
                } 
            })
        }
    },
    "change #select"(event,template) {
        template.month_select.set(template.find('[name=month_select]').value)
        template.scope_select.set(template.find('[name=scope_select]').value)

        let month_select = FlowRouter.getParam('_id')
        let scope_select = FlowRouter.getParam('_id')
    },
})

Template.admin_participateAssessments.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});