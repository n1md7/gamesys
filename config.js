module.exports = {
  coronaOptions: {
    'method': 'GET',
    'hostname': 'covid-19-coronavirus-statistics.p.rapidapi.com',
    'port': null,
    'path': '/v1/stats',
    'headers': {
      'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      'x-rapidapi-key': '2b75118a7dmsh38a00691d9daca1p15ecc0jsn0de5d0c04bdb',
    },
  },
  port: 8080,
  hostname: '127.0.0.1',
  // seconds
  fileCacheTTL: 15,
  dataCacheTTL: 15,
};
