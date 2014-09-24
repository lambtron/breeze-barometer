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
      var start = req.body.start;
      var end = req.body.end;

      // send request to pgsql
      // updated_at
      pg.query('SELECT * FROM users WHERE updated_at >= $1 AND updated_at <= $2',
                // [start + ' 00:00:00 -0700', end + ' 24:00:00 -0700'],
                ['2014-09-17 15:18:27 -0700', '2014-09-17 15:18:27 -0700'],
                function(err, result) {
        // perform funnel calculation. return something like this:
        // {"San_Francisco_94104"=>
       //  {"orientation_stage"=>818,
       //   "new_application_stage"=>2560,
       //   "signing_stage"=>11,
       //   "onboarding_stage"=>63,
       //   "passed_lease_stage"=>96,
       //   "activation_stage"=>45},
       // "NA"=>
       //  {"new_application_stage"=>2753,
       //   "orientation_stage"=>31,
       //   "onboarding_stage"=>3,
       //   "passed_lease_stage"=>1,
       //   "activation_stage"=>1},
       // "San_Jose_94040"=>
       //  {"new_application_stage"=>233,
       //   "orientation_stage"=>125,
       //   "signing_stage"=>1,
       //   "passed_lease_stage"=>9,
       //   "activation_stage"=>3,
       //   "onboarding_stage"=>1}}
          console.log(result.rows);
      });
    });

  	// Application routes ======================================================
  	app.get('/*', function(req, res) {
      res.sendfile('index.html', {'root': './public/views/'});
    });
  };

}());