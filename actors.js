var nextActorId = 0;

function createActor(type)
{
	var newActor = {
		waitTime: 0,
		waitTimer: 0,
		type: type,
		sprite: type,
		actorId: nextActorId
	};
	
	nextActorId++;
	
	switch(type)
	{
		case "squirrel":
		case "frog":
			newActor.turnFunction = function() 
			{
				var currentPosition = getActorPositionByActorId(this.actorId);
				var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition);
				if (adjacentEmptyPositions.length > 0)
				{
					adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
					moveActorToPositon(currentPosition, adjacentEmptyPositions[0]);
				}
				drawLevel();
			}
			break;
		default:
			newActor.turnFunction = function() {console.log("Default move function.");};
			break;
	}
	
	return newActor;
}

function getActorPositionByActorId(actorId)
{
	for (let w = 0; w < map.length; w++)
	{
		for (let h = 0; h < map[0].length; h++)
		{
			var actor = map[w][h];
			if ((actor != null) && (actor.actorId == actorId))
			{
				return {x: w, y: h};
			}
		}
	}
	return {x: -1, y:-1};
}

function moveActorToPositon(oldPosition, newPosition)
{
	var actorToMove = map[oldPosition.x][oldPosition.y];
	map[newPosition.x][newPosition.y] = actorToMove;
	map[oldPosition.x][oldPosition.y] = null;
}