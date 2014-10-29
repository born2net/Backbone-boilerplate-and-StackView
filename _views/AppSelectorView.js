/**
 The Core StackView between different applications offered in the app
 @class AppSelectorView
 @constructor
 @return {object} instantiated AppSelectorView
 **/
define(['jquery', 'backbone', 'StackView'], function ($, Backbone, StackView) {

    BB.SERVICES.APP_SELECTOR = 'AppSelectorView';

    var AppSelectorView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_navigationCreated = false;
            Backbone.StackView.ViewPort.prototype.initialize.call(this);
            BB.comBroker.setService(BB.SERVICES.APP_SELECTOR,self);
        },

        events: {
            'click button': function(e){
                var self = this;
                var t = $(e.target).hasClass('fa') ? $(e.target).parent() : e.target;
                var appName = $(t).attr('name');
                switch (appName){
                    case BB.CONSTS.MAILWASP: {
                        BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).navigate('appMailWasp', {trigger: true});
                        break;
                    }
                    case BB.CONSTS.EVERNODES: {
                        BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).navigate('appEverNodes', {trigger: true});
                        break;
                    }
                }
            }
        },

        _loadFileMenu: function(i_appName) {
            var self = this;
            switch (i_appName){
                case BB.CONSTS.MAILWASP: {
                    $(Elements.FILE_NAV_WASP)[0].style.display='';
                    $(Elements.FILE_NAV_EVER).hide();
                    break;
                }
                case BB.CONSTS.EVERNODES: {
                    $(Elements.FILE_NAV_EVER)[0].style.display='';
                    $(Elements.FILE_NAV_WASP).hide();
                    break;
                }
            }
        },

        selectApp: function(i_appName){
            var self = this;
            $(Elements.APP_HEADER_NAME).text(i_appName);
            if (self.m_navigationCreated){
                self._loadFileMenu(i_appName)
                return;
            }
            self.m_navigationCreated = true;
            $(Elements.COMMON_FILE_MENU).append($(Elements.FILE_NAV_WASP));
            $(Elements.COMMON_FILE_MENU).append($(Elements.FILE_NAV_EVER));
            self._loadFileMenu(i_appName);
        }
    });

    return AppSelectorView;
});