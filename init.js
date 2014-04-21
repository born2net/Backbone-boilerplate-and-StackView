/**
 Require js initialization module definition file for StudioLite
 @class Require init js
 **/
require.config({
    waitSeconds: 25,
    baseUrl: '/boilerplate/public/',
    paths: {
        'jquery': '_common/_jquery/std/jq1.9.1/jquery-1.9.1',
        'backbone': '_common/_js/backbone/backbone',
        'backbone.controller': '_common/_js/backbone-controller/backbone.controller',
        'Lib': '_libs/Lib',
        'bootbox': '_common/_js/bootbox/bootbox',
        'Cookie': '_common/_js/cookie/jquery.cookie',
        'ComBroker': '_controllers/ComBroker',
        'XDate': '_common/_js/xdate/xdate',
        'simplestorage': '_common/_js/simplestorage/simpleStorage',
        'underscore': '_common/_js/underscore/underscore',
        'bootstrap': '_common/_js/bootstrap/js/bootstrap',
        'Elements': 'Elements',
        'localizer': '_common/_js/localizer/dist/jquery.localize',
        'LayoutRouter': '_controllers/LayoutRouter',
        'StackView': '_views/StackView',
        'AppAuth': '_controllers/AppAuth',
        'AppContentFaderView': '_views/AppContentFaderView',
        'AppEntryFaderView': '_views/AppEntryFaderView',
        'LoginView': '_views/LoginView',
        'LogoutView': '_views/LogoutView',
        'CampaignManagerView': '_views/CampaignManagerView',
        'ProStudioView': '_views/ProStudioView',
        'CampaignSliderStackView': '_views/CampaignSliderStackView',
        'HelpView': '_views/HelpView',
        'LanguageSelectorView': '_views/LanguageSelectorView',
        'NavigationView': '_views/NavigationView',
        'ResourcesView': '_views/ResourcesView',
        'ScreenLayoutSelectorView': '_views/ScreenLayoutSelectorView',
        'SettingsView': '_views/SettingsView',
        'StationsViewLoader': '_views/StationsViewLoader',
        'WaitView': '_views/WaitView'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.controller': {
            deps: ['underscore', 'jquery']
        },
        'LayoutRouter': {
            deps: ['Elements', 'backbone.controller']
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'Cookie': {
            deps: ['jquery'],
            exports: 'cookie'
        },
        'ComBroker': {
            deps: ['backbone', 'jquery']
        },
        'Elements': {
            exports: 'Elements'
        },
        'bootbox': {
            deps: ['jquery'],
            exports: 'bootbox'
        }
    }
});

require(['App'], function (App) {
    new App();
});