import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './bts10Results.html';
Template.bts10Results.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    document.title = "БТС ТОП-10 оқушы"
    //template.schoolId_select = new ReactiveVar("")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsAllResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})

var points = new Set();
Set.prototype.getByIdx = function(idx){
  if(typeof idx !== 'number') throw new TypeError('Argument idx must be a Number. Got [${idx}]');

  let i = 0;
  for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ )
    if(idx === i) return curs.value;

  throw new RangeError('Index [${idx}] is out of range [0-${i-1}]');
}

Template.bts10Results.helpers({

     place(number){
      var index = 0;
      for(var i = 0; i < points.size; i++){
        if(number == points.getByIdx(i)){
          index = i;
        }
      }

      return (index+1);
    },

    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
      points.clear();
        var btsResults = BtsResults.find({},{sort:{total:-1}}).fetch();
        btsResults.forEach(res =>{
          points.add(res.total)
        });

        return BtsResults.find({},{sort:{total:-1}})
    }
})

Template.bts10Results.events({
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    }
})
