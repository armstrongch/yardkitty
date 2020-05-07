var spriteSheet = new Image();
spriteSheet.src = 'SpriteSheet.png';

var spriteSheetPositions = 
{
	kitty: 				{x:0, y:0},
	squirrel:			{x:1, y:0},
	frog:				{x:2, y:0},
	tree:				{x:3, y:0},
	water:				{x:4, y:0},
	acorn:				{x:5, y:0},
	fly:				{x:6, y:0}
}

function drawActor(x, y, actor)
{
	var tileSheetX = spriteSheetPositions[actor.sprite].x;
	var tileSheetY = spriteSheetPositions[actor.sprite].y;
	var canvasSpaceWidth = gameCanvas.width/map.length;
	var canvasSpaceHeight = gameCanvas.height/map[0].length;
	
	ctx.drawImage(
		spriteSheet,			//image
		tileSheetX*10,			//x position on image
		tileSheetY*10,			//y position on image
		10,						//width on image
		10,						//height on image
		canvasSpaceWidth*x,		//x position on canvas
		canvasSpaceHeight*y,	//y position on canvas
		canvasSpaceWidth,		//width on canvas
		canvasSpaceHeight		//height on canvas
	);
}

function drawActorShadow(x, y, actor)
{
	var tileSheetX = spriteSheetPositions[actor.sprite].x;
	var tileSheetY = spriteSheetPositions[actor.sprite].y + 1;
	var canvasSpaceWidth = gameCanvas.width/map.length;
	var canvasSpaceHeight = gameCanvas.height/map[0].length;
	
	ctx.drawImage(
		spriteSheet,				//image
		tileSheetX*10,				//x position on image
		tileSheetY*10,				//y position on image
		10,							//width on image
		10,							//height on image
		canvasSpaceWidth*x,			//x position on canvas
		canvasSpaceHeight*(y + 1),	//y position on canvas
		canvasSpaceWidth,			//width on canvas
		canvasSpaceHeight			//height on canvas
	);
}