
var ImageSlicer = function(){
	var doc = activeDocument;
	var currLayer = doc.activeLayer;
		
	function sliceImage(verticalTiles, horizontalTiles){
		var tileCount = 0;
		var tileWidth = doc.width/verticalTiles;
		var tileHeight = doc.height/horizontalTiles;
		for(var i=0; i <doc.height;i = i + tileHeight){
			for(var j=0; j < doc.width;j = j + tileWidth){
				makeSelection(j,i, tileWidth, tileHeight);
				doc.paste(doc.selection.copy());
				doc.activeLayer = currLayer;
			}
		}
	}

	function makeSelection(x,y,sw,sh){
		app.activeDocument.selection.select([ [x,y], [x,y+sh], [x+sw,y+sh], [x+sw,y] ]);  
	}

	function assetify(prefix){
		var layers = doc.artLayers;
		for(var i = 0; i < layers.length-1;i++){
			layers[i].name = prefix + i + ".jpg";
		}
	}	
	return {execute:function(){
			app.preferences.rulerUnits = Units.PIXELS;
			sliceImage(prompt("Vertical Tiles:", "0"),prompt("Horizontal Tiles:", "0"));
			assetify(prompt("Tile Prefix:", "Tile_"));	
		}
	}	
}

var slicer = new ImageSlicer();
slicer.execute();