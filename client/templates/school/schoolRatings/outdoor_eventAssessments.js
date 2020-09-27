import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './outdoor_eventAssessments.html';
Template.outdoor_eventAssessments.onCreated(function() {
    let template = this

    template.month_select = new ReactiveVar()
    template.scope_select = new ReactiveVar('city')
    template.subscribe("timeFormat")
    template.autorun(()=>{
        template.subscribe("schoolAssessments",academicYear.get())
    })
})

Template.outdoor_eventAssessments.helpers({
    results() {

        let month_select = new RegExp(Template.instance().month_select.get())

        return SchoolAssessments.find({event:'outdoor_event', month: month_select},{sort:{month:1}})
    }
})

Template.outdoor_eventAssessments.events({
    "click #save"(event,template) {
        event.preventDefault()

        let date = template.find("[name=date]").value
        let month = date.slice(0,2)

        let meetingDetails = {
            academicYear: academicYear.get(),
            event: 'outdoor_event',
            month: month,
            date: date,
            scope: template.find("[name=scope_select]").value,
            detail: template.find("[name=detail]").value,
        }

        Meteor.call("outdoor_eventAssessments.Insert",meetingDetails,function(err) {
            if (err) {
                alert(err.reason)
            } else {
	    	alert("Сақталды")
	    }
        })
    },
    "click #delete"(event,template) {
        if (confirm('Өшіргіңіз келеді ме?')) {

            Meteor.call("outdoor_eventAssessments.Delete", this._id, function(err) {
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

Template.outdoor_eventAssessments.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
