import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './olympiadInterResults.html';

Template.olympiadInterResults.onCreated(function() {
    let template = this
    template.subject = new ReactiveVar("")

    template.state = new ReactiveVar('unclicked')
    template.olympiadToChoose = new ReactiveVar("")
    template.subjectToChoose = new ReactiveVar("")
    template.studentToChoose = new ReactiveVar("")
    template.grade = new ReactiveVar("")
    
    template.subscribe('students')
    template.subscribe('teachers')
    template.subscribe('schools')
    template.subscribe('subjects')
    template.subscribe('olympiads')
    template.autorun(()=>{
        template.subscribe("olympiadResults",academicYear.get())
    })
})

Template.olympiadInterResults.helpers({
    clickedButton() {
        return "clicked"==Template.instance().state.get()
    },
    subjectsToChoose() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    student() {
        let subjectToChoose = new RegExp(Template.instance().subjectToChoose.get())
        let grade = new RegExp(Template.instance().grade.get())

        return Students.find({grade:grade,olympiad:subjectToChoose},{sort:{surname:1}})
    },
    olympiadStudent() {
        return OlympiadResults.findOne({_id:this._id})
    },
    teacher() {
        return Teachers.find({},{sort:{surname:1}})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    olympiads(){
        return Olympiads.find({},{sort:{olympiadId:1}})
    },
    results() {
        let subject = new RegExp(Template.instance().subject.get())
        
        return OlympiadResults.find({
            olympiadType:'science',
            subjectId:subject,
            olympiadRegion:'international',
        },{sort:{subjectId:1,grade:1,attendedFor:1}
        })
    },
    selectedState(state,val) {
        let conf = OlympiadResults.findOne({_id:this._id})
        if (conf)
            return conf[state] == val ? "selected" : ""
    },
    selectedAttended(attendedFor,val) {
        let conf = OlympiadResults.findOne({_id:this._id})
        if (conf)
            return conf[attendedFor] == val ? "selected" : ""
    },
    selectedMedal(medal,val) {
        let conf = OlympiadResults.findOne({_id:this._id})
        if (conf)
            return conf[medal] == val ? "selected" : ""
    },
    selectedPlace(place,val) {
        let conf = OlympiadResults.findOne({_id:this._id})
        if (conf)
            return conf[place] == val ? "selected" : ""
    },
    selected(id,teacherId) {
        let olymp_student = OlympiadResults.findOne({_id:id})
        if (olymp_student && parseInt(olymp_student.teacherId) == teacherId)
            return 'selected'
    }
})

Template.olympiadInterResults.events({
    "change #select"(event,template) {
        template.subject.set(template.find('[name=subject]').value)
        template.olympiadToChoose.set(template.find('[name=olympiadToChoose]').value)
        template.subjectToChoose.set(template.find('[name=subjectToChoose]').value)
        template.studentToChoose.set(template.find('[name=studentToChoose]').value)
        template.grade.set(template.find('[name=grade]').value)
        
        let subject = FlowRouter.getParam('_id')
        let olympiadToChoose = FlowRouter.getParam('_id')
        let subjectToChoose = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
        let studentToChoose = FlowRouter.getParam('_id')
    },

    "change #attendedFor"(event,template) {
        event.preventDefault()
        Meteor.call("Student.editAttendedFor",this._id, event.target.value)
    },

    "change #medal"(event,template) {
        event.preventDefault()
        Meteor.call("Student.editMedal",this._id, event.target.value)
    },

    "change #teacher"(event,template) {
        event.preventDefault()
        Meteor.call('Student.editTeacher',this._id,event.target.value)
    },

    "change #place"(event,template) {
        event.preventDefault()
        Meteor.call('Student.editAbsolutePlace',this._id,event.target.value)
    },

    "click #save"(event,template) {
        event.preventDefault()

        let studentId = template.find('[name=studentToChoose]').value

        let result = {
             olympiadRegion: 'international',
             olympiadType: 'science',
             subjectId: template.find('[name=subjectToChoose]').value,
             grade: template.find('[name=grade]').value,
             studentId: studentId,
             olympiadId: template.find('[name=olympiadToChoose]').value,
        }

        if(result.subjectId && result.grade && studentId) {
            Meteor.call("Student.addOlympiadResult", academicYear.get(), result, function(err) {
                if (err) {
                    alert(err.reason)
                } else {
                    alert("Сақталды!")
                }
            })
        } else {
            alert("ақпарат таңдалмады")
        }
    },

    "click #delete"(event,template) {
        event.preventDefault()
        if (confirm('Оқушы нәтижесін өшіргіңіз келеді ме?')) {
            Meteor.call('Student.deleteOlympiadResult',this._id,function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
    },

    "click #window"(event,template) {
        cursor = Template.instance().state.get()
        if (cursor == 'unclicked') {
            Template.instance().state.set("clicked")
        }
        else {
            Template.instance().state.set("unclicked")
        }
    }
})

Template.olympiadInterResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});

