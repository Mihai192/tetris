import { Canvas } from './canvas.js';
import { DrawManager } from './draw-manager.js';
import { Game } from './game.js';

let canvas = new Canvas(document.getElementById("myCanvas"));

let drawmanager = new DrawManager();

let game = new Game(canvas, 125);

drawmanager.fill(game.canvas);
drawmanager.draw(game.canvas, game.score, game.lines);

function loop(speed)
{
	setTimeout( () => {
		game.logic();
		
		drawmanager.draw(game.canvas, game.score, game.lines);
		if (game.KeyPressed)
			loop(50);
		else
			loop(125);
	}, speed)
}

loop(125);

