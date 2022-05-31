import { SCF } from "./scripts/config.js";
/**
 * Project Outline:
 *    Declare class and create methods specific to this module within
 *  x Hook into the dev mode module
 *    Inject html into spell item sheets so that user can declare which class it's from
 *    Capture that data into a flag on the spell item
 *    Add a dropdown filter to the player actor sheet next to the other filters
 *    Probably need to capture that as a flag as well
 *    Make the filter actually filter the spell list using the same method as the other filters.
 */


class spellClassFilter {
  static ID = 'spell-class-filter';
  static CONFIG = SCF;
  // static PATH = 'modules/spell-class-filter-for-5e'

  static FLAGS = {
    
  }
  
  static TEMPLATES = {
    TODOLIST: `modules/${this.ID}/templates/todo-list.hbs`
  }

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
  spellClassFilter.log(true, spellClassFilter.CONFIG)
});

Hooks.on("renderItemSheet5e", async (app, html, data) => {
  // spellClassFilter.log(true, app);
  // spellClassFilter.log(true, html);
  // spellClassFilter.log(true, data);

  const item = app.object;
  const type = item.data.type;
  const spellDetailsDiv = html.find(".tab.details");
  const firstChild = spellDetailsDiv.children("h3:first");

  if( type == "spell" ) {
    const spellClassForm = await renderTemplate("modules/spell-class-filter-for-5e/templates/spellClassSelector.hbs", {
      SCF: spellClassFilter.CONFIG,
      item,
      flags: item.data.flags
    });

    spellClassFilter.log(true, spellClassForm)
    spellClassFilter.log(true, spellDetailsDiv)
    spellClassFilter.log(true, firstChild)
    
    firstChild.after(spellClassForm)
  }

});



Hooks.on("ready", function() {
  // console.log("This code runs once core initialization is ready and game data is available.");


});