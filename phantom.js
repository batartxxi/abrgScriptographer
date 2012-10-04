/*
                                                  
/\\\\\\\  /\\     /\\      /\       /\\\     /\\/\\\ /\\\\\\    /\\\\     /\\       /\\
\\    /\\/\\     /\\     /\ \\     /\ /\\   /\\     /\\      /\\    /\\  /\ /\\   /\\\
/\\    /\\/\\     /\\    /\  /\\    /\\ /\\  /\\     /\\    /\\        /\\/\\ /\\ / /\\
/\\\\\\\  /\\\\\\ /\\   /\\   /\\   /\\  /\\ /\\     /\\    /\\        /\\/\\  /\\  /\\
/\\       /\\     /\\  /\\\\\\ /\\  /\\   /\ /\\     /\\    /\\        /\\/\\   /\  /\\
/\\       /\\     /\\ /\\       /\\ /\\    /\ \\     /\\      /\\     /\\ /\\       /\\
/\\       /\\     /\\/\\         /\\/\\      /\\     /\\        /\\\\     /\\       /\\


phantom v0.0.3 by adrien revel for ABRèGe + Kidnap Your Designer = cinq sur cinq
pan pan pan c'est la panacée
last update: 121005

http://www.abrege.net/

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.

*/

// params
var params = {
	version:'0.0.3',
	textInput:'pan pan pan',
	randomMin:0.5,
	randomMax:1,	
	scale: true,
	shear:true
}
// usefull
function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}


// define palette components
var components = {
	textInput: { type: 'string', label: 'panaText: '},
	ruler: {type: 'ruler'},
	randomMin: {type: 'number', label: 'Scale min', range: [0,1]},
	randomMax: {type: 'number', label: 'Scale max', range: [0,1]},
	ruler1: {type: 'ruler'},
	scale: {type: 'boolean', label: 'Scale'},
	shear: {type: 'boolean', label: 'Shear'},
	ruler2: {type: 'ruler'},
	run: {type: 'button', value: 'transform it!', onClick: function(){
		panaPhantom();
	}}
	
};


// Now we bring up the dialog
var palette = new Palette('phantom v'+params.version, components, params);

function panaPhantom(){
// Place text
var panaText = new PointText(new Point(0, 0))

// Choose font
panaText.characterStyle.font = app.fonts['Decima Mono']['Bold']
panaText.characterStyle.fontSize = 72;

// Assign a string
panaText.content = params.textInput

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

// Move the phantom back and front
panaTextPhantom1.moveBelow(panaTextVector);
panaTextPhantom2.moveBelow(panaTextVector);

// Create the masks
var maskBotRect = new Rectangle(new Point(-10, 10), new Point(5000, -25.202));
var maskBot = new Path.Rectangle(maskBotRect);
var maskTopRect = new Rectangle(new Point(-10, -25.202), new Point(5000, -60.404));
var maskTop = new Path.Rectangle(maskTopRect);

// Cut the phantoms

// intersect
var phantomTop = Pathfinder.backMinusFront([panaTextPhantom1, maskBot]);
var phantomBot = Pathfinder.backMinusFront([panaTextPhantom2, maskTop]);


// make the letters dance !
for(i=0;i<panaTextVector.children.length;i++){
	
	// random scale Y
	
	if (params.scale===true){
		panaTextVector.children[i].scale(1, getRandomArbitary (params.randomMin, params.randomMax))
	}
	// shear on X
	if (params.shear===true){
		panaTextVector.children[i].shear(-0.5,0)
	}
}

// Move the phantom top to front
phantomTop.moveAbove(panaTextVector);

}

