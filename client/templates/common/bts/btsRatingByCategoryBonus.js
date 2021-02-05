import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './btsRatingByCategoryBonus.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
Template.btsRatingByCategoryBonus.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});
    document.title = "БТС Рейтинг по темам";
    template.grade = new ReactiveVar("7");
    template.mathematicBonusTopic = new ReactiveVar('topic1');
    template.geographyBonusTopic = new ReactiveVar('topic1');
    template.kazakh_langBonusTopic = new ReactiveVar('topic1');
    template.physicsBonusTopic = new ReactiveVar('topic1');
    template.chemistryBonusTopic = new ReactiveVar('topic1');
    template.biologyBonusTopic = new ReactiveVar('topic1');
    
    template.subscribe("schools")
    template.subscribe('btsLevels', academicYear.get(), FlowRouter.getParam("btsNo"));
    template.autorun(()=>{
        template.subscribe("btsRating",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})

Template.btsRatingByCategoryBonus.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    btsNo3() {
        return FlowRouter.getParam("btsNo") == "3"
    },
    btsNo1_or_2(){
      return FlowRouter.getParam("btsNo") == "1" || FlowRouter.getParam("btsNo") == "2"
    },

    gradeTotal(){
        return Template.instance().grade.get() == 'all'
    },
    grade7(){
        return "7" == Template.instance().grade.get()
    },
    grade8_or_9(){
        return "8" == Template.instance().grade.get() || "9" == Template.instance().grade.get()
    },
    grade10(){
        return "10" == Template.instance().grade.get()
    },
    results() {
        return BtsRatings.find({},{sort: Session.get('Sort')});
    },
    mathematicBonusTopic1() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).mathematicBonusTopic1;
    },
    mathematicBonusTopic2() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).mathematicBonusTopic2;
    },
    kazakh_langBonusTopic1() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).kazakh_lang_kazBonusTopic1;
    },
    kazakh_langBonusTopic2() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).kazakh_lang_kazBonusTopic2;
    },
    geographyBonusTopic1() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).geographyBonusTopic1;
    },
    geographyBonusTopic2() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).geographyBonusTopic2;
    },
    physicsBonusTopic1() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).physicsBonusTopic1;
    },
    physicsBonusTopic2() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).physicsBonusTopic2;
    },
    chemistryBonusTopic1() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).chemistryBonusTopic1;
    },
    chemistryBonusTopic2() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).chemistryBonusTopic2;
    },
    biologyBonusTopic1() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).biologyBonusTopic1;
    },
    biologyBonusTopic2() {
      let grade = Template.instance().grade.get();
      return BtsLevels.findOne({grade}).biologyBonusTopic2;
    },
    isMathematicBonusTopicIs(topic) {
      return topic && topic === Template.instance().mathematicBonusTopic.get();
    },
    isGeographyBonusTopicIs(topic) {
      return topic && topic === Template.instance().geographyBonusTopic.get();
    },
    isPhysicsBonusTopicIs(topic) {
      return topic && topic === Template.instance().physicsBonusTopic.get();
    },
    isChemistryBonusTopicIs(topic) {
      return topic && topic === Template.instance().chemistryBonusTopic.get();
    },
    isBiologyBonusTopicIs(topic) {
      return topic && topic === Template.instance().biologyBonusTopic.get();
    },
    isKazakh_langBonusTopicIs(topic) {
      return topic && topic === Template.instance().kazakh_langBonusTopic.get();
    },
})

var filterN = 'filter1';

Template.btsRatingByCategoryBonus.events({
    "change #select"(event,template) {
        template.grade.set(template.find('[name=grade]').value)
        let grade = FlowRouter.getParam('_id')
    },
    "change #mathematicBonusTopic"(event, template) {
      template.mathematicBonusTopic.set(event.target.value);
    },
    "change #kazakh_langBonusTopic"(event, template) {
      template.kazakh_langBonusTopic.set(event.target.value);
    },
    "change #geographyBonusTopic"(event, template) {
      template.geographyBonusTopic.set(event.target.value);
    },
    "change #physicsBonusTopic"(event, template) {
      template.physicsBonusTopic.set(event.target.value);
    },
    "change #chemistryBonusTopic"(event, template) {
      template.chemistryBonusTopic.set(event.target.value);
    },
    "change #biologyBonusTopic"(event, template) {
      template.biologyBonusTopic.set(event.target.value);
    },
    'click #mathBonusTopic1'(event, template) {
      Session.set('Sort', {mathematicBonusA:-1});
    },
    'click #mathBonusTopic2'(event, template) {
      Session.set('Sort', {mathematicBonusB:-1});
    },
    'click #mathBonusTopicTotal'(event, template) {
      Session.set('Sort', {mathematicBonus:-1});
    },
    'click #kazakh_langBonusTopic1'(event, template) {
      Session.set('Sort', {kazakh_langBonusA:-1});
    },
    'click #kazakh_langBonusTopic2'(event, template) {
      Session.set('Sort', {kazakh_langBonusB:-1});
    },
    'click #kazakh_langBonusTopicTotal'(event, template) {
      Session.set('Sort', {kazakh_langBonus:-1});
    },
    'click #geographyBonusTopic1'(event, template) {
      Session.set('Sort', {geographyBonusA:-1});
    },
    'click #geographyBonusTopic2'(event, template) {
      Session.set('Sort', {geographyBonusB:-1});
    },
    'click #geographyBonusTopicTotal'(event, template) {
      Session.set('Sort', {geographyBonus:-1});
    },
    'click #physicsBonusTopic1'(event, template) {
      Session.set('Sort', {physicsBonusA:-1});
    },
    'click #physicsBonusTopic2'(event, template) {
      Session.set('Sort', {physicsBonusB:-1});
    },
    'click #physicsBonusTopicTotal'(event, template) {
      Session.set('Sort', {physicsBonus:-1});
    },
    'click #chemistryBonusTopic1'(event, template) {
      Session.set('Sort', {chemistryBonusA:-1});
    },
    'click #chemistryBonusTopic2'(event, template) {
      Session.set('Sort', {chemistryBonusB:-1});
    },
    'click #chemistryBonusTopicTotal'(event, template) {
      Session.set('Sort', {chemistryBonus:-1});
    },
    'click #biologyBonusTopic1'(event, template) {
      Session.set('Sort', {biologyBonusA:-1});
    },
    'click #biologyBonusTopic2'(event, template) {
      Session.set('Sort', {biologyBonusB:-1});
    },
    'click #biologyBonusTopicTotal'(event, template) {
      Session.set('Sort', {biologyBonus:-1});
    }

})
