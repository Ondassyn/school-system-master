import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsObjectivesList.html';
Template.btsObjectivesList.onCreated(function() {
    let template = this
    template.grade = new ReactiveVar('7')

    template.subscribe('subjects')
    template.autorun(() => {
        template.subscribe("btsObjectivesList",academicYear.get(),FlowRouter.getParam("btsNo"))
    })

})

Template.btsObjectivesList.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    objectives() {

        let grade = new RegExp(Template.instance().grade.get())

        return BtsObjectivesList.find({grade:grade},{sort:{subject:1,objective:1}})
    }
})

Template.btsObjectivesList.events({
    "click #calculate"(event,template) {
        event.preventDefault()
        if (confirm('Сабақ мақсаттарды санағыңыз келеді ма?')) {
            //alert('Саналуда...');
            SUIBlock.block('Саналуда...');
            Meteor.call("BtsObjectives.Calculate",academicYear.get(),FlowRouter.getParam("btsNo"),template.grade.get(),function (err) {
                    if (err) {
                        alert(err.reason)
                        SUIBlock.unblock();
                    } else {
                        SUIBlock.unblock();
                        alert("Санау аяқталды")
                    }
            })
        }
    },
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
    "click #delete"(event,template) {
        if (confirm('Сабақ мақсатты өшіргіңіз келеді ме?')) {
            Meteor.call("BtsObjectives.Delete", this._id, function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    if (btsNo == '1')
                        FlowRouter.redirect('/admin/bts/objectives/1')
                    if (btsNo == '2')
                        FlowRouter.redirect('/admin/bts/objectives/2')
                    if (btsNo == '3')
                        FlowRouter.redirect('/admin/bts/objectives/3')
                    if (btsNo == '4')
                        FlowRouter.redirect('/admin/bts/objectives/4')
                }
            })
        }
    }
})