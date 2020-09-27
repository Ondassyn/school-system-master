import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './studentSettings.html';
Template.studentSettings.onCreated(function() {
    let template = this
    template.subscribe("subjects")
})

Template.studentSettings.events({
    "click #save"(event,template) {
        event.preventDefault()

        let old = template.find("[name=oldPassword]").value
        let newp = template.find("[name=newPassword]").value

        if (old && newp) {
            Accounts.changePassword(old,newp,function(err) {
                if (err) {
                    alert(err.reason)
                } else {
                    alert("Құпиясөз өзгертілді")
                }
            })
        }
    }
})
