const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 43200 });

module.exports = {cache}