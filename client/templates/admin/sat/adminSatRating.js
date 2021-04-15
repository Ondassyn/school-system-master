import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import "./adminSatRating.html";
import { Meteor } from "meteor/meteor";
import XLSX from "xlsx";

Template.adminSatRating.onCreated(function () {
  let template = this;
  Session.setDefault("Sort", { totalAverage: -1 });
  document.title = "SAT-IELTS рейтинг";
  template.subscribe("schools");

  template.grade = new ReactiveVar("all");
  template.order = new ReactiveVar([]);

  template.autorun(() => {
    template.subscribe("adminSatAllResults", template.grade.get());
    template.subscribe("adminIeltsAllResults", template.grade.get());
  });
});

let out = [];

Template.adminSatRating.helpers({
  results() {
    let grade = Template.instance().grade.get();

    let schools = Schools.find().fetch();
    let unregisteredSchools = [];

    let returnList = [];

    let order = Template.instance().order.get();
    if (order.length !== 0) {
      let ordered = _.sortBy(schools, function (o) {
        let index = _.indexOf(order, o.schoolId);
        if (index !== -1) return index;
      });
      schools = ordered;
    }

    schools.map((school) => {
      let satResults = SatResults.find({ schoolId: school.schoolId }).fetch();
      let ieltsResults = IeltsResults.find({
        schoolId: school.schoolId,
      }).fetch();

      let returnObject = {
        school: school.shortName,
      };

      let latestDate;

      let outArray = [];

      let sat1_n = 0;
      let ielts_n = 0;

      let hasAnyResults = false;
      if (satResults.length !== 0) {
        hasAnyResults = true;

        let sat1_math_total = 0;
        let sat1_math_n = 0;
        let sat1_english_total = 0;
        let sat1_english_n = 0;
        let sat1_total_total = 0;
        let sat1_total_n = 0;

        satResults.map((result) => {
          if (result.sat1_math) {
            sat1_math_total += result.sat1_math;
            sat1_math_n++;
          }
          if (result.sat1_english) {
            sat1_english_total += result.sat1_english;
            sat1_english_n++;
          }
          if (result.sat1_total) {
            sat1_total_total += result.sat1_total;
            sat1_total_n++;
          }
          sat1_n++;

          if (result.updatedAt) {
            if (latestDate) {
              if (result.updatedAt > latestDate) latestDate = result.updatedAt;
            } else {
              latestDate = result.updatedAt;
            }
          } else {
            if (latestDate) {
              if (result.createdAt > latestDate) latestDate = result.createdAt;
            } else {
              latestDate = result.createdAt;
            }
          }
        });

        if (sat1_math_n) {
          returnObject.sat1_math = (sat1_math_total / sat1_math_n).toFixed(2);
          outArray[1] = returnObject.sat1_math;
        }
        if (sat1_english_n) {
          returnObject.sat1_english = (
            sat1_english_total / sat1_english_n
          ).toFixed(2);
          outArray[2] = returnObject.sat1_english;
        }
        if (sat1_total_n) {
          returnObject.sat1_total = (sat1_total_total / sat1_total_n).toFixed(
            2
          );
          outArray[3] = returnObject.sat1_total;
        }
        returnObject.sat1_n = sat1_n;
        outArray[0] = sat1_n;
      }

      if (ieltsResults.length !== 0) {
        hasAnyResults = true;

        let listening_total = 0;
        let listening_n = 0;
        let reading_total = 0;
        let reading_n = 0;
        let writing_total = 0;
        let writing_n = 0;
        let speaking_total = 0;
        let speaking_n = 0;
        let total_total = 0;
        let total_n = 0;

        ieltsResults.map((result) => {
          if (result.listening) {
            listening_total += result.listening;
            listening_n++;
          }
          if (result.reading) {
            reading_total += result.reading;
            reading_n++;
          }
          if (result.writing) {
            writing_total += result.writing;
            writing_n++;
          }
          if (result.speaking) {
            speaking_total += result.speaking;
            speaking_n++;
          }
          if (result.total) {
            total_total += result.total;
            total_n++;
          }

          ielts_n++;

          if (result.updatedAt) {
            if (latestDate) {
              if (result.updatedAt > latestDate) latestDate = result.updatedAt;
            } else {
              latestDate = result.updatedAt;
            }
          } else {
            if (latestDate) {
              if (result.createdAt > latestDate) latestDate = result.createdAt;
            } else {
              latestDate = result.createdAt;
            }
          }
        });

        if (listening_n) {
          returnObject.listening = (listening_total / listening_n).toFixed(2);
          outArray[5] = returnObject.listening;
        }
        if (reading_n) {
          returnObject.reading = (reading_total / reading_n).toFixed(2);
          outArray[6] = returnObject.reading;
        }
        if (writing_n) {
          returnObject.writing = (writing_total / writing_n).toFixed(2);
          outArray[7] = returnObject.writing;
        }
        if (speaking_n) {
          returnObject.speaking = (speaking_total / speaking_n).toFixed(2);
          outArray[8] = returnObject.speaking;
        }
        if (total_n) {
          returnObject.ielts_total = (total_total / total_n).toFixed(2);
          outArray[9] = returnObject.ielts_total;
        }
        returnObject.ielts_n = ielts_n;
        outArray[4] = ielts_n;
      }

      if (hasAnyResults) {
        if (latestDate) {
          returnObject.updatedAt =
            latestDate.getUTCDate() +
            "/" +
            (latestDate.getUTCMonth() + 1) +
            "/" +
            latestDate.getUTCFullYear();
          outArray[10] = returnObject.updatedAt;
        }
        returnList.push(returnObject);
        let index = out.findIndex((o) => o.schoolId === school.schoolId);
        if (index === -1) out.push({ schoolId: school.schoolId, outArray });
        else out[index] = { schoolId: school.schoolId, outArray };
      } else unregisteredSchools.push(school);
    });

    Session.set("unregisteredSchools", unregisteredSchools);
    return returnList;
  },
  unregisteredSchools() {
    return Session.get("unregisteredSchools");
  },
});

let dict = {
  sat1_n: 0,
  sat1_math: 1,
  sat1_english: 2,
  sat1_total: 3,
  ielts_n: 4,
  listening: 5,
  reading: 6,
  writing: 7,
  speaking: 8,
  ielts_total: 9,
  updated_n: 10,
};

Template.adminSatRating.events({
  "change #grade"(event, template) {
    template.grade.set(event.target.value);
  },
  "click .subheader"(event, template) {
    let name = event.target.getAttribute("name");
    let order;

    let relevantIndex = dict[name];

    order = [];
    out
      .filter(
        (o) => o.outArray[relevantIndex] || o.outArray[relevantIndex] === 0
      )
      .sort((a, b) => b.outArray[relevantIndex] - a.outArray[relevantIndex])
      .map((o) => order.push(o.schoolId));

    let oldOrder = template.order.get();
    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #export"(event, template) {
    document.getElementById("out").innerHTML;
    var data = [];

    var headers = [
      "Мектеп ID",
      "Мектеп аты",
      "Жалпы саны (SAT)",
      "SAT Math",
      "SAT English",
      "SAT Total",
      "Жалпы саны (IELTS)",
      "IELTS Listening",
      "IELTS Reading",
      "IELTS Writing",
      "IELTS Speaking",
      "IELTS Total",
    ];

    data.push(headers);
    let lines = out;

    lines.map((line) => {
      let schoolId = line.schoolId;
      let schoolName = Schools.findOne({ schoolId }).shortName;
      let outArray = line.outArray;
      let row = [schoolId, schoolName, ...outArray];
      data.push(row);
    });

    if (data.length == 1) {
      alert("There is no data to export");
    } else {
      Meteor.call("download", data, (err, wb) => {
        if (err) throw err;

        let sName = "SAT-IELTS Rating.xlsx";
        XLSX.writeFile(wb, sName);
      });
    }
  },

  "click #sortTotalNumber"(event, template) {
    sortTotalNumber *= -1;
    Session.set("Sort", { totalNumber: sortTotalNumber });
  },
  "click #sortTotalAverage"(event, template) {
    sortTotalAverage *= -1;
    Session.set("Sort", { totalAverage: sortTotalAverage });
  },
  "click #sortListeningAverage"(event, template) {
    sortListeningAverage *= -1;
    Session.set("Sort", { listeningAverage: sortListeningAverage });
  },
  "click #sortReadingAverage"(event, template) {
    sortReadingAverage *= -1;
    Session.set("Sort", { readingAverage: sortReadingAverage });
  },
  "click #sortWritingAverage"(event, template) {
    sortWritingAverage *= -1;
    Session.set("Sort", { writingAverage: sortWritingAverage });
  },
  "click #sortSpeakingAverage"(event, template) {
    sortSpeakingAverage *= -1;
    Session.set("Sort", { speakingAverage: sortSpeakingAverage });
  },
});
