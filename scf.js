import { SCF } from "./scripts/config.js";
/**
 * MVP Outline:
 *  x Declare class and create methods specific to this module within
 *  x Hook into the dev mode module
 *  x  Inject html into spell item sheets so that user can declare which class it's from
 *  x  Capture that data into a flag on the spell item
 *  x  Add a dropdown filter to the player actor sheet next to the other filters
 *  x  Probably need to capture that as a flag as well
 *  x  Make the filter actually filter the spell list using the same method as the other filters.
 */
/**
 * Wishlist:
 *    
 */


class spellClassFilter {
  static ID = 'spell-class-filter-for-5e';
  static CONFIG = SCF;

  static log(force, ...args) {  
    const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);

    if (shouldLog) {
      console.log(this.ID, '|', ...args);
    }
  }
}


Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(spellClassFilter.ID);
});

Hooks.on("init", function() {
  // "This code runs once the Foundry VTT software begins its initialization workflow."
  spellClassFilter.log(false, spellClassFilter.CONFIG)
});

// Any time an item sheet is rendered check if it is a spell.  If so add the option to set which class the spell comes from.
Hooks.on("renderItemSheet5e", async (app, html, data) => {

  const item = app.object;
  const type = item.data.type;
  const spellDetailsDiv = html.find(".tab.details");
  const firstChild = spellDetailsDiv.children("h3:first");

  if( type == "spell" ) {
    const spellClassForm = await renderTemplate("modules/spell-class-filter-for-5e/templates/spellClassForm.hbs", {
      SCF: spellClassFilter.CONFIG,
      item,
      flags: item.data.flags
    });

    firstChild.after(spellClassForm)
  }

});

// Any time an actor sheet is rendered check if it is a player character.  If so add the option to set the filter.
// Then hide elements that do not match the filter.
Hooks.on("renderActorSheet5e", async (app, html, data) => {
  const actor = app.object;
  const type = actor.data.type;
  const flags = actor.data.flags;
  const actorSCFlags = flags[spellClassFilter.ID]
  
  if (type == "character"){
    const spellbook = html.find(".tab.spellbook")
    const filterList = spellbook.find("ul.filter-list");
    const firstItem = filterList.children("li.filter-item:first");
    const itemData = actor.data.items

    // Inject a simple dropdown menu.
    const actorClassFilter = await renderTemplate("modules/spell-class-filter-for-5e/templates/actorClassFilter.hbs", {
      SCF: spellClassFilter.CONFIG,
      actor,
      flags: flags,
      scFlags: actor.data.flags[spellClassFilter.ID]
    });
    firstItem.before(actorClassFilter)

    // Loop through some elements and get thier data
    const spellList = spellbook.find(".inventory-list")
    const items = spellList.find(".item")
    items.each(function(){
      let itemID = ($(this).data("item-id"))
      let item = (itemData.get(itemID))
      let itemFlags = item.data.flags
      let itemSCFlags = itemFlags[spellClassFilter.ID]
      
      // Hide each element that doesn't match. Or don't hide anything if nothing is selected.
      if(actorSCFlags.classFilter != ''){
        if (itemSCFlags){
          if (!(itemSCFlags.parentClass == actorSCFlags.classFilter)){
            $(this).hide()
          }
        }else{
          $(this).hide()
        }
      }
  })

  }



})

Hooks.on("ready", function() {
  // console.log("This code runs once core initialization is ready and game data is available.");


});