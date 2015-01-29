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
        'text': '_common/_js/requirejs/text',
        'backbone.controller': '_common/_js/backbone-controller/backbone.controller',
        'RC4': '_common/_js/rc4/RC4',
        'Lib': '_libs/Lib',
        'bootbox': '_common/_js/bootbox/bootbox',
        'nouislider': '_common/_js/nouislider/jquery.nouislider',
        'platform': '_common/_js/platform/platform',
        'jsencrypt': '_common/_js/encrypts/jsencrypt',
        'gibberish-aes': '_common/_js/encrypts/gibberish-aes',
        'md5': '_common/_js/encrypts/md5',
        'moment': '_common/_js/moment/moment',
        'Cookie': '_common/_js/cookie/jquery.cookie',
        'ComBroker': '_controllers/ComBroker',
        'XDate': '_common/_js/xdate/xdate',
        'simplestorage': '_common/_js/simplestorage/simpleStorage',
        'underscore': '_common/_js/underscore/underscore',
        'bootstrap': '_common/_js/bootstrap/js/bootstrap',
        'socketio': '_common/_js/socketio/socketio',
        'Elements': 'Elements',
        'localizer': '_common/_js/localizer/dist/jquery.localize',
        'LayoutRouter': '_controllers/LayoutRouter',
        'MailWasp': '_controllers/MailWasp',
        'EverNodes': '_controllers/EverNodes',
        'StackView': '_views/StackView',
        'AppAuth': '_controllers/AppAuth',
        'AppContentFaderView': '_views/AppContentFaderView',
        'AppSelectorView': '_views/AppSelectorView',
        'AppEntryFaderView': '_views/AppEntryFaderView',
        'PopModalView': '_views/PopModalView',
        'OrientationSelectorView': '_views/_everNodes/OrientationSelectorView',
        'LoginView': '_views/LoginView',
        'WaitView': '_views/WaitView',
        'PropertiesView': '_views/_everNodes/PropertiesView',
        'LogoutView': '_views/_everNodes/LogoutView',
        'CampaignManagerView': '_views/_everNodes/CampaignManagerView',
        'CampaignSliderStackView': '_views/_everNodes/CampaignSliderStackView',
        'CampaignNameSelectorView': '_views/_everNodes/CampaignNameSelectorView',
        'CampaignSelectorView': '_views/_everNodes/CampaignSelectorView',
        'LanguageSelectorView': '_views/LanguageSelectorView',
        'NavigationViewEverNodes': '_views/_everNodes/NavigationViewEverNodes',
        'ResolutionSelectorView': '_views/_everNodes/ResolutionSelectorView',
        'ResourcesView': '_views/_everNodes/ResourcesView',
        'ProStudioView': '_views/_everNodes/ProStudioView',
        'ScreenLayoutSelectorView': '_views/_everNodes/ScreenLayoutSelectorView',
        'SettingsView': '_views/_everNodes/SettingsView',
        'StationsViewLoader': '_views/_everNodes/StationsViewLoader',
        'HelpView': '_views/_everNodes/HelpView',
        'CampaignManagerWaspView': '_views/_mailWasp/CampaignManagerWaspView',
        'CampaignSliderStackWaspView': '_views/_mailWasp/CampaignSliderStackWaspView',
        'CampaignNameSelectorWaspView': '_views/_mailWasp/CampaignNameSelectorWaspView',
        'CampaignSelectorWaspView': '_views/_mailWasp/CampaignSelectorWaspView',
        'OrientationSelectorWaspView': '_views/_mailWasp/OrientationSelectorWaspView',
        'ResolutionSelectorWaspView': '_views/_mailWasp/ResolutionSelectorWaspView',
        'NavigationWaspView': '_views/_mailWasp/NavigationWaspView',
        'ResourcesWaspView': '_views/_mailWasp/ResourcesWaspView',
        'ScreenLayoutSelectorWaspView': '_views/_mailWasp/ScreenLayoutSelectorWaspView',
        'LogoutWaspView': '_views/_mailWasp/LogoutWaspView'
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
        'socketio': {
            exports: 'socketio'
        },
        'nouislider': {
            exports: 'nouislider'
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
        },
        'RC4': {
            exports: 'RC4'
        },
        'jsencrypt': {
            exports: 'jsencrypt'
        }
    }
});

require(['App'], function (App) {
    new App();
});