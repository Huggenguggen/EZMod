//returns an array of strings with toast message
//should return an empty array if all good
export function moduleCheck(mods) {

  //this will query deep info about the module
  async function queryMod(query) {
    let api_req = "https://api.nusmods.com/v2/2021-2022/modules/";
    api_req += query + ".json";
    const response = await fetch(api_req);
    const data = await response.json();
    const item = await data;
    //console.log(item);
    return item;
  }


  //check each mod for prereq
  for (let i = 0; i < mods.length; i++) {
    let modOI = mods[i];
    let modTitleOI = modOI.description;
    queryMod(modTitleOI).then((token) => 
    {
      console.log(token);
      if (token.hasOwnProperty('prereqTree')) {
        console.log('modtitle', modTitleOI);
        console.log('displayPreqresTree', token.prereqTree);
        
      }
    });
  }
  return [];
}



