import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboStudentFinalResults.html';

Template.kboStudentFinalResults.onCreated(function(){
    let template = this
    template.state = new ReactiveVar('total')
    template.subjectId = new ReactiveVar('01')
    template.grade = new ReactiveVar("7")
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('kboAllResults',academicYear.get(),template.subjectId.get(),template.grade.get())
    })
})
Template.kboStudentFinalResults.helpers({
    results() {
        let kbo1 = KboResults.find({kboNo:'1'}).fetch()
        let kbo2 = KboResults.find({kboNo:'2'}).fetch()
        let kbo3 = KboResults.find({kboNo:'3'}).fetch()
        let ids = []
        _.each(kbo1,(res) => {
            ids.push(res.studentId)
        })
        _.each(kbo2,(res) => {
            ids.push(res.studentId)
        })
        _.each(kbo3,(res) => {
            ids.push(res.studentId)
        })
        ids = _.uniq(ids)
        let results = []
        _.each(ids,(id) => {
            let kbo1 = KboResults.findOne({kboNo:'1',studentId:id})
            let kbo2 = KboResults.findOne({kboNo:'2',studentId:id})
            let kbo3 = KboResults.findOne({kboNo:'3',studentId:id})

            let resultObj = {
                studentId:id
            }
            if (kbo1) {
                resultObj.schoolId = kbo1.schoolId
                resultObj.name = kbo1.studentName
                resultObj.surname = kbo1.studentSurname
                resultObj.grade = kbo1.grade
            }
            if (kbo2) {
                resultObj.schoolId = kbo2.schoolId
                resultObj.name = kbo2.studentName
                resultObj.surname = kbo2.studentSurname
                resultObj.grade = kbo2.grade
            }
            if (kbo3) {
                resultObj.schoolId = kbo3.schoolId
                resultObj.name = kbo3.studentName
                resultObj.surname = kbo3.studentSurname
                resultObj.grade = kbo3.grade
            }
            resultObj.kbo1 = kbo1 ? kbo1.result : 0
            resultObj.kbo2 = kbo2 ? kbo2.result : 0
            resultObj.kbo3 = kbo3 ? kbo3.result : 0

            // kbo weights can be adjusted if needed
            let kboWeights = {
                kbo1:0.15,
                kbo2:0.4,
                kbo3:0.45,
            }
            resultObj.total = resultObj.kbo1 * kboWeights.kbo1 + resultObj.kbo2 * kboWeights.kbo2 + resultObj.kbo3 * kboWeights.kbo3
            results.push(resultObj)
        })

        var s = Template.instance().state.get()
        results = _.sortBy(results,s).reverse()
        return results

        
    }
})

Template.kboStudentFinalResults.events({
    'change #select'(event,template) {
        template.subjectId.set(template.find('[name=subjectId]').value)
        template.grade.set(template.find('[name=grade]').value)

        let subjectId = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
    },
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    },
    'click #sortKbo1'(event,template) {
        Template.instance().state.set('kbo1')
    },
    'click #sortKbo2'(event,template) {
        Template.instance().state.set('kbo2')
    },
    'click #sortKbo3'(event,template) {
        Template.instance().state.set('kbo3')
    },
    'click #sortFinal'(event,template) {
        Template.instance().state.set('total')
    },

})
