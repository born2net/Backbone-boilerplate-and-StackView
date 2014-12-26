/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'socketio'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib, socketio) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {

            /*
            // sample socket connection
            var socket = socketio.connect('https://secure.digitalsignage.com:442');
            socket.on('news', function (data) {
                console.log(data.hello);
                socket.emit('my other event', { my: 'data' });
            });
            */

            window.BB = Backbone;
            BB.globs = {};
            BB.SERVICES = {};
            BB.EVENTS = {};
            BB.LOADING = {};
            BB.CONSTS = {};
            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.globs['RC4KEY'] = '226a3a42f34ddd778ed2c3ba56644315';
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.lib.addBackboneCollectionSave();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;
            $.ajaxSetup({cache: false});
            $.ajaxSetup({
                headers: {'Authorization': 'somePasswordHere'}
            });

            // define applications
            BB.CONSTS.MAILWASP = 'mailWasp';
            BB.CONSTS.EVERNODES = 'everNodes';

            // internationalization
            require(['localizer'], function () {
                var lang = "en";
                var opts = { language: lang, pathPrefix: "./_lang" };
                $("[data-localize]").localize("local", opts);
            });

            // router init
            require(['LayoutRouter'], function (LayoutRouter) {
                var LayoutRouter = new LayoutRouter();
                BB.history.start();
                BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], LayoutRouter);
                LayoutRouter.navigate('authenticate/_/_', {trigger: true});
            })
        }
    });
    return App;
});