var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");

var up = false;
var down = false;
var left = false;
var right = false;
var space = false;
var autoplay = false;

var grassColor = '#2bce5c';


function loadPage()
{
	gameCanvas.width = 640;
	gameCanvas.height = 480;
	
	document.addEventListener('keydown', (e) => { e.preventDefault(); keyPress(e.code) } );
	document.addEventListener('keyup', (e) => { e.preventDefault(); keyRelease(e.code) } );

	setUpLevel(12, 9);
	drawLevel();
	
	setInterval(function()
	{
		autoplay = $('#autoplayswitch').prop("checked");
		if (autoplay)
		{
			fullGameLoop();
		}
	}, 225);
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
	
	printStats();
}

function keyPress(keycode)
{
	if ((!autoplay) && (playerTurn) && 
		((keycode == "ArrowUp") || 
		(keycode == "ArrowDown") || 
		(keycode == "ArrowLeft") || 
		(keycode == "ArrowRight")))
	{
		playerTurn = false;
		moveKitty(keycode);
		fullGameLoop();
		playerTurn = true;
	}
}

function fullGameLoop()
{
	gameTurn();
	weatherTurn();
	drawLevel();
	stats["totalTurns"].Value++;
}

function keyRelease(keycode)
{
	console.log("key release");
}