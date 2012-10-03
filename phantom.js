/*
                                                  
/\\\\\\\  /\\     /\\      /\       /\\\     /\\/\\\ /\\\\\\    /\\\\     /\\       /\\
\\    /\\/\\     /\\     /\ \\     /\ /\\   /\\     /\\      /\\    /\\  /\ /\\   /\\\
/\\    /\\/\\     /\\    /\  /\\    /\\ /\\  /\\     /\\    /\\        /\\/\\ /\\ / /\\
/\\\\\\\  /\\\\\\ /\\   /\\   /\\   /\\  /\\ /\\     /\\    /\\        /\\/\\  /\\  /\\
/\\       /\\     /\\  /\\\\\\ /\\  /\\   /\ /\\     /\\    /\\        /\\/\\   /\  /\\
/\\       /\\     /\\ /\\       /\\ /\\    /\ \\     /\\      /\\     /\\ /\\       /\\
/\\       /\\     /\\/\\         /\\/\\      /\\     /\\        /\\\\     /\\       /\\


phantom by adrien revel for ABRèGe v0.0.1
last update: 120929

http://www.abrege.net/

This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/

*/

// First we define a dialog component
var components = {
	textInput: { type: 'string', label: 'panaText: ' }
};

// Now we bring up the dialog
var values = Dialog.prompt('Enter your text', components);

if (values) {

// Place text
var panaText = new PointText(new Point(0, 0))

// Choose font
panaText.characterStyle.font = app.fonts['Decima Mono']['Bold']
panaText.characterStyle.fontSize = 72;

// Assign a string
panaText.content = values.textInput

// Count characters
var nbText = panaText.range.length
console.log(nbText)


// sets the capitalization to all caps
panaText.characterStyle.capitalization = 'all';

// Create the outlines
panaTextVector = panaText.createOutline()

// Delete text object
panaText.remove()

// Create the phantom
panaTextPhantom = panaTextVector.clone()
panaTextPhantom.fillColor = new CMYKColor(0, 0, 0, 0);
panaTextPhantom.strokeColor = new CMYKColor(0, 0, 0, 1);
panaTextPhantom.strokeWidth = 1;

// Move the phantom back
panaTextPhantom.moveBelow(panaTextVector);

// Cut the phantom

}

