function findKittyPosition()
{
	for (let x = 0; x < map.length; x++)
	{
		for (let y = 0; y < map[0].length; y++)
		{
			var actor = map[x][y];
			if ((actor != null) && (actor.type == "kitty"))
			{
				return {x: x, y: y};
			}
		}
	}
}

function moveKitty(keycode)
{
	var kittyPosition = findKittyPosition();
	var newKittyPosition = findKittyPosition();
	//var kittyActor = map[kittyPosition.x][kittyPosition.y];
	if ((keycode == "ArrowUp") && (kittyPosition.y > 0))
	{
		newKittyPosition.y--;
	}
	else if ((keycode == "ArrowDown") && (kittyPosition.y < map[0].length - 1))
	{
		newKittyPosition.y++;
	}
	else if ((keycode == "ArrowLeft") && (kittyPosition.x > 0)) 
	{
		newKittyPosition.x--;
	}
	else if ((keycode == "ArrowRight") && (kittyPosition.x < map.length - 1))
	{
		newKittyPosition.x++;
	}
	
	if (map[newKittyPosition.x][newKittyPosition.y] == null)
	{
		moveActorToPositon(kittyPosition, newKittyPosition);
	}
}