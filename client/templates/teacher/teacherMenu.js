import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import './teacherMenu';

Template.teacherMenu.onCreated(function() {
    let template = this

})
Template.teacherMenu.helpers({

});

Template.teacherMenu.events({
    'click #lang_ru'(event, template) {
        TAPi18n.setLanguage('ru');
    },
    'click #lang_kz'(event, template) {
        TAPi18n.setLanguage('en');
    }
});
