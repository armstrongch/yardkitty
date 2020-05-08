var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");

var up = false;
var down = false;
var left = false;
var right = false;
var space = false;

var grassColor = '#2bce5c';


function loadPage()
{
	gameCanvas.width = 640;
	gameCanvas.height = 480;
	
	document.addEventListener('keydown', (e) => { keyPress(e.code) } );
	document.addEventListener('keyup', (e) => { keyRelease(e.code) } );

	setUpLevel(12, 9);
	drawLevel();
}

function drawLevel()
{
	ctx.fillStyle = grassColor;
	ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
	
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	
	var flowerCounter = 1;
	
	for (let w = 0; w < map.length; w++)
	{
		for (let h = map[w].length - 1; h >= 0; h--)
		{
			flowerCounter++;
			if (flowerCounter % 7 == 0)
			{
				ctx.globalAlpha = 0.6;
				drawActor(w, h, {sprite: "flower"});
				ctx.globalAlpha = 1;
			}
		}
	}
	
	for (let w = 0; w < map.length; w++)
	{
		for (let h = map[w].length - 1; h >= 0; h--)
		{
			
			if (map[w][h] != null)
			{
				ctx.globalAlpha = 1;
				drawActor(w, h, map[w][h]);
				ctx.globalAlpha = 0.2;
				drawActorShadow(w, h, map[w][h]);
				ctx.globalAlpha = 1;
			}
		}
	}
	
	for (let i = 0; i < weatherActors.length; i++)
	{
		ctx.globalAlpha = 1;
		drawActor(weatherActors[i].x, weatherActors[i].y, {sprite: weatherActors[i].sprite});
		ctx.globalAlpha = 0.2;
		drawActorShadow(weatherActors[i].x, weatherActors[i].y, {sprite: weatherActors[i].sprite});
		ctx.globalAlpha = 1;
	}
}

function keyPress(keycode)
{
	if ((playerTurn) && 
	((keycode == "ArrowUp") || 
	(keycode == "ArrowDown") || 
	(keycode == "ArrowLeft") || 
	(keycode == "ArrowRight")))
	{
		playerTurn = false;
		moveKitty(keycode);
		gameTurn();
		weatherTurn();
		drawLevel();
		playerTurn = true;
	}
}

function keyRelease(keycode)
{
	console.log("key release");
}