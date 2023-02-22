export class Canvas 
{
	constructor(canvas)
	{
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.matrix = [];
		
		this.squareSize = 20;
		this.numOfRows = this.canvas.height / this.squareSize;
		this.numOfColumns = this.canvas.width / this.squareSize;
		
		for (let i = 0; i < this.numOfRows; ++ i)
			this.matrix.push(Array(this.numOfColumns).fill(0));
		
		for (let i = 0; i < this.numOfRows; ++ i)
			for (let j = 0; j < this.numOfColumns; ++ j)
				if (i == 0 || j == 0 || i == this.numOfRows - 1 || j == this.numOfColumns - 1)
					this.matrix[i][j] = 1;
	}
}