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
    //template.subscribe('adminOpeStudents', 'all', 'all', 'all');

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
        if(Template.instance().subjectId.get() === 'all'){
            let percentages = Session.get('regionPercentagesAll_' + schoolId);
            if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100).toFixed(0)  + '%';
        }
        let percentages = Session.get('regionPercentages_' + schoolId);
        if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100).toFixed(0)  + '%';
    },
    averagePercentagesRegion(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('regionPercentagesAll_' + schoolId);
        else
            averages = Session.get('regionPercentages_' + schoolId);
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
        if(Template.instance().subjectId.get() === 'all'){
            let percentages = Session.get('republicPercentagesAll_' + schoolId);
            if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100).toFixed(0) + '%';
        }
        let percentages = Session.get('republicPercentages_' + schoolId);
        if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100).toFixed(0)  + '%';
    },
    averagePercentagesRepublic(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('republicPercentagesAll_' + schoolId);
        else
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
                return (sum/n*100).toFixed(0) + '%';
            }
        }
    },
    getQuantityRegion(opeNo, schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let quantities = Session.get('regionQuantitiesAll_' + schoolId);
            if(quantities) return quantities[opeNo];;
        }
        let quantities = Session.get('regionQuantities_' + schoolId);
        if(quantities) return quantities[opeNo];
    },
    averageQuantitiesRegion(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('regionQuantitiesAll_' + schoolId);
        else
            averages = Session.get('regionQuantities_' + schoolId);
        if(averages && averages.length > 0){
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
            return 0;
        }
    },
    getQuantityRepublic(opeNo, schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let quantities = Session.get('republicQuantitiesAll_' + schoolId);
            if(quantities) return quantities[opeNo];
        }
        let quantities = Session.get('republicQuantities_' + schoolId);
        if(quantities) return quantities[opeNo];
    },
    averageQuantitiesRepublic(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('republicQuantitiesAll_' + schoolId);
        else
            averages = Session.get('republicQuantities_' + schoolId);
        if(averages && averages.length > 0){
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
            return 0;
        }
    },
    getPercentageBoth(opeNo, schoolId){
        if(Template.instance().subjectId.get() === 'all') {
            let percentagesBoth = Session.get('percentagesBothAll_' + schoolId);
            if(percentagesBoth) if(percentagesBoth[opeNo]) return (+percentagesBoth[opeNo]).toFixed(0) + '%';
        }
        let percentagesBoth = Session.get('percentagesBoth_' + schoolId);
        if(percentagesBoth) if(percentagesBoth[opeNo]) return (+percentagesBoth[opeNo]).toFixed(0)  + '%';
    },
    averagePercentagesBoth(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('percentagesBothAll_' + schoolId);
        else
            averages = Session.get('percentagesBoth_' + schoolId);
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
        if(Template.instance().subjectId.get() === 'all') {
            let quantities = Session.get('quantitiesBothAll_' + schoolId);
            if(quantities) return quantities[opeNo];
        }
        let quantities = Session.get('quantitiesBoth_' + schoolId);
        if(quantities) return quantities[opeNo];
    },
    averageQuantitiesBoth(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('quantitiesBothAll_' + schoolId);
        else
            averages = Session.get('quantitiesBoth_' + schoolId);
        if(averages  && averages.length > 0){
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
            return 0;
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
        Session.set('regionPercentagesAll_' + schoolId, []);
        Session.set('republicPercentagesAll_' + schoolId, []);
        Session.set('percentagesBoth_' + schoolId, []);
        Session.set('percentagesBothAll_' + schoolId, []);
    })
}

let resetQuantities = function() {
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let schoolId = schoolObject.schoolId;
        Session.set('regionQuantities_' + schoolId, []);
        Session.set('republicQuantities_' + schoolId, []);
        Session.set('regionQuantitiesAll_' + schoolId, []);
        Session.set('republicQuantitiesAll_' + schoolId, []);
        Session.set('quantitiesBoth_' + schoolId, []);
        Session.set('quantitiesBothAll_' + schoolId, []);
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
                // let student = Students.findOne({studentId : opeResult.studentId});
                // if(!student) return;
                
                let level = opeResult.level;
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

let estimateGeneralPercentages = function(template) {
    resetPercentages();
    resetQuantities();

    let opeThresholds = Configs.findOne({_id: 'opeThresholds'});
    if(!opeThresholds) return;

    let thresholds = Object.keys(opeThresholds);
    if(thresholds.length === 0) return;

    let grade = template.grade.get();

    let opeNumber = 6;
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let opeResults;
        let schoolId = schoolObject.schoolId;
        if(grade === 'all') {
            opeResults = OpeResults.find({schoolId}).fetch();
        } else {
            opeResults = OpeResults.find({schoolId, grade}).fetch();
        }

        let msRegion = [null,0,0,0,0,0,0];
        let nsRegion = [null,0,0,0,0,0,0];
        let msRepublic = [null,0,0,0,0,0,0];
        let nsRepublic = [null,0,0,0,0,0,0];

        thresholds.filter(threshold => {
            return threshold !== '_id';
        }).map(threshold => {
            let tokens = threshold.split('_');
            let thresholdLevel = tokens[0];
            let thresholdSubjectId = tokens[1];
            

            opeResults.filter((opeResult) => {
                return opeResult.level && opeResult.level != 'none' && thresholdSubjectId === opeResult.olympiad;
            }).map((opeResult) => {
                for(i = 1; i <= opeNumber; i++) {  
                    // let student = Students.findOne({studentId : opeResult.studentId});
                    // if(!student) return;
                    if(opeResult['ope' + i]){
                        let points = parseFloat(opeResult['ope' + i].replace(/,/g, ''));
                        if(!isNaN(points)){
                            if(opeResult.level === 'Область' && thresholdLevel === 'region'){
                                let thresholdRegion = parseFloat(opeThresholds[threshold].replace(/,/g, ''));
                                if(!isNaN(thresholdRegion)) {
                                    nsRegion[i]++;
                                    if(+points >= +thresholdRegion) msRegion[i]++;
                                }
                            } else if(opeResult.level === 'Республика' && thresholdLevel === 'republic') {
                                let thresholdRepublic = parseFloat(opeThresholds[threshold].replace(/,/g, ''));
                                if(!isNaN(thresholdRepublic)) {
                                    nsRepublic[i]++;
                                    if(+points >= +thresholdRepublic)
                                        msRepublic[i]++;
                                }
                            }
                        }
                    }
                
                }
            })
        })

        let msBoth = [null,0,0,0,0,0,0];
        let nsBoth = [null,0,0,0,0,0,0];

        if(nsRegion) {
            let percentages = [];
            let quantities = [];
            for(i = 1; i <= opeNumber; i++) {
                if(nsRegion[i]) {
                    percentages[i] = (msRegion[i]/nsRegion[i]).toFixed(3);
                    quantities[i] = msRegion[i];
                    msBoth[i] += msRegion[i];
                    nsBoth[i] += nsRegion[i];
                }
            }
            
            //console.log('schoolId: ' + schoolId + ': ' + msRegion + ' ' + nsRegion)  

            Session.set('regionPercentagesAll_' + schoolId, percentages);
            Session.set('regionQuantitiesAll_' + schoolId, quantities);
        }

        if(nsRepublic) {
            let averages = [];
            let quantities = [];
            for(i = 1; i <= opeNumber; i++) {
                if(nsRepublic[i]) {
                    averages[i] = (msRepublic[i]/nsRepublic[i]).toFixed(3);
                    quantities[i] = msRepublic[i];
                    msBoth[i] += msRepublic[i];
                    nsBoth[i] += nsRepublic[i];
                }
            }
            
            Session.set('republicPercentagesAll_' + schoolId, averages);
            Session.set('republicQuantitiesAll_' + schoolId, quantities);
        }

        let percentagesBoth = [];
        let quantitiesBoth = [];
        for(i = 1; i <= opeNumber; i++) {
            if(nsBoth[i] !== 0){
                percentagesBoth[i] = (msBoth[i]/nsBoth[i]*100).toFixed(0);
                quantitiesBoth[i] = msBoth[i]
            }
        }

        Session.set('percentagesBothAll_' + schoolId, percentagesBoth);
        Session.set('quantitiesBothAll_' + schoolId, quantitiesBoth);

    })
}

Template.adminOpeRatings.events({
    'change #subjectId'(event,template) {
        event.preventDefault();
        template.subjectId.set(event.target.value);
        if(template.subjectId.get() === 'all') {
            estimateGeneralPercentages(template);
        } else {
            estimatePercentages(template);
        }
        estimateAverages(template);
    },
    'change #grade'(event,template) {
        event.preventDefault();
        template.grade.set(event.target.value);
        if(template.subjectId.get() === 'all') {
            estimateGeneralPercentages(template);
        } else {
            estimatePercentages(template);
        }
        estimateAverages(template);
    },
    'change #rating_type'(event, template) {
        event.preventDefault();
        template.rating_type.set(event.target.value);
        if(template.subjectId.get() === 'all') {
            estimateGeneralPercentages(template);
        } else {
            estimatePercentages(template);
        }
        estimateAverages(template);
    }
})

Template.adminOpeRatings.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
