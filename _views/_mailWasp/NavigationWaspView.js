/**
 File menu / Top navigation control
 @class NavigationWaspView
 @constructor
 @return {Object} instantiated FileMenu
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    BB.SERVICES.NAVIGATION_VIEW = 'NavigationWaspView';

    var NavigationWaspView = BB.View.extend({

        /**
         Constructor
         @method initialize all listeners on all navigation UI buttons
         **/
        initialize: function () {
            var self = this;
            self.m_limitedAccess = false;

            this._render();

            var appContentMailWaspFaderView = BB.comBroker.getService(BB.SERVICES.APP_CONTENT_MAILWASP_FADER_VIEW);
            var appEntryFaderView = BB.comBroker.getService(BB.SERVICES['APP_ENTRY_FADER_VIEW']);

            var appWidth = BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).getAppWidth();
            self._toggleIcons(appWidth);

            BB.comBroker.listen(BB.EVENTS.APP_SIZED, $.proxy(self._onAppResized, self));

            $(Elements.CLASS_CAMPAIG_MANAGER_WASP).on('click', function () {
                appContentMailWaspFaderView.selectView(Elements.CAMPAIGN_MANAGER_WASP_VIEW);
                self.resetPropertiesView();
                self._closeMobileNavigation();
            });

            $(Elements.CLASS_RESOURCES_PANEL_WASP).on('click', function () {
                appContentMailWaspFaderView.selectView(Elements.RESOURCES_PANEL_WASP);
                self.resetPropertiesView();
                self._closeMobileNavigation();
            });

            $(Elements.CLASS_LOGOUT_PANEL).on('click', function () {
                self.resetPropertiesView();
                appEntryFaderView.selectView(Elements.APP_LOGOUT);
                BB.comBroker.getService(BB.SERVICES['APP_AUTH']).logout();
                self._closeMobileNavigation();
            });

            $(Elements.DASHBOARD).on('click', function () {
                self.resetPropertiesView();
            });

            $(Elements.SAVE_CONFIG).on('click', function () {
                self.saveAndRestartPrompt(function () {
                    return false;
                });
            });

            $(Elements.LIVE_CHAT).on('click', function () {
                window.open('http://www.digitalsignage.com/_html/live_chat.html', '_blank');
            });

            $(Elements.LANGUAGE_PROMPT).on('click', function (e) {
                e.stopImmediatePropagation();
                require(['LanguageSelectorView'], function (LanguageSelectorView) {
                    var uniqueID = _.uniqueId('languagePrompt')
                    var modal = bootbox.dialog({
                        message: '<div id="' + uniqueID + '"></div>',
                        title: $(Elements.MSG_BOOTBOX_COSTUME_TITLE).text(),
                        show: false,
                        buttons: {
                            success: {
                                label: $(Elements.MSG_BOOTBOX_CONTINUE).text(),
                                className: "btn-success",
                                callback: function () {
                                    $('#' + uniqueID).empty();
                                }
                            }
                        }
                    });
                    modal.modal("show");
                    self.m_languageSelectionPrompt = new LanguageSelectorView({appendTo: '#' + uniqueID});
                });
            });
        },

        _closeMobileNavigation: function () {
            if ($('.navbar-header .navbar-toggle').css('display') != 'none') {
                $(".navbar-header .navbar-toggle").trigger("click");
            }
        },

        /**
         Action on application resize
         @method _onAppResized
         @param {Event} e
         **/
        _onAppResized: function (e) {
            var self = this;
            self._toggleIcons(e.edata.width)
        },

        /**
         Toggle visibility of navigation icons depending on app total width
         @method _toggleIcons
         @param {Number} i_size
         **/
        _toggleIcons: function (i_size) {
            if (i_size > 1500) {
                $(Elements.CLASS_NAV_ICONS).show();
            } else {
                $(Elements.CLASS_NAV_ICONS).hide();
            }
        },

        _render: function () {
            $('.navbar-nav').css({
                display: 'block'
            })
        },

        /**
         Select one of the navigation UI buttons by triggering a user click event thus allowing for soft navigation
         @method _selectNavigation
         @param {String} elementID
         **/
        _selectNavigation: function (elementID) {
            $(elementID).trigger('click');
        },

        /**
         Reset back to default properties view which is the dashboard
         @method resetPropertiesView
         **/
        resetPropertiesView: function () {
            log('reset some props');
        },

        /**
         Save and serialize configuration to remote mediaSERVER> Save and restart will check if
         the Stations module has been loaded and if no connected stations are present, it will NOT
         prompt for option to restart station on save, otherwise it will.
         @method saveAndRestartPrompt
         @param {Function} call back after save
         **/
        saveAndRestartPrompt: function (i_callBack) {
            var self = this;
            bootbox.dialog({
                message: $(Elements.MSG_BOOTBOX_RESTART_STATIONS).text(),
                title: $(Elements.MSG_BOOTBOX_SAVE_REMOTE_SRV).text(),
                buttons: {
                    success: {
                        label: $(Elements.MSG_BOOTBOX_SAVE).text(),
                        className: "btn-success",
                        callback: function () {
                            self.save(function () {
                            });
                            return
                        }
                    },
                    danger: {
                        label: $(Elements.MSG_BOOTBOX_SAVE_RESTART).text(),
                        className: "btn-success",
                        callback: function () {
                            self.save(function () {
                            });
                            return
                        }
                    },
                    main: {
                        label: $(Elements.MSG_BOOTBOX_CANCEL).text(),
                        callback: function () {
                            return;
                        }
                    }
                }
            });
        },

        /**
         Save config to remote mediaSERVER
         @method save
         @params {Function} i_callBack
         **/
        save: function () {
        }
    });

    return NavigationWaspView;
});

