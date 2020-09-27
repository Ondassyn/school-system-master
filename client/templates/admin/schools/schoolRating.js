import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './schoolRating.html';
Template.schoolRating.onCreated(function() {
    let template = this
    template.month_select = new ReactiveVar('')
    template.event_select = new ReactiveVar('')
    template.eventScope = new ReactiveVar()
    template.attendScope = new ReactiveVar()

    template.subscribe("subjects")
    template.subscribe('schools')
    template.subscribe('timeFormat')
    template.subscribe('schoolPerformaCriterias')
    template.autorun(()=>{
        template.subscribe('schoolAssessment',FlowRouter.getParam("schoolId"),academicYear.get())
    })
})
Template.schoolRating.helpers({
    eventScope() {
        return "outdoor_event"==Template.instance().event_select.get()
    },
    attendScope() {
        return "admin_participate"==Template.instance().event_select.get()
    },
    allEventResults() {
        let month_select = new RegExp(Template.instance().month_select.get())
        let event_select = new RegExp(Template.instance().event_select.get())
        let eventScope = new RegExp(Template.instance().eventScope.get())

        return SchoolAssessments.find({month:month_select, event:'outdoor_event',scope:eventScope},{sort:{month:1}})
    },
    allAttendResults() {
        let month_select = new RegExp(Template.instance().month_select.get())
        let event_select = new RegExp(Template.instance().event_select.get())
        let attendScope = new RegExp(Template.instance().attendScope.get(),'y')

        return SchoolAssessments.find({month:month_select, event:'admin_participate',scope:attendScope},{sort:{month:1}})
    },
	allSchoolResults() {
		let month_select = new RegExp(Template.instance().month_select.get())
        let event_select = new RegExp(Template.instance().event_select.get())

		return SchoolAssessments.find({month:month_select, event:event_select},{sort:{month:1}})
	},
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    school() {
    	return FlowRouter.getParam("schoolId")
    },
    schoolPerforma() {
        return SchoolPerformaCriterias.find()
    }
});

Template.schoolRating.events({
	"change #select"(event,template) {
        event.preventDefault()
        template.month_select.set(template.find('[name=month_select]').value)
        template.event_select.set(template.find('[name=event_select]').value)

        let month_select = FlowRouter.getParam('id')
        let event_select = FlowRouter.getParam('id')
    },
    'change #eventScope'(event,template) {
        event.preventDefault()
        template.eventScope.set(event.target.value)
    },
    'change #attendScope'(event,template) {
        event.preventDefault()
        template.attendScope.set(event.target.value)
    },
    'click #deleteEvent' (event,template) {
        event.preventDefault();

        if (confirm("Өшіргіңіз келеді ме?")) {
            Meteor.call("deleteEvent", this._id, function(err) {
                if (err) {
                    alert(err.reason);
                }
                else {
                    alert("Өшірілді")
                }
            })
        }
    }

})
