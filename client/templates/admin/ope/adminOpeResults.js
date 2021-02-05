import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminOpeResults.html';

Template.adminOpeResults.onCreated(function() {
    let template = this
    document.title = "OPE Нәтижелері";
    template.subjectId = new ReactiveVar('all')
    template.grade = new ReactiveVar('all')
    template.schoolId = new ReactiveVar('all');
    template.threshold_region = new ReactiveVar();
    template.threshold_republic = new ReactiveVar();
    Session.set('itemsLimit', 20);

    template.subscribe('adminOpeSchools');
    template.subscribe('adminOpeConfigs');

    template.autorun(() => {
        template.subscribe("adminOpePaginatedResults", academicYear.get(), template.schoolId.get(), template.subjectId.get(), template.grade.get());
    })

    
})

lastScrollTop = 0;

$(window).scroll(function(event){
    event.preventDefault()
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) { // to detect scroll event
        var scrollTop = $(this).scrollTop();

        if(scrollTop > lastScrollTop){ // detect scroll down
            Session.set("itemsLimit", Session.get("itemsLimit") + 10); // when it reaches the end, add another 10 elements
        }

        lastScrollTop = scrollTop;
    }
});

Template.adminOpeResults.helpers({
  opeList(){
    return OpeResults.find({}, {sort: {schoolId: 1, grade: 1}, collation: {locale: "en_US", numericOrdering: true} ,limit: Session.get("itemsLimit")});
  },
  opeThresholds(level) {
    let subjectId = Template.instance().subjectId.get();
    let configs = Configs.findOne({_id: "opeThresholds"});
    if(configs) return configs[level+ '_' + subjectId];
    return '';
  },
  schools(){
    return Schools.find().fetch();
  },
  level(studentId) {
    return OpeResults.findOne({studentId}).level === 'none' ? '' : OpeResults.findOne({studentId}).level;
  },
  getLevelStyle(studentId, opeNo) {
    let opeResult = OpeResults.findOne({studentId});
    
    let level = opeResult.level === 'none' ? '' : opeResult.level;
    if(!level) return 'text-align: center; white-space: nowrap';
    let threshold = level === 'Область' ? Template.adminOpeResults.__helpers.get('opeThresholds')('region') : Template.adminOpeResults.__helpers.get('opeThresholds')('republic');
    if(!threshold) return 'text-align: center; white-space: nowrap';
    
    let points = parseFloat(opeResult['ope' + opeNo]);

    if(level === 'Область') {
        if(threshold && !Number.isNaN(points)){
            if(+points >= +threshold) return 'text-align: center; white-space: nowrap; background-color: #b2fab4';
            return 'text-align: center; white-space: nowrap; background-color: #ff867c';
        }
    }
    if(level === 'Республика') {
        if(threshold && !Number.isNaN(points)){
            if(+points >= +threshold) return 'text-align: center; white-space: nowrap; background-color: #b2fab4';
            return 'text-align: center; white-space: nowrap; background-color: #ff867c';
        }
    }

    return 'text-align: center; white-space: nowrap';
 },
//   thresholdRatioRegion(no) {
//     let threshold = Template.adminOpeResults.__helpers.get('opeThresholds')('region');
//     if(!threshold) return '';
//     let list = Template.adminOpeResults.__helpers.get('opeList').call();
//     let n = 0;
//     let m = 0;

//     list.map((item) => {
//         if(item['ope' + no]) {
//             let level = item.level;
//             if(level && (level === 'Область')){
//                 n++;
                
//                 if(+item['ope' + no] >= +threshold) m++;
//             }
//         }
//     })

//     if(+n > 0) return (m/n).toFixed(2);
//   },
//   thresholdRatioRepublic(no) {
//     let threshold = Template.adminOpeResults.__helpers.get('opeThresholds')('republic');
//     if(!threshold) return '';
//     let list = Template.adminOpeResults.__helpers.get('opeList').call();
//     let n = 0;
//     let m = 0;
//     list.map((item) => {
//         if(item['ope' + no]) {
//             let level = item.level;
//             if(level && level === 'Республика'){
//                 n++;
//                 if(+item['ope' + no] >= +threshold) m++;
//             }
//         }
//     })

//     if(+n > 0) return (m/n).toFixed(2);
//   },
  getLabelStyle(opeNo, level) {
    if(level === 'region')
        if(Template.adminOpeResults.__helpers.get('thresholdRatioRegion')(opeNo))
            return "padding: 2px; background-color: #ccffff";
    if(level === 'republic')
        if(Template.adminOpeResults.__helpers.get('thresholdRatioRepublic')(opeNo))
            return "padding: 2px; background-color: #cce5ff";
 },
});

Template.adminOpeResults.events({
    'change #schoolId' (event, template) {
        event.preventDefault();
        template.schoolId.set(event.target.value);
    },
    'change #subjectId'(event,template) {
        event.preventDefault();
        template.subjectId.set(event.target.value)
    },
    'change #grade'(event,template) {
        event.preventDefault();
        template.grade.set(event.target.value)
    }
})

Template.adminOpeResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
