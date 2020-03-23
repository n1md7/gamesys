module.exports = {
  port: 8080,
  hostname: '127.0.0.1',
  /*
   * TimeToLive values
   * for file and data cache
   * values are in seconds
   * */
  fileCacheTTL: 15,
  dataCacheTTL: 15,
  /*
   * this is to test caching
   * when its true logs messages in console
   * */
  verboseCaching: true,
  /*
   * RapidAPI config
   * to get corona virus data
   * */
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
  /*
   * RapidAPI config
   * to get random text from Lorem Ipsum
   * */
  loremIpsumOptions:  {
    "method": "GET",
    "hostname": "alexnormand-dino-ipsum.p.rapidapi.com",
    "port": null,
    "path": "/?format=html&words=57&paragraphs=30",
    "headers": {
      "x-rapidapi-host": "alexnormand-dino-ipsum.p.rapidapi.com",
      "x-rapidapi-key": "2b75118a7dmsh38a00691d9daca1p15ecc0jsn0de5d0c04bdb"
    }
  },
};
