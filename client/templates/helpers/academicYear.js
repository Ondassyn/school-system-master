import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./academicYear.html";

Template.academicYear.helpers({
  academicYear() {
    return academicYear.get();
  },
});

Template.academicYear.events({
  "click .prev"() {
    let years = academicYear.get().split("-");
    let prev = +years[0];
    prev--;
    academicYear.set(prev + "-" + years[0]);
    previousYear.set(prev - 1 + "-" + prev);
  },
  "click .next"() {
    previousYear.set(academicYear.get());
    let years = academicYear.get().split("-");
    let next = +years[1];
    next++;
    academicYear.set(years[1] + "-" + next);
  },
});
