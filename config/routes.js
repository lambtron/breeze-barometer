'use strict';

(function() {

  /**
   * Import helpers ============================================================
   */
  var pg = require('../app/lib/db_connect');

  // Public functions. =========================================================
  module.exports = function(app) {
    // API routes ==============================================================
    app.post('/api/funnel', function(req, res) {
      // req.body.start
      // req.body.end
      var start = req.body.load.start;
      var end = req.body.load.end;

      // send request to pgsql
      // updated_at
      pg.query('SELECT * FROM users WHERE updated_at >= $1 AND updated_at <= $2',
                [start + ' 00:00:00 -0700', end + ' 24:00:00 -0700'],
                // ['2014-09-17 15:18:27 -0700', '2014-09-17 15:18:27 -0700'],
                function(err, result) {
        var funnel = {};
        for (var i = 0; i < result.rows.length; i++) {
          var neighborhood = result.rows[i].neighborhood ? result.rows[i].neighborhood.replace(/\W/g, '') : "NA";
          var currentStage = result.rows[i].current_stage;
          if (funnel.hasOwnProperty(neighborhood))
            if (funnel[neighborhood].hasOwnProperty(currentStage))
              funnel[neighborhood][currentStage] += 1
            else
              funnel[neighborhood][currentStage] = 0
          else
            funnel[neighborhood] = {};
        }
        res.send(funnel, 200);
      });
    });

  	// Application routes ======================================================
  	app.get('/*', function(req, res) {
      res.sendfile('index.html', {'root': './public/views/'});
    });
  };

}());