import { Tetromino }  from './tetromino.js';

export class Game 
{
	constructor(canvas, speed)
	{
		this.canvas = canvas;
		this.keyRecorded;
		this.currentTetromino = null;
		this.speed = speed;

		this.supportTetromino = null;

		this.lines = 0;
		this.score = 0;
		

		this.colors = [
			"black",
			"grey",
			"red",
			"yellow",
			"blue",
			"purple",
			"pink",
			"rgba(211, 185, 179, 0.8)"
		];

		this.KeyPressed  = '';
		
		document.addEventListener('keydown', (event) => {
			switch (event.key) {
				case "ArrowDown":
				{
					this.KeyPressed = 'ArrowDown';
					break;
				} 
				case "ArrowLeft":
				{
					this.KeyPressed = 'ArrowLeft';
					break;
				}
				case "ArrowRight":
				{
					this.KeyPressed = 'ArrowRight';
					break;
				}
				case " ":
				{
					this.KeyPressed = "Space";
					console.log("Space");
					break;
				}
				default:
					return; 
			  }
		});

		document.addEventListener('keyup', (event) => {
			this.KeyPressed = '';
		});
	}

	generateTetromino()
	{
		this.currentTetromino 		= new Tetromino();
		this.currentTetromino.color = Math.floor(Math.random() * 6 + 1);
		
		let coordinates = [1, 8];

		
		let tetrominos = [
			[ 	[coordinates[0],     coordinates[1]],
				[coordinates[0] + 1, coordinates[1]],
				[coordinates[0] + 2, coordinates[1]]
			],	
			[ 	[coordinates[0],     coordinates[1]],
				[coordinates[0] + 1, coordinates[1]],
				[coordinates[0],     coordinates[1] + 1],
				[coordinates[0] + 1, coordinates[1] + 1] 
			],
			[
				[coordinates[0],     coordinates[1]],
				[coordinates[0],     coordinates[1] + 1],
				[coordinates[0],     coordinates[1] + 2],
			],
			[
				[coordinates[0],     coordinates[1]],
				[coordinates[0],     coordinates[1] + 1],
				[coordinates[0],     coordinates[1] + 2],
				[coordinates[0] + 1, coordinates[1] + 1]
			],
			[ 
				[coordinates[0],     coordinates[1]],
				[coordinates[0] + 1, coordinates[1]],
				[coordinates[0] + 2, coordinates[1]],
				[coordinates[0] + 1, coordinates[1] + 1]
			],
			[
				[coordinates[0],     coordinates[1]],
				[coordinates[0] + 1, coordinates[1]],
				[coordinates[0] + 2, coordinates[1]],
				[coordinates[0] + 2, coordinates[1] + 1],
			],
			[
				[coordinates[0],     coordinates[1]],
				[coordinates[0],     coordinates[1] + 1],
				[coordinates[0] + 1, coordinates[1] + 1],
				[coordinates[0] + 1, coordinates[1] + 2],
			]
		];
		
		this.currentTetromino.coordinates = tetrominos[Math.floor(Math.random()*tetrominos.length)];
	}

	moveDownTetromino()
	{
		let test = false;

		this.currentTetromino.coordinates.forEach((coordinate, index) => {
			let [i, j] = coordinate;
			
			if (i + 1 == this.canvas.numOfRows - 1)
				test = true;
		});
		
		if (test)
			return 0;

		this.currentTetromino.coordinates.forEach((coordinate) => {
			let [i, j] = coordinate;

			let newCoordinate = [i + 1, j];

			
			let verify = this.currentTetromino.coordinates.find(elem => {
				for (let i = 0; i < elem.length; ++ i)
					if (elem[i] !== newCoordinate[i])
						return false;
				return true;
			});
			
			if (verify == undefined && this.canvas.matrix[i + 1][j] > 0 && this.canvas.matrix[i + 1][j] !== 7)
				test = true;
		});


		if (test)
			return 0;
		
		this.currentTetromino.coordinates.forEach((coordinate, index) => {
			let [i, j] = coordinate;
			this.canvas.matrix[i][j] = 0;
		});

		this.currentTetromino.coordinates.forEach((coordinate, index) => {
			this.currentTetromino.coordinates[index][0] += 1;
		});

		this.currentTetromino.coordinates.forEach((coordinate, index) => {
			let [i, j] = coordinate;
			
			
			
			this.canvas.matrix[i][j] = this.currentTetromino.color;
		});

		return 1;
	}
	
	tetrominoSupport(tetromino)
	{
		let collision = false;
		let iter = 0;
		while (!collision)
		{
			let collision = false;

			tetromino.forEach((coordinate, index) => {
				let [i, j] = coordinate;
				
				if (i + 1 == this.canvas.numOfRows - 1)
					collision = true;
			});
			
			if (collision)
			{
				
					
				tetromino.forEach((coordinate, index) => {
					let [i, j] = coordinate;
					this.canvas.matrix[i][j] = 7;
				});
				

				return 0;
			}

			tetromino.forEach((coordinate) => {
				let [i, j] = coordinate;

				let newCoordinate = [i + 1, j];

				
				let verify = tetromino.find(elem => {
					for (let i = 0; i < elem.length; ++ i)
						if (elem[i] !== newCoordinate[i])
							return false;
					return true;
				});
				
				if (verify == undefined && this.canvas.matrix[i + 1][j] !== 0)
					collision = true;
			});


			if (collision)
			{
				
				tetromino.forEach((coordinate, index) => {
					let [i, j] = coordinate;
					this.canvas.matrix[i][j] = 7;
				});
				
				return 0;
			}
			
			

			tetromino.forEach((coordinate, index) => {
				tetromino[index][0] += 1;
			});			

			iter += 1;
		}
	}

	fullLine()
	{

		for (let i = 1; i < this.canvas.numOfRows - 1; ++ i)
		{
			let full = true;
			for (let j = 1; j < this.canvas.numOfColumns - 1; ++ j)
			{
				if (this.canvas.matrix[i][j] == 0 || this.canvas.matrix[i][j] == 7)
				{
					full = false;
					break;
				}
			}

			if (full)
				return i;
		}


		return -1;
	}

	moveLeftRightTetromino()
	{
		let keyPressed = this.KeyPressed;
		
		let move = {
			'ArrowLeft' : -1,
			'ArrowRight' : 1
		};

		let test = false;

		this.currentTetromino.coordinates.forEach((coordinate, index) => {
			let [i, j] = coordinate;
			
			if (j - 1 == 0 && move[keyPressed] == -1)
				test = true;
			if (j + 1 == this.canvas.numOfColumns - 1 && move[keyPressed] == 1)
				test = true;
		});
		
		if (test)
			return 0;
		
		
		this.currentTetromino.coordinates.forEach((coordinate) => {
			let [i, j] = coordinate;

			let newCoordinate = [i, j + move[keyPressed]];

			
			let verify = this.currentTetromino.coordinates.find(elem => {
				for (let i = 0; i < elem.length; ++ i)
					if (elem[i] !== newCoordinate[i])
						return false;
				return true;
			});
			

			if (verify == undefined && this.canvas.matrix[i][j + move[keyPressed]] > 0)
				test = true;
		});
		
		
		if (test)
			return 0;
		
			
		this.currentTetromino.coordinates.forEach((coordinate, index) => {
			let [i, j] = coordinate;
			this.canvas.matrix[i][j] = 0;
		});



		this.currentTetromino.coordinates.forEach((coordinate, index) => {
			this.currentTetromino.coordinates[index][1] += move[keyPressed];
		});

		this.currentTetromino.coordinates.forEach((coordinate, index) => {
			let [i, j] = coordinate;

			
			this.canvas.matrix[i][j] = this.currentTetromino.color;
		});

		return 1;
	}

	logic()
	{
		setTimeout( () => {
			let row = this.fullLine() ;
			
			if (row !== -1)
			{
				for (let i = row; i > 2; -- i)
				{
					for (let j = 1; j < this.canvas.numOfColumns; ++ j)
						this.canvas.matrix[i][j] = this.canvas.matrix[i - 1][j]; 
				}

				this.lines += 1;
				this.score += 100;
			}

			if (this.currentTetromino === null)
			{
				if (this.canvas.matrix[1][8] === 0)
				{
					this.generateTetromino();

					this.currentTetromino.coordinates.forEach((coordinate) => {
						let [i, j] = coordinate;
						
						this.canvas.matrix[i][j] = this.currentTetromino.color;
					});
					
					this.supportTetromino = [];
					
					this.currentTetromino.coordinates.forEach((coordinate) => {
						let temp = [];
						
						coordinate.forEach((elem) => {
							temp.push(elem);
						});

						this.supportTetromino.push(temp);
					});
					
					this.tetrominoSupport(this.supportTetromino);
				}
				else
				{
					this.score = 0;
					this.lines = 0;
					
					for (let i = 1; i < this.canvas.numOfRows - 1; ++ i)
						for (let j = 1; j < this.canvas.numOfColumns - 1; ++ j)
							this.canvas.matrix[i][j] = 0;
					this.currentTetromino = null;

				}
			}
			else
			{
				if (this.KeyPressed == 'ArrowLeft' || this.KeyPressed == 'ArrowRight')
				{
					let test = this.moveLeftRightTetromino();
					if (test)
					{
						this.supportTetromino.forEach((elem) => {	
							this.canvas.matrix[elem[0]][elem[1]] = 0;
						});
						
						
						this.supportTetromino = [];
						
						this.currentTetromino.coordinates.forEach((coordinate) => {
							let temp = [];
							
							coordinate.forEach((elem) => {
								temp.push(elem);
							});
			
							this.supportTetromino.push(temp);
						});
						
						
						
						
						
						this.tetrominoSupport(this.supportTetromino);
						
						let same = true;

						this.supportTetromino.forEach((elem, index) => {
							if (elem[0] !== this.currentTetromino.coordinates[index][0] ||
								elem[1] !== this.currentTetromino.coordinates[index][1])
								same = false;
						});

						if (same)
						this.currentTetromino.coordinates.forEach((elem) => {
						
							this.canvas.matrix[elem[0]][elem[1]] = this.currentTetromino.color;
						});
					}
					
					
				}
				else if (this.KeyPressed == 'ArrowDown' || this.KeyPressed == '')
				{
					let isPossible = this.moveDownTetromino();

					if (!isPossible)
					{
						
						this.currentTetromino = null;
						this.score += 24;
					}	
					
				}
				else if (this.KeyPressed == "Space")
				{
					this.score += 24;

					this.currentTetromino.coordinates.forEach((elem) => {
						this.canvas.matrix[elem[0]][elem[1]] = 0;
					});

					this.currentTetromino.coordinates = [];

					this.supportTetromino.forEach((coordinate) => {
						let temp = [];
						
						coordinate.forEach((elem) => {
							temp.push(elem);
						});
		
						this.currentTetromino.coordinates.push(temp);
					});

					this.currentTetromino.coordinates.forEach((coordinate) => {
						this.canvas.matrix[coordinate[0]][coordinate[1]] = this.currentTetromino.color;
					});

					this.currentTetromino = null;
				}
			}
		}, 50);
	}
}