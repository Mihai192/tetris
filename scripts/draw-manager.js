export class DrawManager
{
	constructor()
	{
		this.colors = [
			"black",
			"grey",
			"red",
			"yellow",
			"blue",
			"purple",
			"pink",
			"rgba(211, 185, 179, 0.9)"
		];
	}
	
	displayMatrix(canvas)
	{
		for (let i = 0; i < canvas.matrix.numOfRows; ++ i)
		{
			console.log(canvas.matrix[i]);
			console.log();
		}
	}

	fill(canvas)
	{
		canvas.ctx.fillStyle = 'black';
		canvas.ctx.fillRect(0,0, canvas.width, canvas.height);
	}

	draw(canvas, score, lines)
	{
		document.querySelector('.score-value').innerHTML = score;
		document.querySelector('.lines-value').innerHTML = lines;

		for (let i = 0; i < canvas.numOfRows; ++ i)
			for (let j = 0; j < canvas.numOfColumns; ++ j)
			{
				canvas.ctx.beginPath();
				canvas.ctx.fillStyle = this.colors[canvas.matrix[i][j]];
				canvas.ctx.fillRect(j * canvas.squareSize, i * canvas.squareSize, canvas.squareSize, canvas.squareSize);		
				canvas.ctx.stroke();
			}
	
	}
}