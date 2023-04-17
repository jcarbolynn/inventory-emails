var SpreadSheetID = "1ZfSkVgSC8NrhLRy-F24JHcnvCvLn3YRlocpqI8KQNpI"
var SheetNames = ["Summary"]
// var SheetNames = ["Media/Serum Summary", "NRU Summary", "MN Summary", "pH/Osmo Summary", "Flow Summary", "LNT-02 Summary"]
var EmailSheet = "emails"

function sendMail(e){
  var ss = SpreadsheetApp.openById(SpreadSheetID);
  //email stuff
  var emailInfo = ss.getSheetByName(EmailSheet);
  var email_json = getEmails(emailInfo);


  for (var x=0; x<SheetNames.length; x++){
    var sheet = ss.getSheetByName(SheetNames[x]);
    var inventory = getInventory(sheet);
    to_order = toOrder(inventory);

    // // this part sends emails
    // for (var i=0; i<to_order.length; i++){
    //   for (var j=0; j<email_json.length; j++){
    //     item_to_order = to_order[i]['item']
    //     num_left = to_order[i]['total']
    //     MailApp.sendEmail({to: email_json[j].email, subject: item_to_order, htmlBody: num_left + " bottles of " + item_to_order + " left.", noReply:true})
    //   }
    // }
    console.log(to_order);

  }
}

// https://blog.devgenius.io/send-mass-emails-using-google-apps-script-from-a-google-spreadsheet-fc2f79c9febd
function getInventory(media){
  var jo = {};
  var dataArray = [];
  // collecting data from 2nd Row , 1st column to last row and last    // column sheet.getLastRow()-1
  var rows = media.getRange(2,1,media.getLastRow()-1, media.getLastColumn()).getValues();
  for(var i = 0, l= rows.length; i<l ; i++){
    //skip empty values: check if item name (rows[i][0]) is blank, then dont add to dataArray
    if (rows[i][0] !== ''){
      var dataRow = rows[i];
      var record = {};
      record['item'] = dataRow[0];
      record['total'] = dataRow[1];
      record['order now'] = dataRow[2];
      dataArray.push(record);
    }
  }
  jo = dataArray;
  return jo;
}

function toOrder(all_inventory){
  var to_order_array = []
  // adds items to order to new array ? not sure what this data structure is
  for (var i=0; i<all_inventory.length; i++){
    //console.log(!isNaN(all_inventory[i]['total']) && !isNaN(all_inventory[i]['order now']));
    // checking that inventory amounts are numbers
    if (!isNaN(all_inventory[i]['total']) && !isNaN(all_inventory[i]['order now'])){
      if (all_inventory[i]['total'] <= all_inventory[i]['order now']){
        to_order_array.push(all_inventory[i]);
        // console.log(typeof(testing_array));
      }
    }
  }
  return to_order_array;
}

function getEmails(email_sheet){
  var jo = {};
  var dataArray = [];
  // collecting data from 2nd Row , 1st column to last row and last    // column sheet.getLastRow()-1
  var rows = email_sheet.getRange(2,1,email_sheet.getLastRow()-1, email_sheet.getLastColumn()).getValues();
  for(var i = 0, l= rows.length; i<l ; i++){
    var dataRow = rows[i];
    var record = {};
    record['email'] = dataRow[0];
    dataArray.push(record);
  }
  jo = dataArray;
  return jo;
}




  
