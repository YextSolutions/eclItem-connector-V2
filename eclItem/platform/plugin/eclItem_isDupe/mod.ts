export async function isDupe(idAndName) { 
  
  var myIds = idAndName.split(',')

  var id = myIds[0]

  if (myIds.length > 2) {
    var nameArray = myIds.slice(1)
    var name = nameArray.toString()
  }
  else {
    var name = myIds[1]
  }

  let counter = 0;
  let finalCounter = 0;

  let offset = 0
  let count = 1

  while (offset < count) {

    const response = await fetch('https://api.yextapis.com/v2/accounts/me/menus?v=20230324&api_key=${apiKey}&limit=50&offset=' + offset);  // need pagination but i think you know that
    const jsonResponse = await response.json();
    if(typeof jsonResponse.response.menus == 'undefined') {return;}

    else {
    for (const menu of jsonResponse.response.menus) { 
      for (const section of menu.sections) {
        for (const item of section.items) {
          if (name === item.name) {
            counter++;
          }
          if (id === item.id) {
            finalCounter = counter;
          }
        }
      }
    }

    offset = offset + 50
    count = jsonResponse.response.count
  }
  }

    if (finalCounter > 1) {
        return 'DUPE';
      } else if (finalCounter === 1) { 
        return 'UNIQUE';
      }
  }
