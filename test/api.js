var hippie = require('hippie');
var mocha = require('mocha-clean/brief');

hippie.assert.showDiff = true;

describe('API', function(){

  describe('devices', function(){

    it('should return a list of devices', function(done){

      hippie()
        .json()
        .base('http://localhost:1337')
        .get('/api/v1/devices')
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({
          username: 'vesln',
            repos: [
              { name: 'jsmd' },
              { name: 'hippie' },
          ]
        })
        .end(function(err, res, body) {
          if (err) throw new Error("Fail to contact the api");

          done();
        });

    });

  });

})
