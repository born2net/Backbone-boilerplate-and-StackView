/**
 Application router and layout router responsible for kick starting the application as
 well as management for sizing events
 @class LayoutRouter
 @constructor
 @return {Object} instantiated AppRouter
 **/
define(['underscore', 'jquery', 'backbone'], function (_, $, Backbone) {

        BB.SERVICES.LAYOUT_ROUTER = 'LayoutRouter';

        var LayoutRouter = BB.Router.extend({

            /**
             Constructor
             @method initialize
             **/
            initialize: function () {
                log('starting...')
            },

            /**
             Router definition to function maps
             @method routes
             **/
            routes: {
                "app": "_routeApp",
                "authenticate/:user/:pass": "_routeAuthenticate",
                "authenticating": "_routeAuthenticating",
                "authenticated": "_routeAuthenticated",
                "unauthenticated": "_routeUnauthenticated",
                "authenticationFailed": "_routeAuthenticationFailed"
            },

            _routeAuthenticate: function(){
                log('unauthenticated');
            }


        });

        return LayoutRouter;
    });