require.config({
    baseUrl: './',
    paths: {
        jquery: './lib/jquery',
        jasmine: './lib/jasmine-2.3.4/jasmine',
        "jasmine-html": './lib/jasmine-2.3.4/jasmine-html',
        boot: './lib/jasmine-2.3.4/boot',
        jdbModel: '../source/model'
    },
    shim: {
        'jasmine': {
            exports: 'window.jasmineRequire'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'window.jasmineRequire'
        },
        'boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'window.jasmineRequire'
        },
        jquery:{
        	exports:"$"
        }
    }
});

var specs = [
    './spec/jdb.model.get.spec',
    './spec/jdb.model.set.spec'
];

require(['boot'], function () {
    require(specs, function () {
        window.onload();
    });
});