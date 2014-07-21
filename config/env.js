// environment variable interface

var pe = process.env;

module.exports = {
	public: pe.IN_PUBLIC || 'public',
	port: pe.IN_PORT || 5000,
	instagram: {
		interval: pe.IN_INTERVAL || 60000,
		clientId: pe.IN_CLIENTID,
		clientSecret: pe.IN_CLIENTSECRET,
		tags: pe.IN_TAGS || 'vegas'
	}
};