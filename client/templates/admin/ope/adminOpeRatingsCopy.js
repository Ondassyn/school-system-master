import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './adminOpeRatingsCopy.html';
import { _ } from 'core-js';
import XLSX from 'xlsx';

Template.adminOpeRatingsCopy.onCreated(function() {
    let template = this
    document.title = "OPE Рейтинг";
    template.subjectId = new ReactiveVar('all');
    template.grade = new ReactiveVar('all');
    template.threshold_region = new ReactiveVar();
    template.threshold_republic = new ReactiveVar();
    template.rating_type = new ReactiveVar('');

    Session.set('order', []);

    template.subscribe('adminOpeSchools');
    template.subscribe('configs');

    // template.autorun(() => {
    //     template.subscribe("adminOpeResults", academicYear.get(), 'all', template.subjectId.get(), template.grade.get());
    //     template.subscribe('adminStudents', 'all', template.subjectId.get(), template.grade.get());
    // })

    template.subscribe("adminOpeResults", academicYear.get(), 'all', 'all', 'all');
    //template.subscribe('adminOpeStudents', 'all', 'all', 'all');
})

Template.adminOpeRatingsCopy.helpers({
    schools(){
        let order = Session.get('order');
        
        if(order.length === 0)
            return Schools.find({},{sort:{schoolId:1}}).fetch();
        else {
            let schools = Schools.find({},{sort:{schoolId:1}}).fetch();
            
            let ordered = _.sortBy(schools, function(o) {
                let index = _.indexOf(order, o.schoolId);
                if(index !== -1)            
                    return index;
            })
            return ordered;
        }
    },
    isOption(){
        let option = Template.instance().rating_type.get();
        if(option === '' || option === 'default') return false;
        return true;
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
    isRegion() {
        return Template.instance().rating_type.get() === 'region';
    },
    isRepublic() {
        return Template.instance().rating_type.get() === 'republic';
    },
    isBoth() {
        return Template.instance().rating_type.get() === 'both';
    },
    getAverage(opeNo, schoolId) {
        let averages = Session.get('averages_' + schoolId);
        if(averages){
            if(averages[opeNo]) return averages[opeNo];
            else return '-';
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

        if(n === 0) {
            return '-';
        } else {
            let ret = (sum/n).toFixed(1);
            orderAveragesAverage.push({[schoolId]: ret});
            Session.set('averagesAverage_' + schoolId, ret);
            return ret;
        }
    },
    getPercentageRegion(opeNo, schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let percentages = Session.get('regionPercentagesAll_' + schoolId);
            if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100).toFixed(0)  + '%';
        }
        let percentages = Session.get('regionPercentages_' + schoolId);
        if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100).toFixed(0)  + '%';
        return '-';
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
                let ret = (sum/n*100).toFixed(0);
                orderPercentagesRegionAllAverage.push({[schoolId]: ret});
                orderPercentagesRegionAverage.push({[schoolId]: ret});
                Session.set('regionPercentagesAverage_' + schoolId, ret+'%');
                return ret + '%';
            }
        }
        return '-';
    },
    getPercentageRepublic(opeNo, schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let percentages = Session.get('republicPercentagesAll_' + schoolId);
            if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100).toFixed(0) + '%';
        }
        let percentages = Session.get('republicPercentages_' + schoolId);
        if(percentages) if(percentages[opeNo]) return (+percentages[opeNo]*100).toFixed(0)  + '%';
        return '-';
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
                let ret = (sum/n*100).toFixed(0);
                orderPercentagesRepublicAllAverage.push({[schoolId]: ret});
                orderPercentagesRepublicAverage.push({[schoolId]: ret});
                Session.set('republicPercentagesAverage_' + schoolId, ret);
                return ret + '%';
            }
        }
        return '-';
    },
    getQuantityRegion(opeNo, schoolId) {
        let totals = [];
        let quantities = [];
        if(Template.instance().subjectId.get() === 'all'){
            quantities = Session.get('regionQuantitiesAll_' + schoolId);   
            totals = Session.get('regionTotalsAll_' + schoolId);
        } else {
            quantities = Session.get('regionQuantities_' + schoolId);
            totals = Session.get('regionTotals_' + schoolId);
        }
        if(quantities) { 
            if(quantities[opeNo]) return quantities[opeNo];
            if(totals) if(totals[opeNo]) return 0;
        }
        return '-';
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
                let ret = (sum/n).toFixed(1);;
                orderQuantitiesRegionAllAverage.push({[schoolId]: ret});
                orderQuantitiesRegionAverage.push({[schoolId]: ret});
                Session.set('regionQuantitiesAverage_' + schoolId, ret);
                return ret;
            }

            orderQuantitiesRegionAllAverage.push({[schoolId]: 0});
            Session.set('regionQuantitiesAverage_' + schoolId, 0);
            orderQuantitiesRegionAverage.push({[schoolId]: 0});
            return 0;
        }
        return '-';
    },
    getTotalRegion(opeNo, schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let totals = Session.get('regionTotalsAll_' + schoolId);
            if(totals) if(totals[opeNo]) return totals[opeNo];
        }
        let totals = Session.get('regionTotals_' + schoolId);
        if(totals) if(totals[opeNo]) return totals[opeNo];
        return '-';
    },
    getTotalRepublic(opeNo, schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let totals = Session.get('republicTotalsAll_' + schoolId);
            if(totals) if(totals[opeNo]) return totals[opeNo];
        }
        let totals = Session.get('republicTotals_' + schoolId);
        if(totals) if(totals[opeNo]) return totals[opeNo];
        return '-';
    },
    getTotalBoth(opeNo, schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let totals = Session.get('totalsBothAll_' + schoolId);
            if(totals) if(totals[opeNo]) return totals[opeNo];
        }
        let totals = Session.get('totalsBoth_' + schoolId);
        if(totals) if(totals[opeNo]) return totals[opeNo];
        return '-';
    },
    averageTotalsRegion(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('regionTotalsAll_' + schoolId);
        else
            averages = Session.get('regionTotals_' + schoolId);
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
                let ret = (sum/n).toFixed(1);
                orderTotalsRegionAllAverage.push({[schoolId]: ret});
                orderTotalsRegionAverage.push({[schoolId]: ret});
                Session.set('regionTotalsAverage_' + schoolId, ret);
                return ret;
            }
        }
        return '-';
    },
    averageTotalsRepublic(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('republicTotalsAll_' + schoolId);
        else
            averages = Session.get('republicTotals_' + schoolId);
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
                let ret = (sum/n).toFixed(1);
                orderTotalsRepublicAllAverage.push({[schoolId]: ret});
                orderTotalsRepublicAverage.push({[schoolId]: ret});
                Session.set('republicTotalsAverage_' + schoolId, ret);
                return ret;
            }
        }
        return '-';
    },
    averageTotalsBoth(schoolId) {
        let averages;
        if(Template.instance().subjectId.get() === 'all')
            averages = Session.get('totalsBothAll_' + schoolId);
        else
            averages = Session.get('totalsBoth_' + schoolId);
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
                let ret = (sum/n).toFixed(1);
                orderTotalsBothAllAverage.push({[schoolId]: ret});
                orderTotalsBothAverage.push({[schoolId]: ret});
                Session.set('bothTotalsAverage_' + schoolId, ret);
                return ret;
            }
        }
        return '-';
    },
    getQuantityRepublic(opeNo, schoolId) {
        let quantities = [];
        let totals = [];
        if(Template.instance().subjectId.get() === 'all') {
            quantities = Session.get('republicQuantitiesAll_' + schoolId);
            totals = Session.get('republicTotalsAll_' + schoolId);
        } else { 
            quantities = Session.get('republicQuantities_' + schoolId);
            totals = Session.get('republicTotals_' + schoolId);
        }
        if(quantities) {
            if(quantities[opeNo]) return quantities[opeNo];
            if(totals) if(totals[opeNo]) return 0;
        }
        return '-';
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
                let ret = (sum/n).toFixed(1);;
                orderQuantitiesRepublicAllAverage.push({[schoolId]: ret});
                orderQuantitiesRepublicAverage.push({[schoolId]: ret});
                Session.set('republicQuantitiesAverage_' + schoolId, ret);
                return ret;
            }
            orderQuantitiesRepublicAllAverage.push({[schoolId]: 0});
            orderQuantitiesRepublicAverage.push({[schoolId]: 0});
            Session.set('republicQuantitiesAverage_' + schoolId, 0);
            return 0;
        }
        return '-';
    },
    getPercentageBoth(opeNo, schoolId){
        if(Template.instance().subjectId.get() === 'all') {
            let percentagesBoth = Session.get('percentagesBothAll_' + schoolId);
            if(percentagesBoth) if(percentagesBoth[opeNo]) return (+percentagesBoth[opeNo]).toFixed(0) + '%';
        }
        let percentagesBoth = Session.get('percentagesBoth_' + schoolId);
        if(percentagesBoth) if(percentagesBoth[opeNo]) return (+percentagesBoth[opeNo]).toFixed(0)  + '%';
        return '-';
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
                let ret = (sum/n).toFixed(0);
                orderPercentagesBothAllAverage.push({[schoolId]: ret});
                orderPercentagesBothAverage.push({[schoolId]: ret});
                Session.set('bothPercentagesAverage_' + schoolId, ret);
                return ret + '%';
            }
        }
        return '-';
    },
    getQuantityBoth(opeNo, schoolId) {
        let quantities = [];
        let totals = [];
        if(Template.instance().subjectId.get() === 'all') {
            quantities = Session.get('quantitiesBothAll_' + schoolId);
            totals = Session.get('totalsBothAll_' + schoolId);
        } else {
            quantities = Session.get('quantitiesBoth_' + schoolId);
            totals = Session.get('totalsBoth_' + schoolId);
        }
        if(quantities) {
            if(quantities[opeNo]) return quantities[opeNo];
            if(totals) if(totals[opeNo]) return 0;
        }
        return '-';
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
                let ret = (sum/n).toFixed(1);;
                orderQuantitiesBothAllAverage.push({[schoolId]: ret});
                orderQuantitiesBothAverage.push({[schoolId]: ret});
                Session.set('bothQuantitiesAverage_' + schoolId, ret);
                return ret;
            }
            orderQuantitiesBothAllAverage.push({[schoolId]: 0});
            orderQuantitiesBothAverage.push({[schoolId]: 0});
            Session.set('bothQuantitiesAverage_' + schoolId, 0);
            return 0;
        }
        return '-';
    },
    getLabelStyle(level) {
        if(level === 'region')
            return "padding: 2px; background-color: #ccffff";
        if(level === 'republic')
            return "padding: 2px; background-color: #cce5ff";
    },
});

let orderAveragesOpe1 = [];
let orderAveragesOpe2 = [];
let orderAveragesOpe3 = [];
let orderAveragesOpe4 = [];
let orderAveragesOpe5 = [];
let orderAveragesOpe6 = [];
let orderAveragesAverage = [];

let orderQuantitiesRegionOpe1 = [];
let orderQuantitiesRegionOpe2 = [];
let orderQuantitiesRegionOpe3 = [];
let orderQuantitiesRegionOpe4 = [];
let orderQuantitiesRegionOpe5 = [];
let orderQuantitiesRegionOpe6 = [];
let orderQuantitiesRegionAverage = [];

let orderTotalsRegionOpe1 = [];
let orderTotalsRegionOpe2 = [];
let orderTotalsRegionOpe3 = [];
let orderTotalsRegionOpe4 = [];
let orderTotalsRegionOpe5 = [];
let orderTotalsRegionOpe6 = [];
let orderTotalsRegionAverage = [];

let orderPercentagesRegionOpe1 = [];
let orderPercentagesRegionOpe2 = [];
let orderPercentagesRegionOpe3 = [];
let orderPercentagesRegionOpe4 = [];
let orderPercentagesRegionOpe5 = [];
let orderPercentagesRegionOpe6 = [];
let orderPercentagesRegionAverage = [];


let orderQuantitiesRepublicOpe1 = [];
let orderQuantitiesRepublicOpe2 = [];
let orderQuantitiesRepublicOpe3 = [];
let orderQuantitiesRepublicOpe4 = [];
let orderQuantitiesRepublicOpe5 = [];
let orderQuantitiesRepublicOpe6 = [];
let orderQuantitiesRepublicAverage = [];

let orderTotalsRepublicOpe1 = [];
let orderTotalsRepublicOpe2 = [];
let orderTotalsRepublicOpe3 = [];
let orderTotalsRepublicOpe4 = [];
let orderTotalsRepublicOpe5 = [];
let orderTotalsRepublicOpe6 = [];
let orderTotalsRepublicAverage = [];

let orderPercentagesRepublicOpe1 = [];
let orderPercentagesRepublicOpe2 = [];
let orderPercentagesRepublicOpe3 = [];
let orderPercentagesRepublicOpe4 = [];
let orderPercentagesRepublicOpe5 = [];
let orderPercentagesRepublicOpe6 = [];
let orderPercentagesRepublicAverage = [];

let orderPercentagesBothOpe1 = [];
let orderPercentagesBothOpe2 = [];
let orderPercentagesBothOpe3 = [];
let orderPercentagesBothOpe4 = [];
let orderPercentagesBothOpe5 = [];
let orderPercentagesBothOpe6 = [];
let orderPercentagesBothAverage = [];

let orderTotalsBothOpe1 = [];
let orderTotalsBothOpe2 = [];
let orderTotalsBothOpe3 = [];
let orderTotalsBothOpe4 = [];
let orderTotalsBothOpe5 = [];
let orderTotalsBothOpe6 = [];
let orderTotalsBothAverage = [];

let orderQuantitiesBothOpe1 = [];
let orderQuantitiesBothOpe2 = [];
let orderQuantitiesBothOpe3 = [];
let orderQuantitiesBothOpe4 = [];
let orderQuantitiesBothOpe5 = [];
let orderQuantitiesBothOpe6 = [];
let orderQuantitiesBothAverage = [];

let orderQuantitiesRegionAllOpe1 = [];
let orderQuantitiesRegionAllOpe2 = [];
let orderQuantitiesRegionAllOpe3 = [];
let orderQuantitiesRegionAllOpe4 = [];
let orderQuantitiesRegionAllOpe5 = [];
let orderQuantitiesRegionAllOpe6 = [];
let orderQuantitiesRegionAllAverage = [];

let orderTotalsRegionAllOpe1 = [];
let orderTotalsRegionAllOpe2 = [];
let orderTotalsRegionAllOpe3 = [];
let orderTotalsRegionAllOpe4 = [];
let orderTotalsRegionAllOpe5 = [];
let orderTotalsRegionAllOpe6 = [];
let orderTotalsRegionAllAverage = [];

let orderPercentagesRegionAllOpe1 = [];
let orderPercentagesRegionAllOpe2 = [];
let orderPercentagesRegionAllOpe3 = [];
let orderPercentagesRegionAllOpe4 = [];
let orderPercentagesRegionAllOpe5 = [];
let orderPercentagesRegionAllOpe6 = [];
let orderPercentagesRegionAllAverage = [];

let orderTotalsRepublicAllOpe1 = [];
let orderTotalsRepublicAllOpe2 = [];
let orderTotalsRepublicAllOpe3 = [];
let orderTotalsRepublicAllOpe4 = [];
let orderTotalsRepublicAllOpe5 = [];
let orderTotalsRepublicAllOpe6 = [];
let orderTotalsRepublicAllAverage = [];

let orderQuantitiesRepublicAllOpe1 = [];
let orderQuantitiesRepublicAllOpe2 = [];
let orderQuantitiesRepublicAllOpe3 = [];
let orderQuantitiesRepublicAllOpe4 = [];
let orderQuantitiesRepublicAllOpe5 = [];
let orderQuantitiesRepublicAllOpe6 = [];
let orderQuantitiesRepublicAllAverage = [];

let orderPercentagesRepublicAllOpe1 = [];
let orderPercentagesRepublicAllOpe2 = [];
let orderPercentagesRepublicAllOpe3 = [];
let orderPercentagesRepublicAllOpe4 = [];
let orderPercentagesRepublicAllOpe5 = [];
let orderPercentagesRepublicAllOpe6 = [];
let orderPercentagesRepublicAllAverage = [];

let orderTotalsBothAllOpe1 = [];
let orderTotalsBothAllOpe2 = [];
let orderTotalsBothAllOpe3 = [];
let orderTotalsBothAllOpe4 = [];
let orderTotalsBothAllOpe5 = [];
let orderTotalsBothAllOpe6 = [];
let orderTotalsBothAllAverage = [];

let orderPercentagesBothAllOpe1 = [];
let orderPercentagesBothAllOpe2 = [];
let orderPercentagesBothAllOpe3 = [];
let orderPercentagesBothAllOpe4 = [];
let orderPercentagesBothAllOpe5 = [];
let orderPercentagesBothAllOpe6 = [];
let orderPercentagesBothAllAverage = [];

let orderQuantitiesBothAllOpe1 = [];
let orderQuantitiesBothAllOpe2 = [];
let orderQuantitiesBothAllOpe3 = [];
let orderQuantitiesBothAllOpe4 = [];
let orderQuantitiesBothAllOpe5 = [];
let orderQuantitiesBothAllOpe6 = [];
let orderQuantitiesBothAllAverage = [];


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

    orderPercentagesRegionOpe1 = [];
    orderPercentagesRegionOpe2 = [];
    orderPercentagesRegionOpe3 = [];
    orderPercentagesRegionOpe4 = [];
    orderPercentagesRegionOpe5 = [];
    orderPercentagesRegionOpe6 = [];
    orderPercentagesRegionAverage = [];

    orderPercentagesRepublicOpe1 = [];
    orderPercentagesRepublicOpe2 = [];
    orderPercentagesRepublicOpe3 = [];
    orderPercentagesRepublicOpe4 = [];
    orderPercentagesRepublicOpe5 = [];
    orderPercentagesRepublicOpe6 = [];
    orderPercentagesRepublicAverage = [];

    orderPercentagesBothOpe1 = [];
    orderPercentagesBothOpe2 = [];
    orderPercentagesBothOpe3 = [];
    orderPercentagesBothOpe4 = [];
    orderPercentagesBothOpe5 = [];
    orderPercentagesBothOpe6 = [];
    orderPercentagesBothAverage = [];

    orderPercentagesRegionAllOpe1 = [];
    orderPercentagesRegionAllOpe2 = [];
    orderPercentagesRegionAllOpe3 = [];
    orderPercentagesRegionAllOpe4 = [];
    orderPercentagesRegionAllOpe5 = [];
    orderPercentagesRegionAllOpe6 = [];
    orderPercentagesRegionAllAverage = [];

    orderPercentagesRepublicAllOpe1 = [];
    orderPercentagesRepublicAllOpe2 = [];
    orderPercentagesRepublicAllOpe3 = [];
    orderPercentagesRepublicAllOpe4 = [];
    orderPercentagesRepublicAllOpe5 = [];
    orderPercentagesRepublicAllOpe6 = [];
    orderPercentagesRepublicAllAverage = [];

    orderPercentagesBothAllOpe1 = [];
    orderPercentagesBothAllOpe2 = [];
    orderPercentagesBothAllOpe3 = [];
    orderPercentagesBothAllOpe4 = [];
    orderPercentagesBothAllOpe5 = [];
    orderPercentagesBothAllOpe6 = [];
    orderPercentagesBothAllAverage = [];
    
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

        Session.set('regionTotals_' + schoolId, []);
        Session.set('republicTotals_' + schoolId, []);
        Session.set('regionTotalsAll_' + schoolId, []);
        Session.set('republicTotalsAll_' + schoolId, []);
        Session.set('totalsBoth_' + schoolId, []);
        Session.set('totalsBothAll_' + schoolId, []);
    })

    orderQuantitiesRegionOpe1 = [];
    orderQuantitiesRegionOpe2 = [];
    orderQuantitiesRegionOpe3 = [];
    orderQuantitiesRegionOpe4 = [];
    orderQuantitiesRegionOpe5 = [];
    orderQuantitiesRegionOpe6 = [];
    orderQuantitiesRegionAverage = [];

    orderQuantitiesRepublicOpe1 = [];
    orderQuantitiesRepublicOpe2 = [];
    orderQuantitiesRepublicOpe3 = [];
    orderQuantitiesRepublicOpe4 = [];
    orderQuantitiesRepublicOpe5 = [];
    orderQuantitiesRepublicOpe6 = [];
    orderQuantitiesRepublicAverage = [];

    orderQuantitiesBothOpe1 = [];
    orderQuantitiesBothOpe2 = [];
    orderQuantitiesBothOpe3 = [];
    orderQuantitiesBothOpe4 = [];
    orderQuantitiesBothOpe5 = [];
    orderQuantitiesBothOpe6 = [];
    orderQuantitiesBothAverage = [];

    orderQuantitiesRegionAllOpe1 = [];
    orderQuantitiesRegionAllOpe2 = [];
    orderQuantitiesRegionAllOpe3 = [];
    orderQuantitiesRegionAllOpe4 = [];
    orderQuantitiesRegionAllOpe5 = [];
    orderQuantitiesRegionAllOpe6 = [];
    orderQuantitiesRegionAllAverage = [];

    orderQuantitiesRepublicAllOpe1 = [];
    orderQuantitiesRepublicAllOpe2 = [];
    orderQuantitiesRepublicAllOpe3 = [];
    orderQuantitiesRepublicAllOpe4 = [];
    orderQuantitiesRepublicAllOpe5 = [];
    orderQuantitiesRepublicAllOpe6 = [];
    orderQuantitiesRepublicAllAverage = [];
    
    orderQuantitiesBothAllOpe1 = [];
    orderQuantitiesBothAllOpe2 = [];
    orderQuantitiesBothAllOpe3 = [];
    orderQuantitiesBothAllOpe4 = [];
    orderQuantitiesBothAllOpe5 = [];
    orderQuantitiesBothAllOpe6 = [];
    orderQuantitiesBothAllAverage = [];

    orderTotalsRegionOpe1 = [];
    orderTotalsRegionOpe2 = [];
    orderTotalsRegionOpe3 = [];
    orderTotalsRegionOpe4 = [];
    orderTotalsRegionOpe5 = [];
    orderTotalsRegionOpe6 = [];
    orderTotalsRegionAverage = [];

    orderTotalsRepublicOpe1 = [];
    orderTotalsRepublicOpe2 = [];
    orderTotalsRepublicOpe3 = [];
    orderTotalsRepublicOpe4 = [];
    orderTotalsRepublicOpe5 = [];
    orderTotalsRepublicOpe6 = [];
    orderTotalsRepublicAverage = [];

    orderTotalsBothOpe1 = [];
    orderTotalsBothOpe2 = [];
    orderTotalsBothOpe3 = [];
    orderTotalsBothOpe4 = [];
    orderTotalsBothOpe5 = [];
    orderTotalsBothOpe6 = [];
    orderTotalsBothAverage = [];

    orderTotalsRegionAllOpe1 = [];
    orderTotalsRegionAllOpe2 = [];
    orderTotalsRegionAllOpe3 = [];
    orderTotalsRegionAllOpe4 = [];
    orderTotalsRegionAllOpe5 = [];
    orderTotalsRegionAllOpe6 = [];
    orderTotalsRegionAllAverage = [];

    orderTotalsRepublicAllOpe1 = [];
    orderTotalsRepublicAllOpe2 = [];
    orderTotalsRepublicAllOpe3 = [];
    orderTotalsRepublicAllOpe4 = [];
    orderTotalsRepublicAllOpe5 = [];
    orderTotalsRepublicAllOpe6 = [];
    orderTotalsRepublicAllAverage = [];
    
    orderTotalsBothAllOpe1 = [];
    orderTotalsBothAllOpe2 = [];
    orderTotalsBothAllOpe3 = [];
    orderTotalsBothAllOpe4 = [];
    orderTotalsBothAllOpe5 = [];
    orderTotalsBothAllOpe6 = [];
    orderTotalsBothAllAverage = [];
}


let resetAverages = function() {
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let schoolId = schoolObject.schoolId;
        Session.set('averages_' + schoolId, []);
    })

    orderAveragesOpe1 = [];
    orderAveragesOpe2 = [];
    orderAveragesOpe3 = [];
    orderAveragesOpe4 = [];
    orderAveragesOpe5 = [];
    orderAveragesOpe6 = [];
    orderAveragesAverage = [];
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
                    if(i == 1) orderAveragesOpe1.push({[schoolId]: averages[i]});
                    else if(i == 2) orderAveragesOpe2.push({[schoolId]: averages[i]});
                    else if(i == 3) orderAveragesOpe3.push({[schoolId]: averages[i]});
                    else if(i == 4) orderAveragesOpe4.push({[schoolId]: averages[i]});
                    else if(i == 5) orderAveragesOpe5.push({[schoolId]: averages[i]});
                    else if(i == 6) orderAveragesOpe6.push({[schoolId]: averages[i]});
                }
            }
            
            Session.set('averages_' + schoolId, averages);
        }
    })
}

let estimatePercentages = function(template) {
    resetPercentages();
    resetQuantities();

    let thresholdRegion = Template.adminOpeRatingsCopy.__helpers.get('opeThresholds')('region');
    let thresholdRepublic = Template.adminOpeRatingsCopy.__helpers.get('opeThresholds')('republic');
    
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
                                if(thresholdRegion) {
                                    nsRegion[i]++;
                                    if(+points >= +thresholdRegion) msRegion[i]++;
                                }
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
            let totals = [];
            for(i = 1; i <= opeNumber; i++) {
                if(nsRegion[i]) {
                    percentages[i] = (msRegion[i]/nsRegion[i]).toFixed(3);
                    quantities[i] = msRegion[i];
                    totals[i] = nsRegion[i];
                    msBoth[i] += msRegion[i];
                    nsBoth[i] += nsRegion[i];
                    if(i == 1) {
                        orderQuantitiesRegionOpe1.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionOpe1.push({[schoolId]: percentages[i]});
                        orderTotalsRegionOpe1.push({[schoolId]: totals[i]});
                    } else if(i == 2) {
                        orderQuantitiesRegionOpe2.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionOpe2.push({[schoolId]: percentages[i]});
                        orderTotalsRegionOpe2.push({[schoolId]: totals[i]});
                    } else if(i == 3) {
                        orderQuantitiesRegionOpe3.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionOpe3.push({[schoolId]: percentages[i]});
                        orderTotalsRegionOpe3.push({[schoolId]: totals[i]});
                    } else if(i == 4) {
                        orderQuantitiesRegionOpe4.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionOpe4.push({[schoolId]: percentages[i]});
                        orderTotalsRegionOpe4.push({[schoolId]: totals[i]});
                    } else if(i == 5) {
                        orderQuantitiesRegionOpe5.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionOpe5.push({[schoolId]: percentages[i]});
                        orderTotalsRegionOpe5.push({[schoolId]: totals[i]});
                    } else if(i == 6) {
                        orderQuantitiesRegionOpe6.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionOpe6.push({[schoolId]: percentages[i]});
                        orderTotalsRegionOpe6.push({[schoolId]: totals[i]});
                    }
                }
            }
            
            Session.set('regionPercentages_' + schoolId, percentages);
            Session.set('regionQuantities_' + schoolId, quantities);
            Session.set('regionTotals_' + schoolId, totals);
        }

        if(nsRepublic) {
            let percentages = [];
            let quantities = [];
            let totals = [];
            for(i = 1; i <= opeNumber; i++) {
                if(nsRepublic[i]) {
                    totals[i] = nsRepublic[i];
                    percentages[i] = (msRepublic[i]/nsRepublic[i]).toFixed(3);
                    quantities[i] = msRepublic[i];
                    msBoth[i] += msRepublic[i];
                    //nsBoth[i] += nsRepublic[i];

                    if(i == 1) {
                        orderQuantitiesRepublicOpe1.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicOpe1.push({[schoolId]: percentages[i]});
                        orderTotalsRepublicOpe1.push({[schoolId]: totals[i]});
                    } else if(i == 2) {
                        orderQuantitiesRepublicOpe2.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicOpe2.push({[schoolId]: percentages[i]});
                        orderTotalsRepublicOpe2.push({[schoolId]: totals[i]});
                    } else if(i == 3) {
                        orderQuantitiesRepublicOpe3.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicOpe3.push({[schoolId]: percentages[i]});
                        orderTotalsRepublicOpe3.push({[schoolId]: totals[i]});
                    } else if(i == 4) {
                        orderQuantitiesRepublicOpe4.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicOpe4.push({[schoolId]: percentages[i]});
                        orderTotalsRepublicOpe4.push({[schoolId]: totals[i]});
                    } else if(i == 5) {
                        orderQuantitiesRepublicOpe5.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicOpe5.push({[schoolId]: percentages[i]});
                        orderTotalsRepublicOpe5.push({[schoolId]: totals[i]});
                    } else if(i == 6) {
                        orderQuantitiesRepublicOpe6.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicOpe6.push({[schoolId]: percentages[i]});
                        orderTotalsRepublicOpe6.push({[schoolId]: totals[i]});
                    }
                }
            }
            
            Session.set('republicPercentages_' + schoolId, percentages);
            Session.set('republicQuantities_' + schoolId, quantities);
            Session.set('republicTotals_' + schoolId, totals);
        }

        let percentagesBoth = [];
        let quantitiesBoth = [];
        let totalsBoth = [];
        for(i = 1; i <= opeNumber; i++) {
            if(nsBoth[i] !== 0){
                percentagesBoth[i] = (msBoth[i]/nsBoth[i]*100).toFixed(0);
                quantitiesBoth[i] = msBoth[i]
                totalsBoth[i] = nsBoth[i];
                if(i == 1) {
                    orderQuantitiesBothOpe1.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothOpe1.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothOpe1.push({[schoolId]: totalsBoth[i]});
                } else if(i == 2) {
                    orderQuantitiesBothOpe2.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothOpe2.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothOpe2.push({[schoolId]: totalsBoth[i]});
                } else if(i == 3) {
                    orderQuantitiesBothOpe3.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothOpe3.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothOpe3.push({[schoolId]: totalsBoth[i]});
                } else if(i == 4) {
                    orderQuantitiesBothOpe4.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothOpe4.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothOpe4.push({[schoolId]: totalsBoth[i]});
                } else if(i == 5) {
                    orderQuantitiesBothOpe5.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothOpe5.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothOpe5.push({[schoolId]: totalsBoth[i]});
                } else if(i == 6) {
                    orderQuantitiesBothOpe6.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothOpe6.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothOpe6.push({[schoolId]: totalsBoth[i]});
                }
            }
        }
        Session.set('percentagesBoth_' + schoolId, percentagesBoth);
        Session.set('quantitiesBoth_' + schoolId, quantitiesBoth);
        Session.set('totalsBoth_' + schoolId, totalsBoth);
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
                                let thresholdRegion = parseFloat(opeThresholds[threshold].replace(/,/g, ''));
                                if(!isNaN(thresholdRegion)) {
                                    nsRegion[i]++;
                                    if(+points >= +thresholdRegion) msRegion[i]++;
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
            let totals = [];
            for(i = 1; i <= opeNumber; i++) {
                if(nsRegion[i]) {
                    percentages[i] = (msRegion[i]/nsRegion[i]).toFixed(3);
                    quantities[i] = msRegion[i];
                    totals[i] = nsRegion[i];
                    msBoth[i] += msRegion[i];
                    nsBoth[i] += nsRegion[i];

                    if(i == 1) {
                        orderQuantitiesRegionAllOpe1.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionAllOpe1.push({[schoolId]: percentages[i]});
                        orderTotalsRegionAllOpe1.push({[schoolId]: totals[i]});
                    } else if(i == 2) {
                        orderQuantitiesRegionAllOpe2.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionAllOpe2.push({[schoolId]: percentages[i]});
                        orderTotalsRegionAllOpe2.push({[schoolId]: totals[i]});
                    } else if(i == 3) {
                        orderQuantitiesRegionAllOpe3.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionAllOpe3.push({[schoolId]: percentages[i]});
                        orderTotalsRegionAllOpe3.push({[schoolId]: totals[i]});
                    } else if(i == 4) {
                        orderQuantitiesRegionAllOpe4.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionAllOpe4.push({[schoolId]: percentages[i]});
                        orderTotalsRegionAllOpe4.push({[schoolId]: totals[i]});
                    } else if(i == 5) {
                        orderQuantitiesRegionAllOpe5.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionAllOpe5.push({[schoolId]: percentages[i]});
                        orderTotalsRegionAllOpe5.push({[schoolId]: totals[i]});
                    } else if(i == 6) {
                        orderQuantitiesRegionAllOpe6.push({[schoolId]: quantities[i]});
                        orderPercentagesRegionAllOpe6.push({[schoolId]: percentages[i]});
                        orderTotalsRegionAllOpe6.push({[schoolId]: totals[i]});
                    }
                }
            }
            
            //console.log('schoolId: ' + schoolId + ': ' + msRegion + ' ' + nsRegion)  

            Session.set('regionPercentagesAll_' + schoolId, percentages);
            Session.set('regionQuantitiesAll_' + schoolId, quantities);
            Session.set('regionTotalsAll_' + schoolId, totals);
        }

        if(nsRepublic) {
            let averages = [];
            let quantities = [];
            let totals = [];
            for(i = 1; i <= opeNumber; i++) {
                if(nsRepublic[i]) {
                    averages[i] = (msRepublic[i]/nsRepublic[i]).toFixed(3);
                    quantities[i] = msRepublic[i];
                    totals[i] = nsRepublic[i];
                    msBoth[i] += msRepublic[i];
                    //nsBoth[i] += nsRepublic[i];

                    if(i == 1) {
                        orderQuantitiesRepublicAllOpe1.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicAllOpe1.push({[schoolId]: averages[i]});
                        orderTotalsRepublicAllOpe1.push({[schoolId]: totals[i]});
                    } else if(i == 2) {
                        orderQuantitiesRepublicAllOpe2.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicAllOpe2.push({[schoolId]: averages[i]});
                        orderTotalsRepublicAllOpe2.push({[schoolId]: totals[i]});
                    } else if(i == 3) {
                        orderQuantitiesRepublicAllOpe3.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicAllOpe3.push({[schoolId]: averages[i]});
                        orderTotalsRepublicAllOpe3.push({[schoolId]: totals[i]});
                    } else if(i == 4) {
                        orderQuantitiesRepublicAllOpe4.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicAllOpe4.push({[schoolId]: averages[i]});
                        orderTotalsRepublicAllOpe4.push({[schoolId]: totals[i]});
                    } else if(i == 5) {
                        orderQuantitiesRepublicAllOpe5.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicAllOpe5.push({[schoolId]: averages[i]});
                        orderTotalsRepublicAllOpe5.push({[schoolId]: totals[i]});
                    } else if(i == 6) {
                        orderQuantitiesRepublicAllOpe6.push({[schoolId]: quantities[i]});
                        orderPercentagesRepublicAllOpe6.push({[schoolId]: averages[i]});
                        orderTotalsRepublicAllOpe6.push({[schoolId]: totals[i]});
                    }
                }
            }
            
            Session.set('republicPercentagesAll_' + schoolId, averages);
            Session.set('republicQuantitiesAll_' + schoolId, quantities);
            Session.set('republicTotalsAll_' + schoolId, totals);
        }

        let percentagesBoth = [];
        let quantitiesBoth = [];
        let totalsBoth = [];
        for(i = 1; i <= opeNumber; i++) {
            if(nsBoth[i] !== 0){
                percentagesBoth[i] = (msBoth[i]/nsBoth[i]*100).toFixed(0);
                quantitiesBoth[i] = msBoth[i];
                totalsBoth[i] = nsBoth[i];
                if(i == 1) {
                    orderQuantitiesBothAllOpe1.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothAllOpe1.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothAllOpe1.push({[schoolId]: totalsBoth[i]});
                } else if(i == 2) {
                    orderQuantitiesBothAllOpe2.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothAllOpe2.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothAllOpe2.push({[schoolId]: totalsBoth[i]});
                } else if(i == 3) {
                    orderQuantitiesBothAllOpe3.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothAllOpe3.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothAllOpe3.push({[schoolId]: totalsBoth[i]});
                } else if(i == 4) {
                    orderQuantitiesBothAllOpe4.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothAllOpe4.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothAllOpe4.push({[schoolId]: totalsBoth[i]});
                } else if(i == 5) {
                    orderQuantitiesBothAllOpe5.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothAllOpe5.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothAllOpe5.push({[schoolId]: totalsBoth[i]});
                } else if(i == 6) {
                    orderQuantitiesBothAllOpe6.push({[schoolId]: quantitiesBoth[i]});
                    orderPercentagesBothAllOpe6.push({[schoolId]: percentagesBoth[i]});
                    orderTotalsBothAllOpe6.push({[schoolId]: totalsBoth[i]});
                }
            }
        }

        Session.set('percentagesBothAll_' + schoolId, percentagesBoth);
        Session.set('quantitiesBothAll_' + schoolId, quantitiesBoth);
        Session.set('totalsBothAll_' + schoolId, totalsBoth);
    })
}

Template.adminOpeRatingsCopy.events({
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
    },
    'click #ope1-m'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope1-n'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRegionAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRegionOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRepublicAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRepublicOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsBothAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsBothOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope1-p'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope2-m'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope2-n'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRegionAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRegionOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRepublicAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRepublicOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsBothAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsBothOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope2-p'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope3-m'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope3-n'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRegionAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRegionOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRepublicAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRepublicOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsBothAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsBothOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope3-p'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope4-m'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope4-n'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRegionAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRegionOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRepublicAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRepublicOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsBothAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsBothOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope4-p'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope5-m'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope5-n'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRegionAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRegionOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRepublicAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRepublicOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsBothAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsBothOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope6-m'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope6-n'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRegionAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRegionOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRepublicAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsRepublicOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsBothAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderTotalsBothOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope6-p'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope6-p'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #average-m'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                    orderQuantitiesRegionAllAverage.sort(function(a, b) {
                        return Object.values(b) - Object.values(a);
                    })
                    orderQuantitiesRegionAllAverage.map(o => {
                        order.push(Object.keys(o)[0]);
                    })
                    if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                        Session.set('order', order.reverse());
                    } else {
                        Session.set('order', order);
                    }
                    orderQuantitiesRegionAllAverage = [];
                }
            } else {
                if(orderQuantitiesRegionAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesRegionAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesRepublicAllAverage = [];
                }
            } else {
                if(orderQuantitiesRepublicAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesRepublicAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesBothAverage = [];
                }
            } else {
                if(orderQuantitiesBothAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesBothAllAverage = [];
                }
            }
        }
    },
    'click #average-n'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRegionAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderTotalsRegionAllAverage = [];
                }
            } else {
                if(orderTotalsRegionAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRegionAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRegionAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderTotalsRegionAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsRepublicAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderTotalsRepublicAllAverage = [];
                }
            } else {
                if(orderTotalsRepublicAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsRepublicAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsRepublicAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderTotalsRepublicAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderTotalsBothAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderTotalsBothAllAverage = [];
                }
            } else {
                if(orderTotalsBothAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderTotalsBothAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderTotalsBothAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderTotalsBothAverage = [];
                }
            }
        }
    },
    'click #average-p'(event, template) {
        if(template.rating_type.get() === 'region') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesRegionAllAverage = [];
                }
            } else {
                if(orderPercentagesRegionAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesRegionAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'republic'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesRepublicAllAverage = [];
                }
            } else {
                if(orderPercentagesRepublicAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesRepublicAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'both'){
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesBothAllAverage = [];
                }
            } else {
                if(orderPercentagesBothAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesBothAverage = [];
                }
            }
        }
    },
    'click #ope1'(event, template){
        if(template.rating_type.get() === 'average'){
            if(orderAveragesOpe1.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderAveragesOpe1.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderAveragesOpe1.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else if(template.rating_type.get() === 'percentageRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderPercentagesBothOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe1.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderQuantitiesBothOpe1.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe1.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope2'(event, template){
        if(template.rating_type.get() === 'average'){
            if(orderAveragesOpe2.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderAveragesOpe2.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderAveragesOpe2.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else if(template.rating_type.get() === 'percentageRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderPercentagesBothOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe2.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderQuantitiesBothOpe2.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe2.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope3'(event, template){
        if(template.rating_type.get() === 'average'){
            if(orderAveragesOpe3.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderAveragesOpe3.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderAveragesOpe3.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else if(template.rating_type.get() === 'percentageRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderPercentagesBothOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe3.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderQuantitiesBothOpe3.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe3.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope4'(event, template){
        if(template.rating_type.get() === 'average'){
            if(orderAveragesOpe4.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderAveragesOpe4.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderAveragesOpe4.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else if(template.rating_type.get() === 'percentageRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderPercentagesBothOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe4.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderQuantitiesBothOpe4.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe4.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope5'(event, template){
        if(template.rating_type.get() === 'average'){
            if(orderAveragesOpe5.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderAveragesOpe5.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderAveragesOpe5.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else if(template.rating_type.get() === 'percentageRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderPercentagesBothOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe5.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderQuantitiesBothOpe5.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe5.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #ope6'(event, template){
        if(template.rating_type.get() === 'average'){
            if(orderAveragesOpe6.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderAveragesOpe6.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderAveragesOpe6.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else if(template.rating_type.get() === 'percentageRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRegionOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesRepublicOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRegionOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesRepublicOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'percentageBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderPercentagesBothOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderPercentagesBothOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        } else if(template.rating_type.get() === 'quantityBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            } else {
                if(orderQuantitiesBothOpe6.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderQuantitiesBothOpe6.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothOpe6.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                }
            }
        }
    },
    'click #opeAverage'(event, template){
        if(template.rating_type.get() === 'average'){
            if(orderAveragesAverage.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderAveragesAverage.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderAveragesAverage.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
                orderAveragesAverage = [];
            }
        } else if(template.rating_type.get() === 'percentageRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRegionAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                    orderPercentagesRegionAllAverage.sort(function(a, b) {
                        return Object.values(b) - Object.values(a);
                    })
                    orderPercentagesRegionAllAverage.map(o => {
                        order.push(Object.keys(o)[0]);
                    })
                    if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                        Session.set('order', order.reverse());
                    } else {
                        Session.set('order', order);
                    }
                    orderPercentagesRegionAllAverage = [];
                }
            } else {
                if(orderPercentagesRegionAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRegionAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRegionAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesRegionAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'percentageRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesRepublicAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesRepublicAllAverage = [];
                }
            } else {
                if(orderPercentagesRepublicAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesRepublicAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesRepublicAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesRepublicAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'quantityRegion') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRegionAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesRegionAllAverage = [];
                }
            } else {
                if(orderQuantitiesRegionAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRegionAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRegionAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesRegionAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'quantityRepublic') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesRepublicAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesRepublicAllAverage = [];
                }
            } else {
                if(orderQuantitiesRepublicAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesRepublicAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesRepublicAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesRepublicAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'percentageBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderPercentagesBothAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderPercentagesBothAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesBothAllAverage = [];
                }
            } else {
                if(orderPercentagesBothAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderPercentagesBothAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderPercentagesBothAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderPercentagesBothAverage = [];
                }
            }
        } else if(template.rating_type.get() === 'quantityBoth') {
            if(template.subjectId.get() === 'all') {
                if(orderQuantitiesBothAllAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                let order = []
                        orderQuantitiesBothAllAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAllAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesBothAllAverage = [];
                }
            } else {
                if(orderQuantitiesBothAverage.length !== 0) {
                    let oldOrder = Session.get('order');
                    let order = []
                        orderQuantitiesBothAverage.sort(function(a, b) {
                            return Object.values(b) - Object.values(a);
                        })
                        orderQuantitiesBothAverage.map(o => {
                            order.push(Object.keys(o)[0]);
                        })
                        if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                            Session.set('order', order.reverse());
                        } else {
                            Session.set('order', order);
                        }
                        orderQuantitiesBothAverage = [];
                }
            }
        }
    },
    'click #download'(event, template) {
        let rating_type = template.rating_type.get();
        
        let schools = Schools.find({}).fetch();

        let data = [];
        

        if(rating_type === 'average') {
            let headers = ['schoolName', 'ope1', 'ope2', 'ope3', 'ope4', 'ope5', 'ope6'];
            data.push(headers);
            
            schools.map(school => {
                let averages = Session.get('averages_' + school.schoolId);
                let average = Session.get('averagesAverage_' + school.schoolId);
                let dataRow = [school.shortName, averages[1], averages[2], averages[3], averages[4], averages[5], averages[6], average];

                data.push(dataRow);
            })            
        } else if(rating_type === 'region') {
            let headers = ['schoolName', 'ope1-қанша', 'ope1-қаншадан', 'ope1-%', 
            'ope2-қанша', 'ope2-қаншадан', 'ope2-%',
            'ope3-қанша', 'ope3-қаншадан', 'ope3-%',
            'ope4-қанша', 'ope4-қаншадан', 'ope4-%',
            'ope5-қанша', 'ope5-қаншадан', 'ope5-%',
            'ope6-қанша', 'ope6-қаншадан', 'ope6-%',
            'орташа-қанша', 'орташа-қаншадан', 'орташа-%'];
            data.push(headers);

            schools.map(school => {
                let percentages = Session.get('regionPercentages_' + school.schoolId);
                if(percentages.length === 0) percentages = Session.get('regionPercentagesAll_' + school.schoolId);
                let percentagesAverage = Session.get('regionPercentagesAverage_' + school.schoolId);

                let quantities = Session.get('regionQuantities_' + school.schoolId);
                if(quantities.length === 0) quantities = Session.get('regionQuantitiesAll_' + school.schoolId);
                let quantitiesAverage = Session.get('regionQuantitiesAverage_' + school.schoolId);

                let totals = Session.get('regionTotals_' + school.schoolId);
                if(totals.length === 0) totals = Session.get('regionTotalsAll_' + school.schoolId);
                let totalsAverage = Session.get('regionTotalsAverage_' + school.schoolId);

                let dataRow = [school.shortName];
                for(let i = 1; i <= 6; i++) {
                    if(quantities[i]) dataRow.push(quantities[i])
                    else if(totals[i]) dataRow.push(0);
                    else dataRow.push('');

                    if(totals[i]) dataRow.push(totals[i])
                    else dataRow.push(''); 

                    if(percentages[i]) {
                        dataRow.push(((+percentages[i])*100).toFixed(0) + '%');
                    } else {
                        dataRow.push('');
                    }
                } 

                if(quantitiesAverage) dataRow.push(quantitiesAverage);
                else if(totalsAverage) dataRow.push('0');
                else dataRow.push('');

                if(totalsAverage) dataRow.push(totalsAverage);
                else dataRow.push('');

                if(percentagesAverage) {
                    dataRow.push(percentagesAverage + '%');
                } else {
                    dataRow.push('');
                }
                
                data.push(dataRow);
            })   
        } else if(rating_type === 'republic') {
            let headers = ['schoolName', 'ope1-қанша', 'ope1-қаншадан', 'ope1-%', 
            'ope2-қанша', 'ope2-қаншадан', 'ope2-%',
            'ope3-қанша', 'ope3-қаншадан', 'ope3-%',
            'ope4-қанша', 'ope4-қаншадан', 'ope4-%',
            'ope5-қанша', 'ope5-қаншадан', 'ope5-%',
            'ope6-қанша', 'ope6-қаншадан', 'ope6-%',
            'орташа-қанша', 'орташа-қаншадан', 'орташа-%'];
            data.push(headers);

            schools.map(school => {
                let percentages = Session.get('republicPercentages_' + school.schoolId);
                if(percentages.length === 0) percentages = Session.get('republicPercentagesAll_' + school.schoolId);
                let percentagesAverage = Session.get('republicPercentagesAverage_' + school.schoolId);

                let quantities = Session.get('republicQuantities_' + school.schoolId);
                if(quantities.length === 0) quantities = Session.get('republicQuantitiesAll_' + school.schoolId);
                let quantitiesAverage = Session.get('republicQuantitiesAverage_' + school.schoolId);

                let totals = Session.get('republicTotals_' + school.schoolId);
                if(totals.length === 0) totals = Session.get('republicTotalsAll_' + school.schoolId);
                let totalsAverage = Session.get('republicTotalsAverage_' + school.schoolId);

                let dataRow = [school.shortName];
                for(let i = 1; i <= 6; i++) {
                    if(quantities[i]) dataRow.push(quantities[i])
                    else if(totals[i]) dataRow.push(0);
                    else dataRow.push('');

                    if(totals[i]) dataRow.push(totals[i])
                    else dataRow.push(''); 

                    if(percentages[i]) {
                        dataRow.push(((+percentages[i])*100).toFixed(0) + '%');
                    } else {
                        dataRow.push('');
                    }
                } 

                if(quantitiesAverage) dataRow.push(quantitiesAverage);
                else if(totalsAverage) dataRow.push('0');
                else dataRow.push('');

                if(totalsAverage) dataRow.push(totalsAverage);
                else dataRow.push('');

                if(percentagesAverage) {
                    dataRow.push(percentagesAverage + '%');
                } else {
                    dataRow.push('');
                }
                
                data.push(dataRow);
            })   
        } else if(rating_type === 'both') {
            let headers = ['schoolName', 'ope1-қанша', 'ope1-қаншадан', 'ope1-%', 
            'ope2-қанша', 'ope2-қаншадан', 'ope2-%',
            'ope3-қанша', 'ope3-қаншадан', 'ope3-%',
            'ope4-қанша', 'ope4-қаншадан', 'ope4-%',
            'ope5-қанша', 'ope5-қаншадан', 'ope5-%',
            'ope6-қанша', 'ope6-қаншадан', 'ope6-%',
            'орташа-қанша', 'орташа-қаншадан', 'орташа-%'];
            data.push(headers);

            schools.map(school => {
                let percentages = Session.get('percentagesBoth_' + school.schoolId);
                if(percentages.length === 0) percentages = Session.get('percentagesBothAll_' + school.schoolId);
                let percentagesAverage = Session.get('bothPercentagesAverage_' + school.schoolId);

                let quantities = Session.get('quantitiesBoth_' + school.schoolId);
                if(quantities.length === 0) quantities = Session.get('quantitiesBothAll_' + school.schoolId);
                let quantitiesAverage = Session.get('bothQuantitiesAverage_' + school.schoolId);

                let totals = Session.get('totalsBoth_' + school.schoolId);
                if(totals.length === 0) totals = Session.get('totalsBothAll_' + school.schoolId);
                let totalsAverage = Session.get('bothTotalsAverage_' + school.schoolId);

                let dataRow = [school.shortName];
                for(let i = 1; i <= 6; i++) {
                    if(quantities[i]) dataRow.push(quantities[i])
                    else if(totals[i]) dataRow.push(0);
                    else dataRow.push('');

                    if(totals[i]) dataRow.push(totals[i])
                    else dataRow.push(''); 

                    if(percentages[i]) {
                        dataRow.push((+percentages[i]) + '%');
                    } else {
                        dataRow.push('');
                    }
                } 

                if(quantitiesAverage) dataRow.push(quantitiesAverage);
                else if(totalsAverage) dataRow.push('0');
                else dataRow.push('');

                if(totalsAverage) dataRow.push(totalsAverage);
                else dataRow.push('');

                if(percentagesAverage) {
                    dataRow.push(percentagesAverage + '%');
                } else {
                    dataRow.push('');
                }
                
                data.push(dataRow);
            })   
        } 
        
        Meteor.call('download', data, (err, wb) => {
            if (err) throw err;

            let sName = academicYear.get() + '_OPE_' + rating_type + '.xlsx';
            XLSX.writeFile(wb, sName);
        });
    }
})

Template.adminOpeRatingsCopy.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
