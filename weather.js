var maxWeatherCounter = 15;
var weatherCounter = -1;
var typesOfWeather = ["rain"];
var weatherActors = [];

function weatherTurn()
{
	if (weatherActors.length == 0)
	{
		weatherCounter++;
		if (weatherCounter >= maxWeatherCounter)
		{
			generateWeather();
			weatherCounter = 0;
		}
	}
	else
	{
		for (let i = weatherActors.length - 1; i >= 0; i--)
		{
			var weatherActor = weatherActors[i];
			switch(weatherActor.type)
			{
				case "rain":
					if ((weatherActor.x < 0) 
						|| (weatherActor.y < 0) 
						|| (weatherActor.x > map.length - 1) 
						|| (weatherActor.y > map[0].length - 1))
					{
						weatherActors.splice(i, 1);
					}
					else
					{						
						if (map[weatherActor.x][weatherActor.y] == null)
						{
							map[weatherActor.x][weatherActor.y] = createActor("puddle");
						}
						weatherActor.x += weatherActor.positionModifier.x;
						weatherActor.y += weatherActor.positionModifier.y;
					}
					break;
			}
		}
	}
}

function generateWeather()
{
	var randomWeatherIndex = Math.floor(Math.random()*typesOfWeather.length);
	var randomWeather = typesOfWeather[randomWeatherIndex];
	switch(randomWeather)
	{
		case "rain":
			stats[4][1]++;
			var startingEdge = Math.floor(Math.random()*4);
			
			var rainActor = 
			{
				type: "rain",
				sprite: "rain"
			};
			
			switch(startingEdge)
			{
				case 0:
					rainActor.x = 0;
					rainActor.y = Math.floor(Math.random()*map[0].length);
					rainActor.positionModifier = {x:1, y:0};
					break;
				case 1:
					rainActor.x = map.length - 1;
					rainActor.y = Math.floor(Math.random()*map[0].length);
					rainActor.positionModifier = {x:-1, y:0};
					break;
				case 2:
					rainActor.x = Math.floor(Math.random()*map.length);
					rainActor.y = 0;
					rainActor.positionModifier = {x:0, y:1};
					break;
				case 3:
					rainActor.x = Math.floor(Math.random()*map.length);
					rainActor.y = map[0].length - 1;
					rainActor.positionModifier = {x:0, y:-1};
					break;
			}
			weatherActors = [rainActor];
			break;
	}
}