import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './adminOpeThresholds.html';

Template.adminOpeThresholds.onCreated(function() {
    let template = this;
    document.title = "OPE Деңгейлік ұпайлар";

    template.subscribe('configs');
})

Template.adminOpeThresholds.helpers({
    threshold(subjectId, level){
        let configs = Configs.findOne({_id: "opeThresholds"});
        if(configs) {
            return configs[level + '_' + subjectId];
        }
    }
});


Template.adminOpeThresholds.events({
    'change .form-control'(event, template) {
        let tokens = (event.target.id).split('_');
        if(tokens[1] === 'region') {
            Meteor.call('Configs.changeThresholdRegion', event.target.value, tokens[0], (err,res) => {
                if (err) {
                    alert(err.reason)
                } 
            })
        } else if(tokens[1] === 'republic') {
            Meteor.call('Configs.changeThresholdRepublic', event.target.value, tokens[0], (err,res) => {
                if (err) {
                    alert(err.reason)
                } 
            })
        }
    }
})

Template.adminOpeThresholds.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
