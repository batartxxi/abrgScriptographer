/*
                                                  
#####    ##   ##### #      # #    # ###### #####  
#    #  #  #    #   #      # ##   # #      #    # 
#####  #    #   #   #      # # #  # #####  #    # 
#    # ######   #   #      # #  # # #      #####  
#    # #    #   #   #      # #   ## #      #   #  
#####  #    #   #   ###### # #    # ###### #    #

batLiner by adrien revel for ABRèGe v 0.0.1
last update: 120929

http://www.abrege.net/

This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/

*/

// params
var params = {
	x: 2,
	y: 2,
	ko: true
}


// define the first object selected in doc
var original = document.selectedItems.first;

// make outlines and duplicate shadow
var shadow1 = original.createOutline();
shadow1 = CompoundPath([shadow1]);

var shadow2 = shadow1.clone();

// move shadow
shadow2.position += new Point(params.x,params.y);

// intersect
var shadow = Pathfinder.backMinusFront([shadow1, shadow2]);

// delete original
if (params.ko === true){
	original.remove();
}