import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './indoorEventAssessments.html';
Template.indoorEventAssessments.onCreated(function() {
    let template = this

    template.month_select = new ReactiveVar()
    template.subscribe("timeFormat")
    template.autorun(()=>{
        template.subscribe("schoolAssessments",academicYear.get())
    })
})

Template.indoorEventAssessments.helpers({
    results() {

        let month_select = new RegExp(Template.instance().month_select.get())

        return SchoolAssessments.find({event:'indoorEvent', month: month_select},{sort:{month:1}})
    }
})

Template.indoorEventAssessments.events({
    
    "click #save"(event,template) {
        event.preventDefault()

        let date = template.find("[name=date]").value
        let month = date.slice(0,2)

        let meetingDetails = {
            academicYear: academicYear.get(),
            event: 'indoorEvent',
            month: month,
            date: date,
            detail: template.find("[name=detail]").value,
        }

        Meteor.call("indoorEventAssessments.Insert",meetingDetails,function(err) {
            if (err) {
                alert(err.reason)
            } else {
	    	alert("Сақталды")
	    }
        })
    },
    "click #delete"(event,template) {
        if (confirm('Өшіргіңіз келеді ме?')) {

            Meteor.call("indoorEventAssessments.Delete", this._id, function(err) {
                if(err){
                    alert(err.reason)
                } 
            })
        }
    },
    "change #select"(event,template) {
        template.month_select.set(template.find('[name=month_select]').value)

        let month_select = FlowRouter.getParam('_id')
    },
})

Template.indoorEventAssessments.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
