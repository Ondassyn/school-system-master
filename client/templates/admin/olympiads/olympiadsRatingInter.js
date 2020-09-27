import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './olympiadsRatingInter.html';

Template.olympiadsRatingInter.onCreated(function() {
    let template = this
    Session.setDefault('Sort',{jautTotalOlymp:-1});
    template.subject = new ReactiveVar("all")
    template.grade = new ReactiveVar("all")
    template.schoolId_select = new ReactiveVar("")
    
    template.subscribe('schools')
    template.subscribe('subjects')
    template.subscribe('olympiads')
    template.autorun(()=>{
        template.subscribe("olympiadRatings",academicYear.get())
    })
})

Template.olympiadsRatingInter.helpers({
    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    olympiads(){
        return Olympiads.find()
    },
    results() {
        let subject = new RegExp(Template.instance().subject.get())
        let grade = new RegExp(Template.instance().grade.get())
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        
        return OlympiadRatings.find({
            schoolId: schoolId_select,
            subjectId: subject,
            grade: grade
        },{sort: Session.get('Sort')}
        )
    },
})

Template.olympiadsRatingInter.events({
    "change #select"(event,template) {
        template.subject.set(template.find('[name=subject]').value)
        template.grade.set(template.find('[name=grade]').value)
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)

        let subject = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
        let schoolId_select = FlowRouter.getParam('_id')
    },
    "click #calculateOlympiad" (event,template) {
        event.preventDefault()
        if (confirm('Олимпиада нәтижелерін санағыңыз келеді ма?')) {

            SUIBlock.block('Саналуда...');
            Meteor.call("calculateOlympiadRating", academicYear.get(), function (err) {
                if (err) {
                    alert(err.reason)
                    SUIBlock.unblock();
                } else {
                    SUIBlock.unblock();
                    alert("Санау аяқталды")
                }
            })
        }
    },
    'click #sortJautGold'(event,template) {
        Session.set('Sort',{jautGoldOlymp:-1});
    },
    'click #sortJautSilver'(event,template) {
        Session.set('Sort',{jautSilverOlymp:-1});
    },
    'click #sortJautBronze'(event,template) {
        Session.set('Sort',{jautBronzeOlymp:-1});
    },
    'click #sortJautTotal'(event,template) {
        Session.set('Sort',{jautTotalOlymp:-1});
    },
    'click #sortMendGold'(event,template) {
        Session.set('Sort',{mendGoldOlymp:-1});
    },
    'click #sortMendSilver'(event,template) {
        Session.set('Sort',{mendSilverOlymp:-1});
    },
    'click #sortMendBronze'(event,template) {
        Session.set('Sort',{mendBronzeOlymp:-1});
    },
    'click #sortMendTotal'(event,template) {
        Session.set('Sort',{mendTotalOlymp:-1});
    },
    'click #sortAphoGold'(event,template) {
        Session.set('Sort',{aphoGoldOlymp:-1});
    },
    'click #sortAphoSilver'(event,template) {
        Session.set('Sort',{aphoSilverOlymp:-1});
    },
    'click #sortAphoBronze'(event,template) {
        Session.set('Sort',{aphoBronzeOlymp:-1});
    },
    'click #sortAphoTotal'(event,template) {
        Session.set('Sort',{aphoTotalOlymp:-1});
    },
    'click #sortAllRusGold'(event,template) {
        Session.set('Sort',{allrusGoldOlymp:-1});
    },
    'click #sortAllRusSilver'(event,template) {
        Session.set('Sort',{allrusSilverOlymp:-1});
    },
    'click #sortAllRusBronze'(event,template) {
        Session.set('Sort',{allrusBronzeOlymp:-1});
    },
    'click #sortAllRusTotal'(event,template) {
        Session.set('Sort',{allrusTotalOlymp:-1});
    },
    'click #sortEuGirlGold'(event,template) {
        Session.set('Sort',{eugGoldOlymp:-1});
    },
    'click #sortEuGirlSilver'(event,template) {
        Session.set('Sort',{eugSilverOlymp:-1});
    },
    'click #sortEuGirlBronze'(event,template) {
        Session.set('Sort',{eugBronzeOlymp:-1});
    },
    'click #sortEuGirlTotal'(event,template) {
        Session.set('Sort',{eugTotalOlymp:-1});
    },
    'click #sortWcGold'(event,template) {
        Session.set('Sort',{wcGoldOlymp:-1});
    },
    'click #sortWcSilver'(event,template) {
        Session.set('Sort',{wcSilverOlymp:-1});
    },
    'click #sortWcBronze'(event,template) {
        Session.set('Sort',{wcBronzeOlymp:-1});
    },
    'click #sortWcTotal'(event,template) {
        Session.set('Sort',{wcTotalOlymp:-1});
    },
    'click #sortBmoGold'(event,template) {
        Session.set('Sort',{bmoGoldOlymp:-1});
    },
    'click #sortBmoSilver'(event,template) {
        Session.set('Sort',{bmoSilverOlymp:-1});
    },
    'click #sortBmoBronze'(event,template) {
        Session.set('Sort',{bmoBronzeOlymp:-1});
    },
    'click #sortBmoTotal'(event,template) {
        Session.set('Sort',{bmoTotalOlymp:-1});
    },
    'click #sortJbmoGold'(event,template) {
        Session.set('Sort',{jbmoGoldOlymp:-1});
    },
    'click #sortJbmoSilver'(event,template) {
        Session.set('Sort',{jbmoSilverOlymp:-1});
    },
    'click #sortJbmoBronze'(event,template) {
        Session.set('Sort',{jbmoBronzeOlymp:-1});
    },
    'click #sortJbmoTotal'(event,template) {
        Session.set('Sort',{jbmoTotalOlymp:-1});
    },
    'click #sortTuyGold'(event,template) {
        Session.set('Sort',{tuyGoldOlymp:-1});
    },
    'click #sortTuySilver'(event,template) {
        Session.set('Sort',{tuySilverOlymp:-1});
    },
    'click #sortTuyBronze'(event,template) {
        Session.set('Sort',{tuyBronzeOlymp:-1});
    },
    'click #sortTuyTotal'(event,template) {
        Session.set('Sort',{tuyTotalOlymp:-1});
    },
    'click #sortImoGold'(event,template) {
        Session.set('Sort',{imoGoldOlymp:-1});
    },
    'click #sortImoSilver'(event,template) {
        Session.set('Sort',{imoSilverOlymp:-1});
    },
    'click #sortImoBronze'(event,template) {
        Session.set('Sort',{imoBronzeOlymp:-1});
    },
    'click #sortImoTotal'(event,template) {
        Session.set('Sort',{imoTotalOlymp:-1});
    },
    'click #sortIranGeomGold'(event,template) {
        Session.set('Sort',{iranGoldOlymp:-1});
    },
    'click #sortIranGeomSilver'(event,template) {
        Session.set('Sort',{iranSilverOlymp:-1});
    },
    'click #sortIranGeomBronze'(event,template) {
        Session.set('Sort',{iranBronzeOlymp:-1});
    },
    'click #sortIranGeomTotal'(event,template) {
        Session.set('Sort',{iranTotalOlymp:-1});
    },
    'click #sortApmoGold'(event,template) {
        Session.set('Sort',{apmoGoldOlymp:-1});
    },
    'click #sortApmoSilver'(event,template) {
        Session.set('Sort',{apmoSilverOlymp:-1});
    },
    'click #sortApmoBronze'(event,template) {
        Session.set('Sort',{apmoBronzeOlymp:-1});
    },
    'click #sortApmoTotal'(event,template) {
        Session.set('Sort',{apmoTotalOlymp:-1});
    },
    'click #sortSwGold'(event,template) {
        Session.set('Sort',{swGoldOlymp:-1});
    },
    'click #sortSwSilver'(event,template) {
        Session.set('Sort',{swSilverOlymp:-1});
    },
    'click #sortSwBronze'(event,template) {
        Session.set('Sort',{swBronzeOlymp:-1});
    },
    'click #sortSwTotal'(event,template) {
        Session.set('Sort',{swTotalOlymp:-1});
    },
    'click #sortMegaGold'(event,template) {
        Session.set('Sort',{megaGoldOlymp:-1});
    },
    'click #sortMegaSilver'(event,template) {
        Session.set('Sort',{megaSilverOlymp:-1});
    },
    'click #sortMegaBronze'(event,template) {
        Session.set('Sort',{megaBronzeOlymp:-1});
    },
    'click #sortMegaTotal'(event,template) {
        Session.set('Sort',{megaTotalOlymp:-1});
    },
    'click #sortChemGold'(event,template) {
        Session.set('Sort',{chemGoldOlymp:-1});
    },
    'click #sortChemSilver'(event,template) {
        Session.set('Sort',{chemSilverOlymp:-1});
    },
    'click #sortChemBronze'(event,template) {
        Session.set('Sort',{chemBronzeOlymp:-1});
    },
    'click #sortChemTotal'(event,template) {
        Session.set('Sort',{chemTotalOlymp:-1});
    },
    'click #sortApioGold'(event,template) {
        Session.set('Sort',{apioGoldOlymp:-1});
    },
    'click #sortApioSilver'(event,template) {
        Session.set('Sort',{apioSilverOlymp:-1});
    },
    'click #sortApioBronze'(event,template) {
        Session.set('Sort',{apioBronzeOlymp:-1});
    },
    'click #sortApioTotal'(event,template) {
        Session.set('Sort',{apioTotalOlymp:-1});
    },
    'click #sortEuInfGold'(event,template) {
        Session.set('Sort',{euinfGoldOlymp:-1});
    },
    'click #sortEuInfSilver'(event,template) {
        Session.set('Sort',{euinfSilverOlymp:-1});
    },
    'click #sortEuInfBronze'(event,template) {
        Session.set('Sort',{euinfBronzeOlymp:-1});
    },
    'click #sortEuInfTotal'(event,template) {
        Session.set('Sort',{euinfTotalOlymp:-1});
    },
    'click #sortIjsoGold'(event,template) {
        Session.set('Sort',{ijsoGoldOlymp:-1});
    },
    'click #sortIjsoSilver'(event,template) {
        Session.set('Sort',{ijsoSilverOlymp:-1});
    },
    'click #sortIjsoBronze'(event,template) {
        Session.set('Sort',{ijsoBronzeOlymp:-1});
    },
    'click #sortIjsoTotal'(event,template) {
        Session.set('Sort',{ijsoTotalOlymp:-1});
    },
})

