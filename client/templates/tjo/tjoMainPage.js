import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tjoMainPage.html';
Template.tjoMainPage.onCreated(function() {
    let template = this
    template.month_select = new ReactiveVar('annual')
    //template.month_select_general = new ReactiveVar('annual')
    document.title = "Басты бет ТЖО";
    template.subscribe('schoolsTjo')
    template.autorun(()=>{
        // template.subscribe("schoolPerformaRatings",academicYear.get())
    })
    //template.subscribe('allSchoolPerformaRatings', academicYear.get())
})
Template.tjoMainPage.helpers({
	schoolResults() {
		let month_select = new RegExp(Template.instance().month_select.get())

		return SchoolPerformaRatings.find({month: month_select})
	},
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    school() {
    	return Schools.find()
    }
});

Template.tjoMainPage.events({
	"change #select"(event,template) {
        template.month_select.set(template.find('[name=month_select]').value)

        let month_select = FlowRouter.getParam('_id')
    },
})
