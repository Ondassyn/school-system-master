import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './bts100Results.html';
Template.bts100Results.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    document.title = "БТС ТОП-100 оқушы"
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsAllResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})

var points = new Set();
var oryndar = [];
var oryndar2 = [];

Set.prototype.getByIdx = function(idx){
  if(typeof idx !== 'number') throw new TypeError('Argument idx must be a Number. Got [${idx}]');

  let i = 0;
  for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ )
    if(idx === i) return curs.value;

  throw new RangeError('Index [${idx}] is out of range [0-${i-1}]');
}

Template.bts100Results.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },

    results() {
      points.clear();
      oryndar = [];
      oryndar2 = [];

      var btsResults = BtsResults.find({},{sort:{total:-1}});
      /*
      // Place calculate functions
      var btsStore = btsResults.fetch();
      btsStore.forEach(res =>{
        points.add(res.total)
      });

      for(var i = 0; i < btsStore.length; i++){

        var number = 0;
        for(var index = 0; index < points.size; index++){
          if(btsStore[i])
            if(btsStore[i].total == points.getByIdx(index)){
              number = index;
            }
        }
        oryndar.push((number+1))
      }

      var previous = 0;
      var count = 0;
      for(var j = 0; j < oryndar.length; j++){
        if(previous < oryndar[j]){
          if(oryndar[j]!=1 && oryndar[j]!=2 && oryndar[j]!=3){
              oryndar2.push(j+1);
              count++;
          }else{
            oryndar2.push(oryndar[j]);
            count++;
          }
        }else{
          oryndar2.push(oryndar2[count-1]);
          count++;
        }

        previous = oryndar[j];
      }
      */
      return btsResults;
    },
    /*
    // Place calculate functions
    place(lvalue, operator, rvalue, options){
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        var index =  {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue,
            "<": lvalue < rvalue,
            ">": lvalue > rvalue
        }[operator];
        return oryndar2[index-1];
    },
    */

})

Template.bts100Results.events({
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
    'click #calcPlaces'(event,template){
      // Place calculate functions
        // var btsResults = BtsResults.find({},{sort:{total:-1}}).fetch();
        // var i = 0;
        //
        // btsResults.forEach(res =>{
        // // console.log("studentId: "+res.studentId);
        // console.log("place: "+oryndar2[i]);
        //     Meteor.call("BtsResults.studentPlace",academicYear.get(),FlowRouter.getParam("btsNo"),res.studentId,oryndar2[i],function (err) {
        //         if (err) {
        //             alert(err.reason)
        //         }
        //     });
        //
        //     i++;
        // });
    }
})
