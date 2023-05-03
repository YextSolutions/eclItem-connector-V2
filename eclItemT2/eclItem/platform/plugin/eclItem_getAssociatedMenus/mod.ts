//This function takes in a menu item name as an argument and returns an object with duplicate items and the names of the menus that contain them
export async function getMenuArray(menuItemName) {


  // Initialize offset and API endpoint URL for initial call
  let offset = 0;
  let totalMenusCount = 1;

  // Initialize empty array to store duplicate items and associated menu names
  const menuArray = [];

  // Make initial API call to retrieve first page of results and convert response to JSON format
 

  // While there are still menus left to retrieve, continue making API calls
  while (offset < totalMenusCount) {

    let apiUrl = 'https://api.yextapis.com/v2/accounts/me/menus?v=20230324&api_key=${apiKey}&limit=50&offset=' + offset; //do we need to use +offset instead? The expression 

    let response = await fetch(apiUrl);
    let jsonResponse = await response.json();
     // Retrieve total count of menus returned by API
    totalMenusCount = jsonResponse.response.count;
    // Loop through menus returned by API response
    for (let menu of jsonResponse.response.menus) {
      for (let section of menu.sections) {
        for (let item of section.items) {
          if(item.name === menuItemName) {
            menuArray.push(menu.name)
          }
        }
      // If more than one item with matching name is found, add them to menuArray array with associated menu id
    }
  }
    // Update offset and API endpoint URL for next API call
    offset = offset + 10; 
  }
  var uniqueMenuArray = [...new Set(menuArray)]; // removes duplicates
  return uniqueMenuArray.toString()
  // Return an object with the array of duplicate items and their associated menu names
}
