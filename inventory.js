var SpreadSheetID = "1ZfSkVgSC8NrhLRy-F24JHcnvCvLn3YRlocpqI8KQNpI"
var SheetName = "Media/Serum Summary"
var EmailSheet = "emails"

// https://blog.devgenius.io/send-mass-emails-using-google-apps-script-from-a-google-spreadsheet-fc2f79c9febd
function getMediaInventory(media){
  var jo = {};
  var dataArray = [];
  // collecting data from 2nd Row , 1st column to last row and last    // column sheet.getLastRow()-1
  var rows = media.getRange(2,1,media.getLastRow()-1, media.getLastColumn()).getValues();
  for(var i = 0, l= rows.length; i<l ; i++){
    var dataRow = rows[i];
    var record = {};
    record['item'] = dataRow[0];
    record['volume'] = dataRow[1];
    record['total'] = dataRow[2];
    record['order now'] = dataRow[3];
    dataArray.push(record);
  }
  jo = dataArray;
  return jo;
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

function toOrder(all_inventory){
  var to_order_array = []
  
  // put something like in getMediaInventory here so I only have the item name and number
  // this wont work because it takes from a sheet
  // i want to take from something that looks like this:
  // [ { item: 'HIHS', volume: '500 mL', total: 3, 'order now': 20 },
  //   { item: 'F-12K', volume: '500 mL', total: 27, 'order now': 1515 } ]

  // for(var i = 0, l= rows.length; i<l ; i++){
  //   var dataRow = rows[i];
  //   var record = {};
  //   record['item'] = dataRow[0];
  //   record['volume'] = dataRow[1];
  //   record['total'] = dataRow[2];
  //   record['order now'] = dataRow[3];
  //   dataArray.push(record);
  // }

  // record['item'] = all_inventory[0];
  // record['total'] = all_inventory[2];

  // adds items to order to new array ? not sure what this data structure is
  for (var i=0; i<all_inventory.length; i++){
    if (all_inventory[i]['total'] <= all_inventory[i]['order now']){
      to_order_array.push(all_inventory[i]);
      // console.log(typeof(testing_array));
    }
  }

  return to_order_array;
}

function sendMail(e){

  // inventory
  var ss = SpreadsheetApp.openById(SpreadSheetID);
  var sheet = ss.getSheetByName(SheetName);
  var inventory = getMediaInventory(sheet);

  //email stuff
  var emailInfo = ss.getSheetByName(EmailSheet);
  var email_json = getEmails(emailInfo);

  to_order = toOrder(inventory);

  // TRYING TO REFORMAT TO_ORDER SO I CAN TAKE OUT NAMES AND TOTALS
  // convert list of dictionaries to dataframe javascript
  // https://stackoverflow.com/questions/30610675/python-pandas-equivalent-in-javascript   &&& need to see how to add libraries to apps script


  // this part sends emails
  for (var i=0; i<to_order.length; i++){
    for (var j=0; j<email_json.length; j++){
      item_to_order = to_order[i]['item']
      num_left = to_order[i]['total']
      MailApp.sendEmail({to: email_json[j].email, subject: item_to_order, htmlBody: num_left + " bottles of " + item_to_order + " left.", noReply:true})
    }
  }

  // console.log(to_order);


}
  
