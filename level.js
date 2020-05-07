var actions = [];
var map = [];
var playerTurn = false;

function generateMap(width, height)
{
	var newMap = [];
	
	for (let w = 0; w < width; w++)
	{
		var newMapRow = [];
		for (let h = 0; h < height; h++)
		{
			newMapRow.push(null);
		}
		newMap.push(newMapRow);
	}
	return newMap;
}

function setUpLevel(width, height)
{
	map = generateMap(width, height);
	map[6][5] = createActor("kitty");
	map[3][2] = createActor("squirrel");
	map[3][5] = createActor("frog");
	
	map[1][1] = createActor("tree");
	map[2][2] = createActor("tree");
	map[3][1] = createActor("tree");
	map[1][3] = createActor("tree");
	
	map[2][6] = createActor("water");
	map[3][6] = createActor("water");
	map[1][7] = createActor("water");
	map[2][7] = createActor("water");
	
	playerTurn = true;
}

function gameTurn()
{
	var actors = [];
	for (let w = 0; w < map.length; w++)
	{
		for (let h = 0; h < map[0].length; h++)
		{
			var actor = map[w][h];
			if (actor != null)
			{
				actors.push(map[w][h]);
			}
		}
	}
	
	actors = shuffle(actors);
	
	for (let i = 0; i < actors.length; i++)
	{
		actors[i].turnFunction();
	}
}

function getEmptyAdjacentPositions(currentPosition)
{
	var potentialPositions = [];
	var currentX = currentPosition.x;
	var currentY = currentPosition.y;
	
	if (positionExistsAndEmpty({x: currentX + 1, y: currentY}))
	{
		potentialPositions.push({x: currentX + 1, y: currentY})
	}
	
	if (positionExistsAndEmpty({x: currentX - 1, y: currentY}))
	{
		potentialPositions.push({x: currentX - 1, y: currentY})
	}
	
	if (positionExistsAndEmpty({x: currentX, y: currentY + 1}))
	{
		potentialPositions.push({x: currentX, y: currentY + 1})
	}
	
	if (positionExistsAndEmpty({x: currentX, y: currentY - 1}))
	{
		potentialPositions.push({x: currentX, y: currentY - 1})
	}
	
	return potentialPositions;
}

function positionExistsAndEmpty(position)
{
	if ((position.x >= 0) 
		&& (position.y >= 0) 
		&& (position.x < map.length - 1) 
		&& (position.y < map[0].length - 1)
		&& (map[position.x][position.y] == null))
		{
			return true;
		}
		else
		{
			return false;
		}
}