const XLSX = require('xlsx');

Meteor.methods({
    download(data){
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = {SheetNames: ["Sheet1"], Sheets:{Sheet1:ws}};

      return wb;
    }
})
