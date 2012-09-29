/*
                                                  
#####    ##   ##### #      # #    # ###### #####  
#    #  #  #    #   #      # ##   # #      #    # 
#####  #    #   #   #      # # #  # #####  #    # 
#    # ######   #   #      # #  # # #      #####  
#    # #    #   #   #      # #   ## #      #   #  
#####  #    #   #   ###### # #    # ###### #    #

batLiner by adrien revel for ABRèGe v0.0.2
last update: 120929

http://www.abrege.net/

This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/

*/

// params
var params = {
	xOffset: 2,
	yOffset: 2,
	ko: true
}

// define palette components
var components = {
	xOffset: {type: 'number', label: 'Offset on X', range: [-100,100]},
	yOffset: {type: 'number', label: 'Offset on Y', range: [-100,100]},
	ko: {type: 'boolean', label: 'Delete original'},
	ruler: {type: 'ruler'},
	run: {type: 'button', value: 'batline it!', onClick: function(){
		batLine();
	}}
}

// define palette
var palette = new Palette('batLine v0.0.2', components, params);

function batLine(){

	// define the first object selected in doc
	var original = document.selectedItems.first;

	// make outlines and duplicate shadow
	var shadow1 = original.createOutline();
	shadow1 = CompoundPath([shadow1]);

	var shadow2 = shadow1.clone();

	// move shadow
	shadow2.position += new Point(params.xOffset, params.yOffset);

	// intersect
	var shadow = Pathfinder.backMinusFront([shadow1, shadow2]);

	// delete original
	if (params.ko === true) {
		original.remove();
	}
	
};

