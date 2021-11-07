module.exports = {
	future: {
		webpack5: process.env.NODE_ENV === "production" ? false : true, // not currently supported by serverless
	},
};
