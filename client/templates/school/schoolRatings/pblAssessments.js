import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './pblAssessments.html';
Template.pblAssessments.onCreated(function() {
    let template = this

    template.month_select = new ReactiveVar()
    template.subscribe("timeFormat")
    template.autorun(()=>{
        template.subscribe("schoolAssessments",academicYear.get())
    })
})

Template.pblAssessments.helpers({
    results() {

        let month_select = new RegExp(Template.instance().month_select.get())

        return SchoolAssessments.find({event:'pbl', month: month_select},{sort:{month:1}})
    }
})

Template.pblAssessments.events({
    
    "click #save"(event,template) {
        event.preventDefault()

        let end_date = template.find("[name=end_date]").value
        let month = end_date.slice(0,2)

        let meetingDetails = {
            academicYear: academicYear.get(),
            event: 'pbl',
            month: month,
            start_date: template.find("[name=start_date]").value,
            end_date: end_date,
            detail: template.find("[name=detail]").value,
        }

        if (end_date || month) {
            Meteor.call("pblAssessments.Insert",meetingDetails,function(err) {
                if (err) {
                    alert(err.reason)
                } else {
    	    	alert("Сақталды")
    	    }
            })
        } else {
            alert("Аяқталған уақытын тандаңыз")
        }
    },
    "click #delete"(event,template) {
        if (confirm('Өшіргіңіз келеді ме?')) {

            Meteor.call("pblAssessments.Delete", this._id, function(err) {
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

Template.pblAssessments.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
