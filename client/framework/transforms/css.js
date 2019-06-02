module.exports = {
	process: function(src, filename) {
		if (filename.match(/\.(css|less|scss|styl)$/)) {
			return '';
		}
	},
};
