/**
 Application router and layout router responsible for kick starting the application as
 well as management for sizing events
 @class LayoutRouter
 @constructor
 @return {Object} instantiated AppRouter
 **/
define(['underscore', 'jquery', 'backbone', 'AppAuth', 'NavigationView', 'AppEntryFaderView', 'LoginView', 'AppContentFaderView', 'WaitView', 'bootbox', 'CampaignManagerView', 'ResourcesView', 'StationsViewLoader', 'SettingsView', 'ProStudioView', 'HelpView', 'LogoutView', 'CampaignSliderStackView', 'ScreenLayoutSelectorView', 'XDate', 'LanguageSelectorView'],
    function (_, $, Backbone, AppAuth, NavigationView, AppEntryFaderView, LoginView, AppContentFaderView, WaitView, Bootbox, CampaignManagerView, ResourcesView, StationsViewLoader, SettingsView, ProStudioView, HelpView, LogoutView, CampaignSliderStackView, ScreenLayoutSelectorView, XDate, LanguageSelectorView) {

    BB.SERVICES.LAYOUT_ROUTER = 'LayoutRouter';

    var LayoutRouter = BB.Router.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], self);
            BB.comBroker.setService('XDATE', new XDate());
            self._initLoginPage();
            self._listenSizeChanges();
            $(window).trigger('resize');
            $('[data-toggle="tooltip"]').tooltip({'placement': 'bottom', 'delay': 1000});
        },

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], self);
            BB.comBroker.setService('XDATE', new XDate());

            self._initLoginPage();
            self._listenSizeChanges();

            $(window).trigger('resize');
            $('[data-toggle="tooltip"]').tooltip({'placement': 'bottom', 'delay': 1000});
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

        /**
         Initiate user credential route authentication
         @method authenticate
         @param {String} i_user
         @param {String} i_pass
         **/
        _routeAuthenticate: function (i_user, i_pass) {
            this.m_appAuth.authenticate(i_user, i_pass);
        },

        /**
         In process of route authentication
         @method authenticating
         **/
        _routeAuthenticating: function () {
            this.m_appEntryFaderView.selectView(this.m_mainAppWaitView);
        },

        /**
         Authentication passed, load app page route
         @method authenticating
         **/
        _routeAuthenticated: function () {
            this.navigate('app', {trigger: true});
        },

        /**
         No authentication passed, load Login page route
         @method authenticating
         **/
        _routeUnauthenticated: function () {
            this.m_appEntryFaderView.selectView(this.m_loginView);
        },

        /**
         Failed user authentication route
         @method authenticationFailed
         **/
        _routeAuthenticationFailed: function () {
            Bootbox.dialog({
                message: $(Elements.MSG_BOOTBOX_WRONG_USER_PASS).text(),
                title: $(Elements.MSG_BOOTBOX_PROBLEM).text(),
                buttons: {
                    danger: {
                        label: $(Elements.MSG_BOOTBOX_OK).text(),
                        className: "btn-danger",
                        callback: function () {
                        }
                    }
                }
            });
            this.m_appEntryFaderView.selectView(this.m_loginView);
        },

        /**
         On successful authentication load main application StackViews per this route App
         @method app
         **/
        _routeApp: function () {
            if (this.m_appAuth.authenticated) {
                this._disableBack();
                this._initContentPage();
                this._initProperties();
                this._initCampaignWizardPage();
                this._initModal();
                this._initDashBoard();
            } else {
                this.navigate('unauthenticated', {trigger: true});
            }
        },

        /**
         Listen to application size changes and lazy update when so
         @method _listenSizeChanges
         **/
        _listenSizeChanges: function () {
            var self = this;
            var lazyLayout = _.debounce(self._updateLayout, 150);
            $(window).resize(lazyLayout);
        },

        /**
         Update key element height changes on size change and notify event subscribers
         @method _updateLayout
         **/
        _updateLayout: function () {
            return;
            var self = BB.comBroker.getService(BB.SERVICES['LAYOUT_ROUTER']);
            var b = $('body');
            self._appHeight = parseInt(b.css('height').replace('px', ''));
            self._appWidth = parseInt(b.css('width').replace('px', ''));
            var h = self._appHeight - 115; // reduce footer
            $(Elements.MAIN_PANEL_WRAP).height(h);

            /*$(Elements.PROP_PANEL_WRAP).height(h);
            $(Elements.APP_NAVIGATOR).height(h);
            $(Elements.RESOURCE_LIB_LIST_WRAP).height(h);
            $(Elements.PRICING_TABLE_WRAP).height(h - 200);
            $(Elements.BLOCK_SUBPROPERTIES).height(h - 200);
            $(Elements.BLOCK_COMMON_PROPERTIES).height(h - 200);
            $(Elements.ADD_NEW_BLOCK_LIST_WRAP).height(h - 100);*/

            BB.comBroker.fire(BB.EVENTS.APP_SIZED, this, null, {width: self._appWidth, height: self._appHeight});
        },

        /**
         Create two StackView views: AppEntryFaderView and AppContentFaderView
         AppEntryFaderView allows for page selection between login page and main app content page
         AppContentFaderView serves as dual purpose view. On one hand it serves as simple show/hide div for  main login page / content page,
         on the other hand it itself is a StackView.Fader that allows for show/hide between main content sections including campaigns,
         stations, resources, settings etc
         @method _initLoginPage
         **/
        _initLoginPage: function () {

            this.m_appAuth = new AppAuth();

            this.m_appEntryFaderView = new AppEntryFaderView({
                el: Elements.APP_ENTRY,
                duration: 500
            });

            this.m_appContentFaderView = new AppContentFaderView({
                el: Elements.APP_CONTENT,
                duration: 650
            });

            this.m_loginView = new LoginView({
                el: Elements.APP_LOGIN
            });

            this.m_mainAppWaitView = new WaitView({
                el: Elements.WAITS_SCREEN_ENTRY_APP
            });

            this.m_logoutView = new BB.View({
                el: Elements.APP_LOGOUT
            });

            this.m_appEntryFaderView.addView(this.m_loginView);
            this.m_appEntryFaderView.addView(this.m_logoutView);
            this.m_appEntryFaderView.addView(this.m_appContentFaderView);
            this.m_appEntryFaderView.addView(this.m_mainAppWaitView);

            BB.comBroker.setService(BB.SERVICES['APP_AUTH'], this.m_appAuth);
            BB.comBroker.setService(BB.SERVICES['APP_ENTRY_FADER_VIEW'], this.m_appEntryFaderView);
            BB.comBroker.setService(BB.SERVICES['APP_CONTENT_FADER_VIEW'], this.m_appContentFaderView);
        }


    });

    return LayoutRouter;
});