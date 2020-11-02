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

    // template.autorun(() => {
    //     template.subscribe("adminOpeResults", academicYear.get(), 'all', template.subjectId.get(), template.grade.get());
    //     template.subscribe('adminStudents', 'all', template.subjectId.get(), template.grade.get());
    // })

    template.subscribe("adminOpeResults", academicYear.get(), 'all', 'all', 'all');
    template.subscribe('adminStudents', 'all', 'all', 'all');

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
    isPercentageRegion() {
        return Template.instance().rating_type.get() === 'percentageRegion';
    },
    isPercentageRepublic() {
        return Template.instance().rating_type.get() === 'percentageRepublic';
    },
    isQuantityRegion() {
        return Template.instance().rating_type.get() === 'quantityRegion';
    },
    isQuantityRepublic() {
        return Template.instance().rating_type.get() === 'quantityRepublic';
    },
    isPercentageBoth() {
        return Template.instance().rating_type.get() === 'percentageBoth';
    },
    isQuantityBoth() {
        return Template.instance().rating_type.get() === 'quantityBoth';
    },
    getAverage(opeNo, schoolId) {
        let averages = Session.get('averages_' + schoolId);
        if(averages){
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
    getPercentageRegion(opeNo, schoolId) {
        let percentages = Session.get('regionPercentages_' + schoolId);
        if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100) + '%';
    },
    averagePercentagesRegion(schoolId) {
        let averages = Session.get('regionPercentages_' + schoolId);
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
                return (sum/n*100).toFixed(0) + '%';
            }
        }
    },
    getPercentageRepublic(opeNo, schoolId) {
        let percentages = Session.get('republicPercentages_' + schoolId);
        if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100) + '%';
    },
    averagePercentagesRepublic(schoolId) {
        let averages = Session.get('republicPercentages_' + schoolId);
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
                return (sum/n*100).toFixed(0) + '%';
            }
        }
    },
    getQuantityRegion(opeNo, schoolId) {
        let quantities = Session.get('regionQuantities_' + schoolId);
        if(quantities) return quantities[opeNo];
    },
    averageQuantitiesRegion(schoolId) {
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
                return (sum/n).toFixed(1);
            }
        }
    },
    getQuantityRepublic(opeNo, schoolId) {
        let quantities = Session.get('republicQuantities_' + schoolId);
        if(quantities) return quantities[opeNo];
    },
    averageQuantitiesRepublic(schoolId) {
        let averages = Session.get('republicQuantities_' + schoolId);
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
                return (sum/n).toFixed(1);
            }
        }
    },
    getPercentageBoth(opeNo, schoolId){
        let percentagesBoth = Session.get('percentagesBoth_' + schoolId);
        if(percentagesBoth) if(percentagesBoth[opeNo]) return percentagesBoth[opeNo] + '%';
    },
    averagePercentagesBoth(schoolId) {
        let averages = Session.get('percentagesBoth_' + schoolId);
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
                return (sum/n).toFixed(0) + '%';
            }
        }
    },
    getQuantityBoth(opeNo, schoolId) {
        let quantities = Session.get('quantitiesBoth_' + schoolId);
        if(quantities) return quantities[opeNo];
    },
    averageQuantitiesBoth(schoolId) {
        let averages = Session.get('quantitiesBoth_' + schoolId);
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
                return (sum/n).toFixed(1);
            }
        }
    },
    getLabelStyle(level) {
        if(level === 'region')
            return "padding: 2px; background-color: #ccffff";
        if(level === 'republic')
            return "padding: 2px; background-color: #cce5ff";
    },
});

let resetPercentages = function() {
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let schoolId = schoolObject.schoolId;
        Session.set('regionPercentages_' + schoolId, []);
        Session.set('republicPercentages_' + schoolId, []);
    })
}

let resetQuantities = function() {
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let schoolId = schoolObject.schoolId;
        Session.set('regionQuantities_' + schoolId, []);
        Session.set('republicQuantities_' + schoolId, []);
    })
}

let resetAverages = function() {
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let schoolId = schoolObject.schoolId;
        Session.set('averages_' + schoolId, []);
    })
}

let estimateAverages = function(template) {
    resetAverages();
    
    let olympiad = template.subjectId.get();
    let grade = template.grade.get();

    let opeNumber = 6;
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let opeResults;
        let schoolId = schoolObject.schoolId;
        if(grade === 'all' && olympiad === 'all') {
            opeResults = OpeResults.find({schoolId}).fetch();
        } else if(grade === 'all') { 
            opeResults = OpeResults.find({schoolId, olympiad}).fetch();
        } else if(olympiad === 'all') { 
            opeResults = OpeResults.find({schoolId, grade}).fetch();
        } else {
            opeResults = OpeResults.find({schoolId, grade, olympiad}).fetch();
        }
        
        let sums = [];
        let ns = [];
        opeResults.map((opeResult) => {
            
            for(i = 1; i <= opeNumber; i++) {
                
                if(opeResult['ope' + i]){
                    
                    if(sums[i])
                        sums[i] += parseFloat(opeResult['ope' + i].replace(/,/g, ''));
                    else
                        sums[i] = parseFloat(opeResult['ope' + i].replace(/,/g, ''));

                    if(ns[i])
                        ns[i]++;
                    else
                        ns[i] = 1;
                }
            }
        })

        if(ns) {
            let averages = [];
            for(i = 1; i <= opeNumber; i++) {
                if(ns[i]) {
                    averages[i] = (sums[i]/ns[i]).toFixed(2);
                }
            }
            
            Session.set('averages_' + schoolId, averages);
        }
    })
}

let estimatePercentages = function(template) {
    resetPercentages();
    resetQuantities();

    let thresholdRegion = Template.adminOpeRatings.__helpers.get('opeThresholds')('region');
    let thresholdRepublic = Template.adminOpeRatings.__helpers.get('opeThresholds')('republic');
    
    if(!thresholdRegion && !thresholdRepublic) return;
    
    let olympiad = template.subjectId.get();
    let grade = template.grade.get();

    let opeNumber = 6;
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let opeResults;
        let schoolId = schoolObject.schoolId;
        if(grade === 'all' && olympiad === 'all') {
            opeResults = OpeResults.find({schoolId}).fetch();
        } else if(grade === 'all') { 
            opeResults = OpeResults.find({schoolId, olympiad}).fetch();
        } else if(olympiad === 'all') { 
            opeResults = OpeResults.find({schoolId, grade}).fetch();
        } else {
            opeResults = OpeResults.find({schoolId, grade, olympiad}).fetch();
        }

        let msRegion = [null,0,0,0,0,0,0];
        let nsRegion = [null,0,0,0,0,0,0];
        let msRepublic = [null,0,0,0,0,0,0];
        let nsRepublic = [null,0,0,0,0,0,0];

        opeResults.map((opeResult) => {
            for(i = 1; i <= opeNumber; i++) {  
                let student = Students.findOne({studentId : opeResult.studentId});
                if(!student) return;
                
                let level = student.level;
                if(opeResult['ope' + i]){
                    let points = parseFloat(opeResult['ope' + i].replace(/,/g, ''));
                    if(level && points){
                        if(level === 'Область'){
                            if(thresholdRegion) {
                                nsRegion[i]++;
                                if(+points >= +thresholdRegion) msRegion[i]++;
                            }
                        } else if(level === 'Республика') {
                            if(thresholdRepublic) {
                                nsRepublic[i]++;
                                if(+points >= +thresholdRepublic)
                                    msRepublic[i]++;
                            }
                        }
                    }
                }
            }
        })

        let msBoth = [null,0,0,0,0,0,0];
        let nsBoth = [null,0,0,0,0,0,0];

        if(nsRegion) {
            let percentages = [];
            let quantities = [];
            for(i = 1; i <= opeNumber; i++) {
                if(nsRegion[i]) {
                    percentages[i] = (msRegion[i]/nsRegion[i]).toFixed(1);
                    quantities[i] = msRegion[i];
                    msBoth[i] += msRegion[i];
                    nsBoth[i] += nsRegion[i];
                }
            }
            
            Session.set('regionPercentages_' + schoolId, percentages);
            Session.set('regionQuantities_' + schoolId, quantities);
        }

        if(nsRepublic) {
            let averages = [];
            let quantities = [];
            for(i = 1; i <= opeNumber; i++) {
                if(nsRepublic[i]) {
                    
                    averages[i] = (msRepublic[i]/nsRepublic[i]).toFixed(1);
                    quantities[i] = msRepublic[i];
                    msBoth[i] += msRepublic[i];
                    nsBoth[i] += nsRepublic[i];
                }
            }
            
            Session.set('republicPercentages_' + schoolId, averages);
            Session.set('republicQuantities_' + schoolId, quantities);
        }

        let percentagesBoth = [];
        let quantitiesBoth = [];
        for(i = 1; i <= opeNumber; i++) {
            if(nsBoth[i] !== 0){
                percentagesBoth[i] = (msBoth[i]/nsBoth[i]*100).toFixed(0);
                quantitiesBoth[i] = msBoth[i]
            }
        }
        Session.set('percentagesBoth_' + schoolId, percentagesBoth);
        Session.set('quantitiesBoth_' + schoolId, quantitiesBoth);

    })
}

Template.adminOpeRatings.events({
    'change #subjectId'(event,template) {
        event.preventDefault();
        template.subjectId.set(event.target.value);
        estimateAverages(template);
        estimatePercentages(template);
    },
    'change #grade'(event,template) {
        event.preventDefault();
        template.grade.set(event.target.value);
        estimateAverages(template);
        estimatePercentages(template);
    },
    'change #rating_type'(event, template) {
        event.preventDefault();
        template.rating_type.set(event.target.value);
        estimatePercentages(template);
        estimateAverages(template);
    }
})

Template.adminOpeRatings.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
