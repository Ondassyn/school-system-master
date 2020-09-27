import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './generalRating.html';
Template.generalRating.onCreated(function() {
    let template = this
    template.month_select = new ReactiveVar('annual')
    template.month_select_general = new ReactiveVar('annual')

    template.subscribe("subjects")
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('allSchoolPerformaRatings', academicYear.get())
    })
})
Template.generalRating.helpers({
	allSchoolResults() {

		let month_select_general = new RegExp(Template.instance().month_select_general.get())

		return SchoolPerformaRatings.find({month: month_select_general},{sort:{total_points:-1}})
	},
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    school() {
    	return Schools.find()
    }
});

Template.generalRating.events({
	"change #select"(event,template) {
        template.month_select_general.set(template.find('[name=month_select_general]').value)

        let month_select_general = FlowRouter.getParam('id')
    },
})
