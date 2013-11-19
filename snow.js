(function (window) {

	var ctx, flakes, width, height, options;

	window.snow = function(canvasId, opts) {

		options = opts || {};
		options.background = options.background || 'black';
		options.foreground = options.foreground || 'white';
		options.flakes = options.flakes || 100;
		options.windspeed = options.windspeed || 2;
		options.gravity = options.gravity || 2;
		options.gravityVariation = options.gravityVariation || 2;
		options.size = options.size || 1;
		options.sizeVariation = options.sizeVariation || 2;


		var canvasElement = document.getElementById(canvasId);
		ctx = canvasElement.getContext('2d');

		width = canvasElement.width, height = canvasElement.height;

		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, width, height);

		flakes = [];

		for(var i = 0; i < 1000; i++) {
			var flake = {
				x: Math.random() * width,
				y: Math.random() * height,
				vX: 2,
				vY: (Math.random() * options.gravityVariation) + options.gravity,
				r: (Math.random() * options.sizeVariation) + options.size
			};

			flakes.push(flake);
		}

		draw();
	}

	var count = 0;

	function draw() {

		ctx.fillStyle = options.background;
		ctx.fillRect(0, 0, width, height);
		ctx.fill();

		if(count > 1) {
			return
		}
//		count++

		ctx.fillStyle = options.foreground;

		for(var i = 0; i < flakes.length; i++) {
			var flake = flakes[i];

			flake.x += flake.vX;
			flake.y += flake.vY;

			if(flake.x > width) {
				flake.x -= width;
			}

			if(flake.y > height) {
				flake.y -= height;
			}
			ctx.beginPath();
			ctx.arc(flake.x, flake.y, flake.r, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
		}

		window.requestAnimationFrame(draw);

	}
})(window);