import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './meetingAssessments.html';
Template.meetingAssessments.onCreated(function() {
    let template = this

    template.month_select = new ReactiveVar()
    template.subscribe("timeFormat")
    template.autorun(()=>{
        template.subscribe("schoolAssessments",academicYear.get())
    })
})

Template.meetingAssessments.helpers({
    results() {

        let month_select = new RegExp(Template.instance().month_select.get())

        return SchoolAssessments.find({event:'meeting', month: month_select},{sort:{month:1}})
    }
})

Template.meetingAssessments.events({
    
    "click #save"(event,template) {
        event.preventDefault()

        let date = template.find("[name=date]").value
        let month = date.slice(0,2)

        let meetingDetails = {
            academicYear: academicYear.get(),
            event: 'meeting',
            month: month,
            date: date,
            detail: template.find("[name=detail]").value,
        }

        Meteor.call("meetingAssessments.Insert",meetingDetails,function(err) {
            if (err) {
                alert(err.reason)
            } else {
	    	alert("Сақталды")
	    }
        })
    },
    "click #delete"(event,template) {
        if (confirm('Өшіргіңіз келеді ме?')) {

            Meteor.call("meetingAssessments.Delete", this._id, function(err) {
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

Template.meetingAssessments.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

