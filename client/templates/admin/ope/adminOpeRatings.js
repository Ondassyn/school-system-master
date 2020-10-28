import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './adminOpeRatings.html';

Template.adminOpeRatings.onCreated(function() {
    let template = this
    document.title = "OPE Рейтинг";
    template.subjectId = new ReactiveVar('all');
    template.grade = new ReactiveVar('all');
    template.threshold_region = new ReactiveVar();
    template.threshold_republic = new ReactiveVar();
    template.rating_type = new ReactiveVar('average');

    template.subscribe('schools');
    template.subscribe('configs');

    template.autorun(() => {
        template.subscribe("adminOpeResults", academicYear.get(), 'all', template.subjectId.get(), template.grade.get());
        template.subscribe('adminStudents', 'all', template.subjectId.get(), template.grade.get());
    })
})

Template.adminOpeRatings.helpers({
    schools(){
        return Schools.find({},{sort:{schoolId:1}});
    },
    opeThresholds(level) {
        let subjectId = Template.instance().subjectId.get();
        return Configs.findOne({_id: "opeThresholds"})[level+ '_' + subjectId];
    },
    isAverage() {
        return Template.instance().rating_type.get() === 'average';
    },
    isPercentage() {
        return Template.instance().rating_type.get() === 'percentage';
    },
    isQuantity() {
        return Template.instance().rating_type.get() === 'quantity';
    },
    getAverage(opeNo, schoolId) {
        let opeResults = OpeResults.find({schoolId});

        let n = 0;
        let sum = 0;

        opeResults.map((result) => {
            if(result['ope' + opeNo]) {
                n++;
                sum +=+ parseFloat(result['ope' + opeNo].replace(/,/g, ''));
            }
        });
        
        if(n === 0) {
            let averages = Session.get('averages_' + schoolId);
            if(averages){
                if(averages[opeNo]) averages[opeNo] = null;
                Session.set('averages_' + schoolId, averages);
            }
            return '';
        } else {
            let averages = Session.get('averages_' + schoolId);
            averages = averages ? averages : [];
            averages[opeNo] = (sum/n).toFixed(1);
            Session.set('averages_' + schoolId, averages);
            return averages[opeNo];
        }
    },
    averageAverages(schoolId) {
        let averages = Session.get('averages_' + schoolId);
        if(!averages) return '';
        let n = 0;
        let sum = 0;
        averages.map((average) => {
            if(!average) return;
            n++;
            sum +=+ average;
        });
        return n === 0 ? '' : (sum/n).toFixed(1);
    },
    getPercentage(opeNo, schoolId) {
        let thresholdRegion = Template.adminOpeRatings.__helpers.get('opeThresholds')('region');
        let thresholdRepublic = Template.adminOpeRatings.__helpers.get('opeThresholds')('republic');
        if(!thresholdRegion && !thresholdRepublic) return '';
        let opeResults = OpeResults.find({schoolId});

        let nRegion = 0;
        let nRepublic = 0;
        let mRegion = 0;
        let mRepublic = 0;
        opeResults.map((result) => {
            if(result['ope' + opeNo]){
                let student = Students.findOne({studentId : result.studentId});
                if(!student) return;
                let level = student.level;
                let points = parseFloat(result['ope' + opeNo].replace(/,/g, ''));
                if(level){
                    if(level === 'Республика'){
                        if(thresholdRepublic){
                            nRepublic++;
                            if(+points >= +thresholdRepublic) mRepublic++;
                        }
                        if(thresholdRegion) {
                            nRegion++;
                            if(+points >= +thresholdRegion) mRegion++;
                        }
                    } else if(level === 'Область') {
                        if(thresholdRegion) {
                            nRegion++;
                            if(+points >= +thresholdRegion) mRegion++;
                        }
                    }
                }
            }
        });
        let percentageRegion = nRegion === 0 ? '' : (100*mRegion/nRegion).toFixed(0);
        let percentageRepublic = nRepublic === 0 ? '' : (100*mRepublic/nRepublic).toFixed(0);

        if(percentageRegion){
            let averages = Session.get('regionPercentages_' + schoolId);
            averages = averages ? averages : [];
            averages[opeNo] = percentageRegion;
            Session.set('regionPercentages_' + schoolId, averages);
            percentageRegion += '%';
        } else {
            let averages = Session.get('regionPercentages_' + schoolId);
            if(averages){
                if(averages[opeNo]) {
                    averages[opeNo] = null;
                    Session.set('regionPercentages_' + schoolId, averages);
                }
            }
        }

        if(percentageRepublic){
            let averages = Session.get('republicPercentages_' + schoolId);
            averages = averages ? averages : [];
            averages[opeNo] = percentageRepublic;
            Session.set('republicPercentages_' + schoolId, averages);
            percentageRepublic += '%';
        } else {
            let averages = Session.get('republicPercentages_' + schoolId);
            if(averages){
                if(averages[opeNo]) {
                    averages[opeNo] = null;
                    Session.set('republicPercentages_' + schoolId, averages);
                }
            }
        }

        return {'region' : percentageRegion, 'republic' : percentageRepublic};
    },
    averagePercentages(schoolId) {
        let final = {'region' : null,  'republic': null};
        let averages = Session.get('regionPercentages_' + schoolId);
        console.log(averages);
        if(averages){
            let n = 0;
            let sum = 0;
            averages.map((average) => {
                if(average) {
                    n++;
                    sum +=+ average;
                }
            });
            if(n !== 0) {
                final['region'] = (sum/n).toFixed(0);
            }
        }
        averages = Session.get('republicPercentages_' + schoolId);
        if(averages){
            let n = 0;
            let sum = 0;
            averages.map((average) => {
                if(average) {
                    n++;
                    sum +=+ average;
                }
            });
            if(n !== 0) {
                final['republic'] = (sum/n).toFixed(0);
            }
        }
        return final;
    },
    getQuantity(opeNo, schoolId) {
        let thresholdRegion = Template.adminOpeRatings.__helpers.get('opeThresholds')('region');
        let thresholdRepublic = Template.adminOpeRatings.__helpers.get('opeThresholds')('republic');
        if(!thresholdRegion && !thresholdRepublic) return '';
        let opeResults = OpeResults.find({schoolId});

        let mRegion = 0;
        let mRepublic = 0;
        opeResults.map((result) => {
            if(result['ope' + opeNo]){
                let student = Students.findOne({studentId : result.studentId});
                if(!student) return;
                let level = student.level;
                let points = parseFloat(result['ope' + opeNo].replace(/,/g, ''));
                if(level){
                    if(level === 'Республика'){
                        if(thresholdRepublic){
                            if(+points >= +thresholdRepublic) mRepublic++;
                        }
                        if(thresholdRegion) {
                            if(+points >= +thresholdRegion) mRegion++;
                        }
                    } else if(level === 'Область') {
                        if(thresholdRegion) {
                            if(+points >= +thresholdRegion) mRegion++;
                        }
                    }
                }
            }
        });
        let quantityRegion = mRegion === 0 ? '' : mRegion;
        let quantityRepublic = mRepublic === 0 ? '' : mRepublic;

        if(quantityRegion){
            let averages = Session.get('regionQuantities_' + schoolId);
            averages = averages ? averages : [];
            averages[opeNo] = quantityRegion;
            Session.set('regionQuantities_' + schoolId, averages);
        } else {
            let averages = Session.get('regionQuantities_' + schoolId);
            if(averages){
                if(averages[opeNo]) {
                    averages[opeNo] = null;
                    Session.set('regionQuantities_' + schoolId, averages);
                }
            }
        }

        if(quantityRepublic){
            let averages = Session.get('republicQuantities_' + schoolId);
            averages = averages ? averages : [];
            averages[opeNo] = quantityRepublic;
            Session.set('republicQuantities_' + schoolId, averages);
        } else {
            let averages = Session.get('republicQuantities_' + schoolId);
            if(averages){
                if(averages[opeNo]) {
                    averages[opeNo] = null;
                    Session.set('republicQuantities_' + schoolId, averages);
                }
            }
        }

        return {'region' : quantityRegion, 'republic' : quantityRepublic};
    },
    averageQuantities(schoolId) {
        let final = {'region' : null,  'republic': null};
        let averages = Session.get('regionQuantities_' + schoolId);
        if(averages){
            let n = 0;
            let sum = 0;
            averages.map((average) => {
                if(average) {
                    n++;
                    sum +=+ average;
                }
            });
            if(n !== 0) {
                final['region'] = (sum/n).toFixed(0);
            }
        }
        averages = Session.get('republicQuantities_' + schoolId);
        if(averages){
            let n = 0;
            let sum = 0;
            averages.map((average) => {
                if(average) {
                    n++;
                    sum +=+ average;
                }
            });
            if(n !== 0) {
                final['republic'] = (sum/n).toFixed(0);
            }
        }
        return final;
    },
    getLabelStyle(level) {
        if(level === 'region')
            return "padding: 2px; background-color: #ccffff";
        if(level === 'republic')
            return "padding: 2px; background-color: #cce5ff";
    },
});

Template.adminOpeRatings.events({
    'change #subjectId'(event,template) {
        event.preventDefault();
        template.subjectId.set(event.target.value)
    },
    'change #grade'(event,template) {
        event.preventDefault();
        template.grade.set(event.target.value)
    },
    'change #threshold_region'(event, template) {
        event.preventDefault();
        template.threshold_region.set(event.target.value);
        Meteor.call('Configs.changeThresholdRegion', template.threshold_region.get(), template.subjectId.get(), (err,res) => {
            if (err) {
                alert(err.reason)
            } 
        })
    },
    'change #threshold_republic'(event, template) {
        event.preventDefault();
        template.threshold_republic.set(event.target.value);
        Meteor.call('Configs.changeThresholdRepublic', template.threshold_republic.get(), template.subjectId.get(), (err,res) => {
            if (err) {
                alert(err.reason)
            } 
        })
    },
    'change #rating_type'(event, template) {
        event.preventDefault();
        template.rating_type.set(event.target.value);
    }
})

Template.adminOpeRatings.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
