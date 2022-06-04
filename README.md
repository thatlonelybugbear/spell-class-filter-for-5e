# Multiclass Spellbook filter for 5e

This module adds options for players to organize their spellbook by which class the spell is for.  Useful for multiclass characters or characters with the magic initiate feat.


To get the filter to work, you will need to populate the data in each spell.

![animated demo](https://imgur.com/IUDPZbg.gif)

![example image](https://i.imgur.com/j7JpPbt.png)

----------

## Additional documentation

This module is specific to the dnd5e system and is not designed to work with other systems.

### Installing this module
At a minimum, the files and folder structure of this repository should exist in your instances "modules" folder.  Most commonly this is accomplished by using Foundry's built-in module manager.

### Configuring this module
All settings for this module are found in Foundry's settings menu under the module settings tab.

Currently all of the settings that are available are client-side settings.  This means that what you change here will not have an effect on any other computer or player.

### Using the filter
This module relies on populating data that doesn't seem to exist by default: "Is this spell a {class} spell for you?"  So the first step is going to be going through each spell on your sheet and selecting the spell's class in the itemsheet's details tab.

<div class="info">
  <p><strong>Note:</strong> Your selection does not change which ability modifier your spell uses. That is configured elsewhere in the sheet.</p>
</div>

Afterwards, if the proper setting is enabled, you will see a dropdown menu at the top of the spellbook with the rest of the filters.  Selecting an one of the classes will hide all of the spells that don't match your selection.

### Icon Replacement
Some players find it helpful to differentiate spells by class even when the list is not filtered.  To help with that this module provides the option to 'cover' the spell's icon in the spellbook with the icon of their source class.

To enable this behavior enable it in the module's settings. This setting is disabled by default.

<div class="info">
  <p><strong>Note:</strong> This feature does not change any data or other behaviors.  The spell's icon will still be what is displayed in chat and in other sections of the sheet.
  </p>
</div>