import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './teachersRating.html';

Template.teachersRating.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.quarter = new ReactiveVar("")
    template.week = new ReactiveVar("all")
    template.subscribe("subjects")

    template.autorun(() => {
        template.subscribe("teacherPerformaRating",academicYear.get())
    })
})

Template.teachersRating.helpers({
    results() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        return TeacherPerformaRating.find({
            name:name_search,
            surname:surname_search,
            quarter:quarter,
            week:week,
        },{sort:{surname:1,name:1,subjectId:1}})
    }
});

Template.teachersRating.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
    },
    "change #select"(event,template) {
        template.quarter.set(template.find('[name=quarter]').value)
        template.week.set(template.find('[name=week]').value)

        let quarter = FlowRouter.getParam('_id')
        let week = FlowRouter.getParam('_id')
    },
    "click #constructRating"(event,template) {
        let quarter = new Template.instance().quarter.get()

        if (quarter) {
            if (confirm(quarter + "-ші Тоқсан үшін жаңа рейтинг құрастырғыңыз келеді ме?")) {
                Meteor.call("Teacher.constructRatingAll", academicYear.get(), quarter, function(err) {
                    if(err){
                        alert(err.reason)
                    } else {
                        alert('Рейтинг құрастырылды')
                    }
                })
            } 
        } else {
            alert("Тоқсан немесе апта таңдалмады")
        }
    },
    "click #deleteRating"(event,template) {
        let quarter = new Template.instance().quarter.get()

        if (quarter) {
            if (confirm(quarter + "-ші Тоқсан рейтинг жоюыңыз келеді ме?")) {
                Meteor.call("Teacher.deleteRating", academicYear.get(), quarter, function(err) {
                    if(err){
                        alert(err.reason)
                    } else {
                        alert('Рейтинг өшірілді')
                    }
                })
            } 
        } else {
            alert("Тоқсан немесе апта таңдалмады")
        }
    },
    "click #addExtraLesson" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter)  {
            if (week != 'all') {
                Meteor.call("Teacher.addExtraLesson", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        }
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #reduceExtraLesson" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reduceExtraLesson", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        }
        else {
            alert("Тоқсан таңдалмады")
        } 
    },
    "click #addOlympiad" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.addOlympiad", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        }
        else {
            alert("Тоқсан таңдалмады")
        } 
    },
    "click #reduceOlympiad" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reduceOlympiad", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        }
        else {
            alert("Тоқсан таңдалмады")
        } 
    },
    "click #addUbt" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.addUbt", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
            alert("Апта таңдалмады")
            }
        }
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #reduceUbt" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reduceUbt", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
            alert("Апта таңдалмады")
            }
        }
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #addAttend" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.addAttend", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
            alert("Апта таңдалмады")
            }
        }
        else {
            alert("Тоқсан таңдалмады")
        } 
    },
    "click #reduceAttend" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reduceAttend", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
            alert("Апта таңдалмады")
            }
        }
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #addSchoolEvent" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.addSchoolEvent", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
            alert("Апта таңдалмады")
            }
        } 
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #reduceSchoolEvent" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reduceSchoolEvent", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
            alert("Апта таңдалмады")
            }
        } 
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #addCityEvent" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.addCityEvent", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        } 
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #reduceCityEvent" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reduceCityEvent", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        } 
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #addRepEvent" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.addRepEvent", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            }
        } 
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #reduceRepEvent" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reduceRepEvent", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            }
        } 
        else {
            alert("Тоқсан таңдалмады")
        } 
    },
    "click #addPblPrepare" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.addPblPrepare", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        } 
        else {
            alert("Тоқсан таңдалмады")
        } 
    },
    "click #reducePblPrepare" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reducePblPrepare", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        } 
        else {
            alert("Тоқсан таңдалмады")
        } 
    },
    "click #addPblPresent" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.addPblPresent", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            }
        } 
        else {
            alert("Тоқсан таңдалмады")
        }
    },
    "click #reducePblPresent" (event,template) {
        event.preventDefault()
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        if (quarter) {
            if (week != 'all') {
                Meteor.call("Teacher.reducePblPresent", this._id, academicYear.get(), quarter, week, function(err) {
                    if(err){
                        alert(err.reason)
                    }
                })
            } else {
                alert("Апта таңдалмады")
            } 
        } 
        else {
            alert("Тоқсан таңдалмады")
        }
    }
})

Template.teachersRating.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
