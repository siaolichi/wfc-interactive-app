const OverlappingModel = require('wavefunctioncollapse').OverlappingModel;
const Jimp = require('jimp');
const seed = require('seed-random');
const generator = () => {
	Jimp.read('./src/assets/img/test.png', function(err, sourceImage) {
		if (err) {
			throw err;
		}
		var data = new Uint8Array(sourceImage.bitmap.data),
			width = sourceImage.bitmap.width,
			height = sourceImage.bitmap.height,
			destWidth = 100,
			destHeight = 100;
		console.log(width, height);
		if (width > 100 || height > 100) {
			return { success: false, response: 'Image is too big' };
		} else {
			var model = new OverlappingModel(
				data,
				width,
				height,
				2,
				destWidth,
				destHeight,
				false,
				true,
				1,
				0
			);

			var time = Date.now();
			var finished = model.generate(Math.random);

			console.log(finished ? 'Generation successful' : 'Generation unsuccessful');
			console.log(Date.now() - time, 'ms');

			if (finished) {
				var result = model.graphics();

				new Jimp(destWidth, destHeight, function(err, image) {
					image.bitmap.data = new Buffer(result.buffer);
					image.write('output/overlapping-model.png');
				});
			}
		}
	});
};
module.exports = { generator };
