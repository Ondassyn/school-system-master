import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminOpeResults.html';
import {ReactiveDict} from 'meteor/reactive-dict'

Template.adminOpeResults.onCreated(function() {
    let template = this
    document.title = "OPE Нәтижелері";
    template.subjectId = new ReactiveVar('all')
    template.grade = new ReactiveVar('all')
    template.schoolId = new ReactiveVar('all');

    template.subscribe('schools');
    template.subscribe('configs');

    template.autorun(() => {
        template.subscribe("adminOpeResults", academicYear.get(), template.schoolId.get(), template.subjectId.get(), template.grade.get());
        template.subscribe('adminStudents', template.schoolId.get(), template.subjectId.get(), template.grade.get());
    })
})

Template.adminOpeResults.helpers({
  opeList(){
    return OpeResults.find()
  },
  opeThresholds() {
    return Configs.findOne({_id: "opeThresholds"});
  },
  schools(){
    return Schools.find({},{sort:{schoolId:1}});
  },
  thresholdRatioRegion1() {
    // let list = Template.adminOpeResults.__helpers.get('opeList').call();
    // let thresholds = Template.adminOpeResults.__helpers.get('opeThresholds').call();
    // let n = 0;
    // let m = 0;
    // list.map((item) => {
    //     if(item.ope1) {
    //         let level = Students.findOne({studentId : item.studentId}).level;
    //         if(level && (level === 'region' || level === 'republic')){
    //             n++;
    //             if(+item.ope1 > +thresholds.region) m++;
    //         }
    //     }
    // })

    // if(+n > 0) return m/n;
  },
  thresholdRatioRepublic1() {
    // let list = Template.adminOpeResults.__helpers.get('opeList').call();
    // let thresholds = Template.adminOpeResults.__helpers.get('opeThresholds').call();
    // let n = 0;
    // let m = 0;
    // list.map((item) => {
    //     if(item.ope1) {
    //         // let level = Students.findOne({studentId : item.studentId}).level;
    //         // if(level && level === 'republic'){
    //         //     n++;
    //         //     if(+item.ope1 > +thresholds.republic) m++;
    //         // }
    //     }
    // })

    // if(+n > 0) return m/n;
  }
});

Template.adminOpeResults.events({
    'change #schoolId' (event, template) {
        template.schoolId.set(event.target.value);
    },
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
    'change #threshold_region'(event, template) {
        Meteor.call('Configs.changeThresholdRegion', event.target.value, (err,res) => {
            if (err) {
                alert(err.reason)
            } 
        })
    },
    'change #threshold_republic'(event, template) {
        Meteor.call('Configs.changeThresholdRepublic', event.target.value, (err,res) => {
            if (err) {
                alert(err.reason)
            } 
        })
    }
})

Template.adminOpeResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
