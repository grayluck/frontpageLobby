
var crypto = require('crypto');

exports.genToken = function randomValueHex () {
	var len = 16;
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex')
        .slice(0,len);
}

exports.toMd5 = function(s) {
	return crypto.createHash('md5').update(s).digest('hex');
}
