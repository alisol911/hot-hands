module.exports = {
	process: function(src, filename) {
		if (filename.match(/\.(svg)$/)) {
			return '';
		}
	},
};
