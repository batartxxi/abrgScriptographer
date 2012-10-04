/*
                                                  
/\\\\\\\  /\\     /\\      /\       /\\\     /\\/\\\ /\\\\\\    /\\\\     /\\       /\\
\\    /\\/\\     /\\     /\ \\     /\ /\\   /\\     /\\      /\\    /\\  /\ /\\   /\\\
/\\    /\\/\\     /\\    /\  /\\    /\\ /\\  /\\     /\\    /\\        /\\/\\ /\\ / /\\
/\\\\\\\  /\\\\\\ /\\   /\\   /\\   /\\  /\\ /\\     /\\    /\\        /\\/\\  /\\  /\\
/\\       /\\     /\\  /\\\\\\ /\\  /\\   /\ /\\     /\\    /\\        /\\/\\   /\  /\\
/\\       /\\     /\\ /\\       /\\ /\\    /\ \\     /\\      /\\     /\\ /\\       /\\
/\\       /\\     /\\/\\         /\\/\\      /\\     /\\        /\\\\     /\\       /\\


phantom by adrien revel for ABRèGe + Kidnap Your Designer = cinq sur cinq v0.0.2
pan pan pan c'est la panacée
last update: 121004

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
panaTextPhantom1 = CompoundPath([panaTextVector.clone()]);
panaTextPhantom2 = panaTextPhantom1.clone()

// Style the phantom
panaTextPhantom1.fillColor = new CMYKColor(0, 0, 0, 0);
panaTextPhantom1.strokeColor = new CMYKColor(0, 0, 0, 1);
panaTextPhantom1.strokeWidth = 1;

panaTextPhantom2.fillColor = new CMYKColor(0, 0, 0, 0);
panaTextPhantom2.strokeColor = new CMYKColor(0, 0, 0, 1);
panaTextPhantom2.strokeWidth = 1;

// Move the phantom back
panaTextPhantom1.moveBelow(panaTextVector);
panaTextPhantom2.moveBelow(panaTextVector);


// Create the masks
var maskBotRect = new Rectangle(new Point(-10, 10), new Point(840, -25.202));
var maskBot = new Path.Rectangle(maskBotRect);
var maskTopRect = new Rectangle(new Point(-10, -25.202), new Point(840, -60.404));
var maskTop = new Path.Rectangle(maskTopRect);

// Cut the phantoms

// intersect
var phantomTop = Pathfinder.backMinusFront([panaTextPhantom1, maskBot]);
var phantomBot = Pathfinder.backMinusFront([panaTextPhantom2, maskTop]);





}

