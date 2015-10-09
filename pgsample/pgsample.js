#!/opt/iojs-v2.0.0-linux-x64/bin/iojs

/////////////////////////////////////////////
//
// sample pg with generators
//
/////////////////////////////////////////////

var co = require('cov2'),
    pg = require('co-pgv2')(require('pg'));

co(function*() {
    var result, statement;
    statement = `SELECT NOW() as "theTime"`;
    result = yield coquery('galaxy', pg, statement);
    console.log(result.rows[0].theTime);
    result = yield coquery('galaxy', pg, statement);
    console.log(result.rows[0].theTime);
    result = yield coquery('galaxy', pg, statement);
    console.log(result.rows[0].theTime);
}).then(function () {
    console.log('done all');
}, function (err) {  // On error
    console.error('Caught error: ', err, err.stack);
});


function coquery* (server, pg, sql, params) {
    var self = this;
    var handle = 'pg://postgres:' + process.env["global_password_from_bashrc"] + '@my.example.server.com:5432/SomeDB';
    try {
        var connResult = yield pg.connectPromise(handle);
    } catch (e) {
        throw new Error('coquery could not open handle to pgsql server ' + server);
    }
    var client = connResult[0];
    var done = connResult[1];
    try {
        var result = yield client.queryPromise(sql, params);
        done();  // Release client back to pool
        return result;
    } catch (ex) {
        done(ex); // Passing truthy val removes connection from pool instead of just releasing it back into the pool.
        throw new Error('coquery err: ' + ex.message);
    }
},