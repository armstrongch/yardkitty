var nextActorId = 0;

function createActor(type)
{
	var newActor = {
		type: type,
		sprite: type,
		actorId: nextActorId
	};
	
	nextActorId++;
	
	switch(type)
	{
		case "puddle":
			newActor.sprite = "water";
			newActor.counter = 0;
			newActor.maxCounter = 3;
			
			newActor.turnFunction = function() 
			{
				this.counter++
				var allPuddles = getAllInstancesOfActorType("puddle");
				var currentPosition = getActorPositionByActorId(this.actorId);
				if ((this.counter == 1) && (allPuddles.length < 6))
				{
					
					var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition, "noType");
					if (adjacentEmptyPositions.length > 0)
					{
						adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
						var newPuddle = createActor("puddle");
						newPuddle.counter = Math.floor(Math.random()*this.maxCounter)
						map[adjacentEmptyPositions[0].x][adjacentEmptyPositions[0].y] = newPuddle;
					}
				}
				if (this.counter >= this.maxCounter)
				{
					if (Math.random() < 0.2)
					{
						map[currentPosition.x][currentPosition.y] = createActor("worm");
					}
					else
					{
						map[currentPosition.x][currentPosition.y] = null;
					}
				}
			}
			break;
		case "worm":
		case "fly":
			newActor.counter = 0;
			newActor.maxCounter = 2;
			newActor.lifespan = 0;
			newActor.turnFunction = function() 
			{
				this.lifespan++;
				if ((this.type == "fly") && (this.lifespan > stats["oldestFly"].Value))
				{
					stats["oldestFly"].Value = this.lifespan;
				}
				else if ((this.type == "worm") && (this.lifespan > stats["oldestWorm"].Value))
				{
					stats["oldestWorm"].Value = this.lifespan;
				}
				
				this.counter++
				if (this.counter >= this.maxCounter)
				{
					this.counter = 0;
					var currentPosition = getActorPositionByActorId(this.actorId);
					var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition, "noType");
					if (adjacentEmptyPositions.length > 0)
					{
						adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
						moveActorToPosition(currentPosition, adjacentEmptyPositions[0]);
					}
				}
			}
			break;
		case "kitty":
			newActor.turnFunction = function() 
			{
				if (autoplay)
				{
					var currentPosition = getActorPositionByActorId(this.actorId);
					var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition, "noType");
					if (adjacentEmptyPositions.length > 0)
					{
						adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
						moveActorToPosition(currentPosition, adjacentEmptyPositions[0]);
					}
				}
			}
			break;
		case "frog":
			newActor.turnFunction = function() { 
				huntForActorType_OrMoveRandomIfNotExists(this.actorId, "fly", true); }
			break;
		case "duck":
			newActor.turnFunction = function() { 
				var allWorms = getAllInstancesOfActorType("worm");
				if (allWorms.length > 0)
				{
					huntForActorType_OrMoveRandomIfNotExists(this.actorId, "worm", true);
				}
				else
				{
					huntForActorType_OrMoveRandomIfNotExists(this.actorId, "fly", true);
				}
			}
			break;
		case "squirrel":
			newActor.turnFunction = function() { 
				huntForActorType_OrMoveRandomIfNotExists(this.actorId, "acorn", true); }
			break;
		case "bee":
			newActor.counter = 0;
			newActor.maxCounter = 30 + Math.floor(Math.random()*30);
			
			newActor.turnFunction = function() 
			{ 
				var currentPosition = getActorPositionByActorId(this.actorId);
				if (positionContainsFlower(currentPosition))
				{
					stats["flowersPollinated"].Value++;
				}
				
				if (this.counter > this.maxCounter)
				{
					huntForActorType_OrMoveRandomIfNotExists(this.actorId, "hive", false);
				}
				else
				{
					this.counter++;
					
					var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition, "noType");
					if (adjacentEmptyPositions.length > 0)
					{
						adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
						moveActorToPosition(currentPosition, adjacentEmptyPositions[0]);
					}
				}
			}
			break;
		case "tree":
			newActor.maxCounter = 30;
			newActor.counter = Math.floor(Math.random()*newActor.maxCounter);
			
			newActor.turnFunction = function() 
			{
				this.counter++
				if (this.counter >= this.maxCounter)
				{
					this.counter = 0;
					var currentPosition = getActorPositionByActorId(this.actorId);
					var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition, "noType");
					if (adjacentEmptyPositions.length > 0)
					{
						adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
						map[adjacentEmptyPositions[0].x][adjacentEmptyPositions[0].y] = createActor("acorn");
					}
				}
			}
			break;
		case "hive":
			newActor.maxCounter = 30;
			newActor.counter = Math.floor(Math.random()*newActor.maxCounter);
			
			newActor.turnFunction = function() 
			{
				this.counter++
				if (this.counter >= this.maxCounter)
				{
					this.counter = 0;
					var currentPosition = getActorPositionByActorId(this.actorId);
					var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition, "noType");
					if (adjacentEmptyPositions.length > 0)
					{
						adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
						var newBee = createActor("bee");
						newBee.hivePosition = currentPosition;
						map[adjacentEmptyPositions[0].x][adjacentEmptyPositions[0].y] = newBee;
					}
				}
			}
			break;
		case "water":
			newActor.maxCounter = 30;
			newActor.counter = Math.floor(Math.random()*newActor.maxCounter);
			
			newActor.turnFunction = function() 
			{
				this.counter++
				if (this.counter >= this.maxCounter)
				{
					this.counter = 0;
					var currentPosition = getActorPositionByActorId(this.actorId);
					var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition, "noType");
					if (adjacentEmptyPositions.length > 0)
					{
						adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
						map[adjacentEmptyPositions[0].x][adjacentEmptyPositions[0].y] = createActor("fly");
					}
				}
			}
			break;
		case "acorn":
			newActor.lifespan = 0;
			
			newActor.turnFunction = function() 
			{
				this.lifespan++;
				if (this.lifespan > stats["oldestAcorn"].Value)
				{
					stats["oldestAcorn"].Value = this.lifespan;
				}
			}
			break;
		default:
			newActor.turnFunction = function() {console.log("Default move function.");};
			break;
	}
	
	return newActor;
}

function huntForActorType_OrMoveRandomIfNotExists(actorId, actorType, hunterSurvives)
{
	var currentPosition = getActorPositionByActorId(actorId);
	var adjacentEmptyPositions = getEmptyAdjacentPositions(currentPosition, actorType);
	if (adjacentEmptyPositions.length > 0)
	{
		adjacentEmptyPositions = shuffle(adjacentEmptyPositions);
		
		var acornInstances = getAllInstancesOfActorType(actorType);
		if (acornInstances.length == 0)
		{
			moveActorToPosition(currentPosition, adjacentEmptyPositions[0]);
		}
		else
		{
			var targetPosition = stepTowardsNearestActorOfType(currentPosition, actorType, adjacentEmptyPositions[0]);
			if ((!hunterSurvives) &&
				(map[targetPosition.x][targetPosition.y] != null) &&
				(map[targetPosition.x][targetPosition.y].type == actorType))
			{
				map[currentPosition.x][currentPosition.y] = null;
			}
			else
			{
				if ((map[targetPosition.x][targetPosition.y] != null) 
					&& (map[targetPosition.x][targetPosition.y].type == "acorn"))
				{
					stats["acornsEaten"].Value++;
				}
				else if ((map[targetPosition.x][targetPosition.y] != null) 
					&& (map[targetPosition.x][targetPosition.y].type == "fly"))
				{
					stats["fliesEaten"].Value++;
				}
				else if ((map[targetPosition.x][targetPosition.y] != null) 
					&& (map[targetPosition.x][targetPosition.y].type == "worm"))
				{
					stats["wormsEaten"].Value++;
				}
				moveActorToPosition(currentPosition, targetPosition);
			}
		}
	}
}

function chooseClosestPosition(adjacentPositions, targetInstances)
{
	return adjacentPositions[0];
}

function getAllInstancesOfActorType(actorType)
{
	var instances = [];
	for (let w = 0; w < map.length; w++)
	{
		for (let h = 0; h < map[0].length; h++)
		{
			var actor = map[w][h];
			if ((actor != null) && (actor.type == actorType))
			{
				instances.push(actor);
			}
		}
	}
	return instances;
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

function moveActorToPosition(oldPosition, newPosition)
{
	console.log("Old Postion (x: " + oldPosition.x + ", y:" + oldPosition.y + ")");
	console.log("New Postion (x: " + newPosition.x + ", y:" + newPosition.y + ")");
	var actorToMove = map[oldPosition.x][oldPosition.y];
	map[newPosition.x][newPosition.y] = actorToMove;
	map[oldPosition.x][oldPosition.y] = null;
}