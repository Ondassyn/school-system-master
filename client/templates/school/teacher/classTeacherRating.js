import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './classTeacherRating.html';

Template.classTeacherRating.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.month = new ReactiveVar("all")

    template.subscribe("subjects")
    template.subscribe('teachers')
    template.subscribe('timeFormat')
    template.autorun(()=>{
        template.subscribe('teacherAssessments', academicYear.get())
    })
})

Template.classTeacherRating.helpers({
    yearResults() {
        return 'all' != Template.instance().month.get()
    },
    results() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let month = new Template.instance().month.get()

        return TeacherAssessments.find({
            name:name_search,
            surname:surname_search,
            month:month,
        },{sort:{surname:1,name:1,subjectId:1}})
    },
    teachers() {
        return Teachers.find({},{sort:{surname:1,name:1}})
    },
    selectedClass(grade,val) {
        let conf = Teachers.findOne({_id:this._id})
        if (conf)
            return conf[grade] == val ? "selected" : ""
    },
});

Template.classTeacherRating.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
    },
    "change #select"(event,template) {
        template.month.set(template.find('[name=month]').value)

        let month = FlowRouter.getParam('_id')
    },
    "change #grade"(event,template) {
        event.preventDefault()
        Meteor.call("classTeacher.editGrade",this._id, event.target.value)
    },
    "click #constructRating"(event,template) {
        event.preventDefault()

        if (confirm("Жаңа рейтинг құрастырғыңыз келеді ме?")) {
            Meteor.call("classTeacher.constructRating", academicYear.get(), function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    alert('Рейтинг құрастырылды')
                }
            })
        } 
    },
    "click #deleteRating"(event,template) {
        
        if (confirm("Рейтингті жоюыңыз келеді ме?")) {
            Meteor.call("classTeacher.deleteRating", academicYear.get(), function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    TeacherPerformaStates.update({schoolId:school.schoolId, academicYear:academicYear.get()},{$set:{state:'no'}})
                    alert('Рейтинг өшірілді')
                   }
            })
        } 
    },
    "click #addVisit" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.addVisit", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #reduceVisit" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.reduceVisit", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #addParentHour" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.addParentHour", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #reduceParentHour" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.reduceParentHour", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #add11GradeMeeting" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.add11GradeMeeting", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #reduce11GradeMeeting" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.reduce11GradeMeeting", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #addAdminMeeting" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.addAdminMeeting", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #reduceAdminMeeting" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.reduceAdminMeeting", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #addPrincipalMeeting" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.addPrincipalMeeting", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #reducePrincipalMeeting" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.reducePrincipalMeeting", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #addTutorSeminar" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.addTutorSeminar", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #reduceTutorSeminar" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.reduceTutorSeminar", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #addTeacherSeminar" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.addTeacherSeminar", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
    "click #reduceTeacherSeminar" (event,template) {
        event.preventDefault()
        let month = new Template.instance().month.get()

        if (month && month!='all')  {
            
            Meteor.call("classTeacher.reduceTeacherSeminar", this._id, academicYear.get(), month, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
        else {
            alert("Ай таңдалмады")
        }
    },
})

Template.classTeacherRating.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
