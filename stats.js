var statNames = 
[
	"totalTurns",
	"acornsEaten",
	"oldestAcorn",
	"fliesEaten",
	"oldestFly",
	"wormsEaten",
	"oldestWorm",
	"flowersPollinated",
	"rainstormsWeathered"
]

var stats = 
{
	totalTurns: { Description:"Total Turns", Value: 0 },
	acornsEaten: { Description:"Acorns Eaten", Value: 0 },
	oldestAcorn: { Description:"Oldest Acorn", Value: 0 },
	fliesEaten: { Description:"Flies Eaten", Value: 0 },
	oldestFly: { Description:"Oldest Fly", Value: 0 },
	wormsEaten: { Description:"Worms Eaten", Value: 0 },
	oldestWorm: { Description:"Oldest Worm", Value: 0 },
	flowersPollinated: { Description:"Flowers Pollinated", Value: 0 },
	rainstormsWeathered: { Description:"Rainstorms Weathered", Value: 0 }
};

function printStats()
{
	var statsHTML = "";
	for (let i = 0; i < statNames.length; i++)
	{
		var stat = stats[statNames[i]];
		statsHTML += "<p>" + stat.Description + ": " + stat.Value + "</p>";
	}
	$('#statsDiv').html(statsHTML);
}