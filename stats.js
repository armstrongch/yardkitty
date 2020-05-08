var stats = 
[
	["Acorns Eaten", 0],		//0
	["Flies Eaten", 0],			//1
	["Worms Eaten", 0],			//2
	["Flowers Pollinated", 0],	//3
	["Thunderstorms", 0]		//4
];

function printStats()
{
	var statsHTML = "";
	for (let i = 0; i < stats.length; i++)
	{
		statsHTML += "<p>" + stats[i][0] + ": " + stats[i][1] + "</p>";
	}
	$('#statsDiv').html(statsHTML);
}