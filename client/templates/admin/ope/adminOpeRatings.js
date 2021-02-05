import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './adminOpeRatings.html';
import { _ } from 'core-js';
import XLSX from 'xlsx';

Template.adminOpeRatings.onCreated(function() {
    let template = this
    document.title = "OPE Рейтинг";
    template.subjectId = new ReactiveVar('all');
    template.grade = new ReactiveVar('all');
    template.threshold_region = new ReactiveVar();
    template.threshold_republic = new ReactiveVar();
    template.ope_number = new ReactiveVar();

    Session.set('order', []);

    template.subscribe('adminOpeSchools');
    template.subscribe('configs');

    // template.autorun(() => {
    //     template.subscribe("adminOpeResults", academicYear.get(), 'all', template.subjectId.get(), template.grade.get());
    //     template.subscribe('adminStudents', 'all', template.subjectId.get(), template.grade.get());
    // })

    template.subscribe("adminOpeResults", academicYear.get(), 'all', 'all', 'all');
    template.subscribe('adminOpeStudents', 'all', 'all', 'all');
})

Template.adminOpeRatings.helpers({
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
        let option = Template.instance().ope_number.get();
        if(option === '' || option === 'default') return false;
        return true;
    },
    opeThresholds(level) {
        let subjectId = Template.instance().subjectId.get();
        return Configs.findOne({_id: "opeThresholds"})[level+ '_' + subjectId];
    },
    
    getPercentageRegion(schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            
            let percentages = Session.get('regionPercentagesAll_' + schoolId);
            if(percentages) return (+percentages*100).toFixed(0)  + '%';
        }
        let percentages = Session.get('regionPercentages_' + schoolId);
        if(percentages) return (+percentages*100).toFixed(0)  + '%';
        return '-';
    },
    getPercentageRepublic(schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let percentages = Session.get('republicPercentagesAll_' + schoolId);
            if(percentages) return (+percentages*100).toFixed(0) + '%';
        }
        let percentages = Session.get('republicPercentages_' + schoolId);
        if(percentages) return (+percentages*100).toFixed(0)  + '%';
        return '-';
    },
    getQuantityRegion(schoolId) {
        let totals;
        let quantities;
        if(Template.instance().subjectId.get() === 'all'){
            quantities = Session.get('regionQuantitiesAll_' + schoolId);   
            totals = Session.get('regionTotalsAll_' + schoolId);
        } else {
            quantities = Session.get('regionQuantities_' + schoolId);
            totals = Session.get('regionTotals_' + schoolId);
        }
        if(quantities) return quantities;
            
        if(totals) return 0;
    
        return '-';
    },
    getTotalRegion(schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let totals = Session.get('regionTotalsAll_' + schoolId);
            if(totals) return totals;
        }
        let totals = Session.get('regionTotals_' + schoolId);
        if(totals) return totals;
        return '-';
    },
    getTotalRepublic(schoolId) {
        if(Template.instance().subjectId.get() === 'all'){
            let totals = Session.get('republicTotalsAll_' + schoolId);
            if(totals) return totals;
        }
        let totals = Session.get('republicTotals_' + schoolId);

        if(totals) return totals;
        return '-';
    },
    getQuantityRepublic(schoolId) {
        let quantities;
        let totals;
        if(Template.instance().subjectId.get() === 'all') {
            quantities = Session.get('republicQuantitiesAll_' + schoolId);
            totals = Session.get('republicTotalsAll_' + schoolId);
        } else { 
            quantities = Session.get('republicQuantities_' + schoolId);
            totals = Session.get('republicTotals_' + schoolId);
        }
        if(quantities) return quantities;
        if(totals) return 0;
        return '-';
    },
    getStatedRegion(schoolId) {
        let stated;
        if(Template.instance().subjectId.get() === 'all') {
            stated = Session.get('regionStatedAll_' + schoolId);
        } else {
            stated = Session.get('regionStated_' + schoolId);
        }
        if(stated) return stated;
        return '-';
    },
    getStatedRepublic(schoolId) {
        let stated;
        if(Template.instance().subjectId.get() === 'all') {
            stated = Session.get('republicStatedAll_' + schoolId);
        } else {
            stated = Session.get('republicStated_' + schoolId);
        }
        if(stated) return stated;
        return '-';
    },
    totalNumber(schoolId) {
        let totalNumber;
        if(Template.instance().subjectId.get() === 'all') {
            totalNumber = Session.get('totalNumberAll_' + schoolId);
        } else {
            totalNumber = Session.get('totalNumber_' + schoolId);
        }
        if(totalNumber) return totalNumber;
        return '-';
    },
    getLabelStyle(level) {
        if(level === 'region')
            return "padding: 2px; background-color: #ccffff";
        if(level === 'republic')
            return "padding: 2px; background-color: #cce5ff";
    },
});

let orderQuantitiesRegion = [];
let orderTotalsRegion = [];
let orderPercentagesRegion = [];
let orderQuantitiesRepublic = [];
let orderTotalsRepublic = [];
let orderPercentagesRepublic = [];
let orderStatedRegion = [];
let orderStatedRepublic = [];

let orderQuantitiesRegionAll = [];
let orderTotalsRegionAll = [];
let orderPercentagesRegionAll = [];
let orderQuantitiesRepublicAll = [];
let orderTotalsRepublicAll = [];
let orderPercentagesRepublicAll = [];
let orderStatedRegionAll = [];
let orderStatedRepublicAll = [];

let orderTotalNumberAll = [];
let orderTotalNumber = [];

let reset = function() {
    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let schoolId = schoolObject.schoolId;
        Session.set('regionPercentages_' + schoolId, null);
        Session.set('republicPercentages_' + schoolId, null);
        Session.set('regionPercentagesAll_' + schoolId, null);
        Session.set('republicPercentagesAll_' + schoolId, null);

        Session.set('regionQuantities_' + schoolId, null);
        Session.set('republicQuantities_' + schoolId, null);
        Session.set('regionQuantitiesAll_' + schoolId, null);
        Session.set('republicQuantitiesAll_' + schoolId, null);

        Session.set('regionTotals_' + schoolId, null);
        Session.set('republicTotals_' + schoolId, null);
        Session.set('regionTotalsAll_' + schoolId, null);
        Session.set('republicTotalsAll_' + schoolId, null);

        Session.set('totalNumber_' + schoolId, null);
    })

    orderPercentagesRegion = [];
    orderPercentagesRepublic = [];
    orderPercentagesRegionAll = [];
    orderPercentagesRepublicAll = [];
    
    orderQuantitiesRegion = [];
    orderQuantitiesRepublic = [];
    orderQuantitiesRegionAll = [];
    orderQuantitiesRepublicAll = [];

    orderTotalsRegion = [];
    orderTotalsRepublic = [];
    orderTotalsRegionAll = [];
    orderTotalsRepublicAll = [];

    orderStatedRegion = [];
    orderStatedRepublic = [];
    orderStatedRegionAll = [];
    orderStatedRepublicAll = [];

    orderTotalNumber = [];
    orderTotalNumberAll = [];
}

let estimate = function(template) {
    reset();

    let thresholdRegion = Template.adminOpeRatings.__helpers.get('opeThresholds')('region');
    let thresholdRepublic = Template.adminOpeRatings.__helpers.get('opeThresholds')('republic');
    
    if(!thresholdRegion && !thresholdRepublic) return;
    
    let olympiad = template.subjectId.get();
    let grade = template.grade.get();

    let opeNumber = template.ope_number.get();

    if(opeNumber){
        let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();
        schoolIds.map((schoolObject) => {
            let opeResults;
            let schoolId = schoolObject.schoolId;
            let students;

            let statedRegion = 0;
            let statedRepublic = 0;
            if(grade === 'all' && olympiad === 'all') {
                opeResults = OpeResults.find({schoolId}).fetch();
                students = Students.find({schoolId}).fetch();
            } else if(grade === 'all') { 
                opeResults = OpeResults.find({schoolId, olympiad}).fetch();
                students = Students.find({schoolId, olympiad}).fetch();
            } else if(olympiad === 'all') { 
                opeResults = OpeResults.find({schoolId, grade}).fetch();
                students = Students.find({schoolId, grade}).fetch();
            } else {
                opeResults = OpeResults.find({schoolId, grade, olympiad}).fetch();
                students = Students.find({schoolId, grade, olympiad}).fetch();
            }

            students.map(student => {
                if(student.level ) {
                    if(student.level === 'Область') statedRegion++;
                    if(student.level === 'Республика') {
                        statedRepublic++;
                        statedRegion++;
                    }
                }
            })

            let totalNumber = opeResults.filter(opeResult => opeResult['ope'+opeNumber]).length;
            Session.set('totalNumber_' + schoolId, totalNumber);
            orderTotalNumber.push({[schoolId]: totalNumber})

            Session.set('regionStated_' + schoolId, statedRegion);
            Session.set('republicStated_' + schoolId, statedRepublic);

            orderStatedRegion.push({[schoolId]: statedRegion});
            orderStatedRepublic.push({[schoolId]: statedRepublic})

            let msRegion = 0;
            let nsRegion = 0;
            let msRepublic = 0;
            let nsRepublic = 0;


            opeResults.map((opeResult) => {  
                // let student = Students.findOne({studentId : opeResult.studentId});
                // if(!student) return;
                
                let level = opeResult.level;
                if(opeResult['ope' + opeNumber]){
                    let points = parseFloat(opeResult['ope' + opeNumber].replace(/,/g, ''));
                    if(level && points){
                        if(level === 'Область'){
                            if(thresholdRegion) {
                                nsRegion++;
                                if(+points >= +thresholdRegion) msRegion++;
                            }
                        } else if(level === 'Республика') {
                            if(thresholdRepublic) {
                                nsRepublic++;
                                if(+points >= +thresholdRepublic)
                                    msRepublic++;
                                if(thresholdRegion) {
                                    nsRegion++;
                                    if(+points >= +thresholdRegion) msRegion++;
                                }
                            }
                        }
                    }
                }
            })


            if(nsRegion) {
                let percentages;
                let quantities;
                let totals;
                
                if(nsRegion) {
                    percentages = (msRegion/nsRegion).toFixed(3);
                    quantities = msRegion;
                    totals = nsRegion;

                    orderQuantitiesRegion.push({[schoolId]: quantities});
                    orderPercentagesRegion.push({[schoolId]: percentages});
                    orderTotalsRegion.push({[schoolId]: totals});
                    
                }
                
                Session.set('regionPercentages_' + schoolId, percentages);
                Session.set('regionQuantities_' + schoolId, quantities);
                Session.set('regionTotals_' + schoolId, totals);
            }

            if(nsRepublic) {
                let percentages;
                let quantities;
                let totals;
                
                if(nsRepublic) {
                    totals = nsRepublic;
                    percentages = (msRepublic/nsRepublic).toFixed(3);
                    quantities = msRepublic;

                    orderQuantitiesRepublic.push({[schoolId]: quantities});
                    orderPercentagesRepublic.push({[schoolId]: percentages});
                    orderTotalsRepublic.push({[schoolId]: totals});
                    
                }
            
                Session.set('republicPercentages_' + schoolId, percentages);
                Session.set('republicQuantities_' + schoolId, quantities);
                Session.set('republicTotals_' + schoolId, totals);
            }            
        })
    }
}

let estimateGeneral = function(template) {
    reset();

    let opeThresholds = Configs.findOne({_id: 'opeThresholds'});
    if(!opeThresholds) return;

    let thresholds = Object.keys(opeThresholds);
    if(thresholds.length === 0) return;

    let grade = template.grade.get();

    let opeNumber = template.ope_number.get();
    if(!opeNumber) return;

    let schoolIds = Schools.find({}, {fields: {schoolId: 1, _id: 0}}).fetch();

    schoolIds.map((schoolObject) => {
        let opeResults;
        let schoolId = schoolObject.schoolId;
        let students;
        let statedRegion = 0;
        let statedRepublic = 0;
        if(grade === 'all') {
            opeResults = OpeResults.find({schoolId}).fetch();
            students = Students.find({schoolId}).fetch();
        } else {
            opeResults = OpeResults.find({schoolId, grade}).fetch();
            students = Students.find({schoolId, grade})
        }
        students.map(student => {
            if(student.level ) {
                if(student.level === 'Область') statedRegion++;
                if(student.level === 'Республика') {
                    statedRepublic++;
                    statedRegion++;
                }
            }
        })

        Session.set('regionStatedAll_' + schoolId, statedRegion);
        Session.set('republicStatedAll_' + schoolId, statedRepublic);

        orderStatedRegionAll.push({[schoolId]: statedRegion});
        orderStatedRepublicAll.push({[schoolId]: statedRepublic})

        let msRegion = 0;
        let nsRegion = 0;
        let msRepublic = 0;
        let nsRepublic = 0;

        let totalNumber = opeResults.filter(opeResult => opeResult['ope'+opeNumber]).length;
        Session.set('totalNumberAll_' + schoolId, totalNumber);
        orderTotalNumberAll.push({[schoolId]: totalNumber});

        thresholds.filter(threshold => {
            return threshold !== '_id';
        }).map(threshold => {
            let tokens = threshold.split('_');
            let thresholdLevel = tokens[0];
            let thresholdSubjectId = tokens[1];
            

            opeResults.filter((opeResult) => {
                return opeResult.level && opeResult.level != 'none' && thresholdSubjectId === opeResult.olympiad;
            }).map((opeResult) => {  
                // let student = Students.findOne({studentId : opeResult.studentId});
                // if(!student) return;
                

                if(opeResult['ope' + opeNumber]){
                    let points = parseFloat(opeResult['ope' + opeNumber].replace(/,/g, ''));
                    if(!isNaN(points)){
                        if(opeResult.level === 'Область' && thresholdLevel === 'region'){
                            let thresholdRegion = parseFloat(opeThresholds[threshold].replace(/,/g, ''));
                            if(!isNaN(thresholdRegion)) {
                                nsRegion++;
                                if(+points >= +thresholdRegion) msRegion++;
                            }
                        } else if(opeResult.level === 'Республика' && thresholdLevel === 'republic') {
                            let thresholdRepublic = parseFloat(opeThresholds[threshold].replace(/,/g, ''));
                            if(!isNaN(thresholdRepublic)) {
                                nsRepublic++;
                                if(+points >= +thresholdRepublic)
                                    msRepublic++;
                            }
                            let thresholdRegion = parseFloat(opeThresholds[threshold].replace(/,/g, ''));
                            if(!isNaN(thresholdRegion)) {
                                nsRegion++;
                                if(+points >= +thresholdRegion) msRegion++;
                            }
                        }
                    }
                }

        
            })
        })

        if(nsRegion) {
            let percentages;
            let quantities;
            let totals;
            if(nsRegion) {
                percentages = (msRegion/nsRegion).toFixed(3);
                quantities = msRegion;
                totals = nsRegion;

                orderQuantitiesRegionAll.push({[schoolId]: quantities});
                orderPercentagesRegionAll.push({[schoolId]: percentages});
                orderTotalsRegionAll.push({[schoolId]: totals});
                
            }
            
            //console.log('schoolId: ' + schoolId + ': ' + msRegion + ' ' + nsRegion)  

            Session.set('regionPercentagesAll_' + schoolId, percentages);
            Session.set('regionQuantitiesAll_' + schoolId, quantities);
            Session.set('regionTotalsAll_' + schoolId, totals);
        }

        if(nsRepublic) {
            let averages;
            let quantities;
            let totals;
            
            if(nsRepublic) {
                averages = (msRepublic/nsRepublic).toFixed(3);
                quantities = msRepublic;
                totals = nsRepublic;

                orderQuantitiesRepublicAll.push({[schoolId]: quantities});
                orderPercentagesRepublicAll.push({[schoolId]: averages});
                orderTotalsRepublicAll.push({[schoolId]: totals});
            }
            
            Session.set('republicPercentagesAll_' + schoolId, averages);
            Session.set('republicQuantitiesAll_' + schoolId, quantities);
            Session.set('republicTotalsAll_' + schoolId, totals);
        }
    })
}

Template.adminOpeRatings.events({
    'change #subjectId'(event,template) {
        event.preventDefault();
        template.subjectId.set(event.target.value);
        if(template.subjectId.get() === 'all') {
            estimateGeneral(template);
        } else {
            estimate(template);
        }
    },
    'change #grade'(event,template) {
        event.preventDefault();
        template.grade.set(event.target.value);
        if(template.subjectId.get() === 'all') {
            estimateGeneral(template);
        } else {
            estimate(template);
        }
    },
    'change #ope_number'(event, template) {
        event.preventDefault();
        template.ope_number.set(event.target.value);
        if(template.subjectId.get() === 'all') {
            estimateGeneral(template);
        } else {
            estimate(template);
        }
    },
    'click #total_number'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderTotalNumberAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderTotalNumberAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderTotalNumberAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderTotalNumber.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderTotalNumber.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderTotalNumber.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },
    'click #ope_region-m'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderQuantitiesRegionAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderQuantitiesRegionAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderQuantitiesRegionAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderQuantitiesRegion.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderQuantitiesRegion.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderQuantitiesRegion.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },
    'click #ope_region-n'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderTotalsRegionAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderTotalsRegionAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderTotalsRegionAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderTotalsRegion.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderTotalsRegion.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderTotalsRegion.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },
    'click #ope_region-x'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderStatedRegionAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderStatedRegionAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderStatedRegionAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderStatedRegion.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderStatedRegion.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderStatedRegion.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },

    'click #ope_region-p'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderPercentagesRegionAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderPercentagesRegionAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderPercentagesRegionAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderPercentagesRegion.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderPercentagesRegion.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderPercentagesRegion.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },

    'click #ope_republic-m'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderQuantitiesRepublicAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderQuantitiesRepublicAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderQuantitiesRepublicAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderQuantitiesRepublic.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderQuantitiesRepublic.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderQuantitiesRepublic.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },
    'click #ope_republic-n'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderTotalsRepublicAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderTotalsRepublicAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderTotalsRepublicAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderTotalsRepublic.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderTotalsRepublic.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderTotalsRepublic.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },
    'click #ope_republic-x'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderStatedRepublicAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderStatedRepublicAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderStatedRepublicAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderStatedRepublic.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderStatedRepublic.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderStatedRepublic.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },

    'click #ope_republic-p'(event, template) {
        if(template.subjectId.get() === 'all') {
            if(orderPercentagesRepublicAll.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderPercentagesRepublicAll.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderPercentagesRepublicAll.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        } else {
            if(orderPercentagesRepublic.length !== 0) {
                let oldOrder = Session.get('order');
                let order = []
                orderPercentagesRepublic.sort(function(a, b) {
                    return Object.values(b) - Object.values(a);
                })
                orderPercentagesRepublic.map(o => {
                    order.push(Object.keys(o)[0]);
                })
                if(JSON.stringify(order) === JSON.stringify(oldOrder)) {
                    Session.set('order', order.reverse());
                } else {
                    Session.set('order', order);
                }
            }
        }
    },

    'click #download'(event, template) {
        let ope_number = template.ope_number.get();
        
        let schools = Schools.find({}).fetch();

        let data = [];
        
        let headers = ['Мектеп аты', 'Жалпы қатысты', 'Дәлелдеді (Область)', 'Жүлделі катысты (Область)', 'Жүлделі мақсат (Область)', 'Дәлелдеу пайызы (Область)', 
            'Дәлелдеді (Республика)', 'Жүлделі катысты (Республика)', 'Жүлделі мақсат (Республика)', 'Дәлелдеу пайызы (Республика)'];
        data.push(headers);

        schools.map(school => {
            let isAll = true;
            let percentages = Session.get('regionPercentagesAll_' + school.schoolId);
            if(!percentages) percentages = Session.get('regionPercentages_' + school.schoolId);
            if(percentages) isAll = true; 

            let quantities = Session.get('regionQuantities_' + school.schoolId);
            if(!quantities) quantities = Session.get('regionQuantitiesAll_' + school.schoolId);

            let totals = Session.get('regionTotals_' + school.schoolId);
            if(!totals) totals = Session.get('regionTotalsAll_' + school.schoolId);

            let stated;
            if(isAll) stated = Session.get('regionStatedAll_' + school.schoolId);
            else stated = Session.get('regionStated_' + school.schoolId);

            let totalNumber = Session.get('totalNumber_' + school.schoolId);
            if(!totalNumber) totalNumber = Session.get('totalNumberAll_' + school.schoolId);

            let dataRow = [school.shortName];

            if(totalNumber) dataRow.push(totalNumber);
            else dataRow.push('');

            if(quantities) dataRow.push(quantities);
            else if(totals) dataRow.push(0);
            else dataRow.push('');

            if(totals) dataRow.push(totals);
            else dataRow.push(''); 

            if(stated) dataRow.push(stated);
            else dataRow.push('')

            if(percentages) dataRow.push(((+percentages)*100).toFixed(0) + '%');
            else dataRow.push('');
    
            percentages = Session.get('republicPercentages_' + school.schoolId);
            if(!percentages) percentages = Session.get('republicPercentagesAll_' + school.schoolId);

            quantities = Session.get('republicQuantities_' + school.schoolId);
            if(!quantities) quantities = Session.get('republicQuantitiesAll_' + school.schoolId);

            totals = Session.get('republicTotals_' + school.schoolId);
            if(!totals) totals = Session.get('republicTotalsAll_' + school.schoolId);

            if(isAll) stated = Session.get('republicStatedAll_' + school.schoolId);
            else stated = Session.get('republicStated_' + school.schoolId);
            
            if(quantities) dataRow.push(quantities);
            else if(totals) dataRow.push(0);
            else dataRow.push('');

            if(totals) dataRow.push(totals);
            else dataRow.push(''); 

            if(stated) dataRow.push(stated);
            else dataRow.push('')

            if(percentages) dataRow.push(((+percentages)*100).toFixed(0) + '%');
            else dataRow.push('');

            data.push(dataRow);
        })

        Meteor.call('download', data, (err, wb) => {
            if (err) throw err;

            let sName = academicYear.get() + '_OPE_' + ope_number + '.xlsx';
            XLSX.writeFile(wb, sName);
        });
    }
})

Template.adminOpeRatings.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
