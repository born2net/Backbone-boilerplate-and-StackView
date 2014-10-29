/**
 EverNodes application controller
 @class EverNodes
 @constructor
 @return {object} instantiated EverNodes
 **/
define(['jquery', 'backbone', 'NavigationViewEverNodes', 'CampaignManagerView', 'ResourcesView', 'StationsViewLoader', 'SettingsView', 'ProStudioView', 'HelpView', 'LogoutView', 'CampaignSliderStackView', 'ScreenLayoutSelectorView', 'XDate', 'LanguageSelectorView'],
        function ($, Backbone, NavigationViewEverNodes, CampaignManagerView, ResourcesView, StationsViewLoader, SettingsView, ProStudioView, HelpView, LogoutView, CampaignSliderStackView, ScreenLayoutSelectorView, XDate, LanguageSelectorView) {

    var EverNodes = Backbone.Controller.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self._initContentPage();
            self._initProperties();
            self._initCampaignWizardPage();
            self._initModal();
            self._initDashBoard();
        },

        /**
         Update the general dashboard with stats
         @method Update
         **/
        _initDashBoard: function () {
        },

        /**
         Use the previously created m_appContentMailWaspFaderView to add list of views including campaign, stations, logout etc
         so navigation can be switched between each content div. Also we create one special view called
         CampaignSliderStackView that it itself is a StackView.Slider that will later allow for Campaign wizard slider animated selections.
         @method _initContentPage
         **/
        _initContentPage: function () {
            var self = this;
            self.m_navigationViewWasp = new NavigationViewEverNodes({
                el: Elements.APP_NAVIGATOR_EVER
            });

            self.m_campaignManagerView = new CampaignManagerView({
                el: Elements.CAMPAIGN_MANAGER_EVER_VIEW
            });

            self.m_campaignSliderStackView = new CampaignSliderStackView({
                el: Elements.CAMPAIGN_SLIDER
            });

            self.m_resourcesView = new ResourcesView({
                el: Elements.RESOURCES_PANEL,
                stackView: self.options.stackView
            });

            self.m_stationsViewLoader = new StationsViewLoader({
                el: Elements.STATIONS_PANEL,
                stackView: self.options.stackView
            });

            self.m_settingsView = new SettingsView({
                el: Elements.SETTINGS_PANEL,
                stackView: self.options.stackView
            });

            self.m_proStudioView = new ProStudioView({
                el: Elements.PRO_STUDIO_PANEL,
                stackView: self.options.stackView
            });

            self.m_helpView = new HelpView({
                el: Elements.HELP_PANEL,
                stackView: self.options.stackView
            });

            self.m_logoutView = new LogoutView({
                el: Elements.LOGOUT_PANEL,
                stackView: self.options.stackView
            });

            self.options.stackView.addView(this.m_campaignManagerView);
            self.options.stackView.addView(this.m_resourcesView);
            self.options.stackView.addView(this.m_stationsViewLoader);
            self.options.stackView.addView(this.m_settingsView);
            self.options.stackView.addView(this.m_proStudioView);
            self.options.stackView.addView(this.m_helpView);
            self.options.stackView.addView(this.m_logoutView);
            self.options.stackView.selectView(this.m_campaignManagerView);

            BB.comBroker.setService(BB.SERVICES['NAVIGATION_VIEW'], this.m_navigationViewWasp);
        },

        /**
         Create properties panel view
         @method _initProperties
         **/
        _initProperties: function () {
            require(['PropertiesView'], function (PropertiesView) {
                this.m_propertiesView = new PropertiesView({
                    el: Elements.PROP_PANEL,
                    duration: 300
                });
                this.m_emptyPropView = new BB.View({
                    el: Elements.EMPTY_PROPERTIES
                });
                self.m_propertiesView.addView(this.m_emptyPropView);
                self.m_propertiesView.selectView(this.m_emptyPropView);
            });
        },

        /**
         Use the previously created CampaignSliderStackView to add new views to it for campaign wizard slider animation which include
         CampaignSelector, Screen Orientation, Screen Resolution and Campaign
         @method _initCampaignWizardPage
         **/
        _initCampaignWizardPage: function () {
            var self = this;

            require(['CampaignSelectorView', 'OrientationSelectorView', 'ResolutionSelectorView', 'CampaignNameSelectorView' ], function (CampaignSelectorView, OrientationSelectorView, ResolutionSelectorView, CampaignNameSelectorView) {

                self.m_campaignSelectorView = new CampaignSelectorView({
                    stackView: self.m_campaignSliderStackView,
                    from: Elements.CAMPAIGN,
                    el: Elements.CAMPAIGN_SELECTOR_EVER,
                    to: Elements.CAMPAIGN_NAME_SELECTOR_VIEW
                });
                BB.comBroker.setService(BB.SERVICES.CAMPAIGN_SELECTOR_EVER, self.m_campaignSelectorView);

                self.m_campaignNameSelectorView = new CampaignNameSelectorView({
                    stackView: self.m_campaignSliderStackView,
                    from: Elements.CAMPAIGN_SELECTOR_EVER,
                    el: Elements.CAMPAIGN_NAME_SELECTOR_VIEW,
                    to: Elements.ORIENTATION_SELECTOR
                });
                BB.comBroker.setService(BB.SERVICES.CAMPAIGN_NAME_SELECTOR_VIEW, self.m_campaignNameSelectorView);

                self.m_orientationSelectorView = new OrientationSelectorView({
                    stackView: self.m_campaignSliderStackView,
                    from: Elements.CAMPAIGN_NAME_SELECTOR_VIEW,
                    el: Elements.ORIENTATION_SELECTOR,
                    to: Elements.RESOLUTION_SELECTOR,
                    model: new BB.Model({screenOrientation: null})
                });
                BB.comBroker.setService(BB.SERVICES.ORIENTATION_SELECTOR_VIEW, self.m_orientationSelectorView);

                self.m_resolutionSelectorView = new ResolutionSelectorView({
                    stackView: self.m_campaignSliderStackView,
                    from: Elements.ORIENTATION_SELECTOR,
                    el: Elements.RESOLUTION_SELECTOR,
                    to: Elements.SCREEN_LAYOUT_SELECTOR,
                    model: new BB.Model({screenResolution: null})
                });
                BB.comBroker.setService(BB.SERVICES.RESOLUTION_SELECTOR_VIEW, self.m_resolutionSelectorView);

                self.m_screenLayoutSelectorView = new ScreenLayoutSelectorView({
                    stackView: self.m_campaignSliderStackView,
                    from: Elements.RESOLUTION_SELECTOR,
                    el: Elements.SCREEN_LAYOUT_SELECTOR,
                    to: Elements.CAMPAIGN,
                    model: new BB.Model({screenLayout: null})
                });
                BB.comBroker.setService(BB.SERVICES.SCREEN_LAYOUT_SELECTOR_VIEW, self.m_screenLayoutSelectorView);

                self.m_campaignSliderStackView.addView(self.m_campaignSelectorView);
                self.m_campaignSliderStackView.addView(self.m_campaignNameSelectorView);
                self.m_campaignSliderStackView.addView(self.m_orientationSelectorView);
                self.m_campaignSliderStackView.addView(self.m_resolutionSelectorView);
                self.m_campaignSliderStackView.addView(self.m_screenLayoutSelectorView);
                self.m_campaignSliderStackView.selectView(self.m_campaignSelectorView);
            });

            // this.m_appEntryFaderView.selectView(this.m_appSelectorView);
        },



        /**
         Create a popup modal view that's used for About Us and properties content on small screens
         @method _initModal
         **/
        _initModal: function () {
            var self = this;
            require(['PopModalView'], function (PopModalView) {
                var popModalView = new PopModalView({
                    el: Elements.POP_MODAL,
                    animation: 'slide_top', //or 'fade'
                    bgColor: 'white'
                });
                self.m_popUpProperties = new BB.View({el: Elements.POPUP_PROPERTIES});
                popModalView.addView(self.m_popUpProperties);

                self.m_popUpAboutUs = new BB.View({el: Elements.ABOUT_US});
                popModalView.addView(self.m_popUpAboutUs);

                self.m_popUpWait = new BB.View({el: Elements.STACK_WAIT_MODAL_VIEW});
                popModalView.addView(self.m_popUpWait);
                BB.comBroker.setService(BB.SERVICES.POP_MODAL_VIEW, popModalView);
            });
        }

    });

    return EverNodes;
});