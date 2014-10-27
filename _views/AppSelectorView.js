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
                var name = $(t).attr('name');
                self.selectApp(name);
            }
        },

        selectApp: function(i_appName) {
            var self = this;
            switch (i_appName){
                case 'mailWasp': {
                    $(Elements.FILE_NAV_WASP).show();
                    $(Elements.FILE_NAV_EVER).hide();
                    BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).navigate('appMailWasp', {trigger: true});
                    break;
                }
                case 'everNodes': {
                    $(Elements.FILE_NAV_WASP).hide();
                    $(Elements.FILE_NAV_EVER).show();
                    BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).navigate('appEverNodes', {trigger: true});
                    break;
                }
            }
        },

        createNavigation: function(){
            return;
            var self = this;
            if (self.m_navigationCreated)
                return;
            self.m_navigationCreated = true;
            require(['text!_templates/_templateFileMenus.html'], function (template) {
                $('body').append(template);
                $(Elements.COMMON_FILE_MENU).append($(Elements.FILE_NAV_WASP));
                $(Elements.COMMON_FILE_MENU).append($(Elements.FILE_NAV_EVER));
            });
        }
    });

    return AppSelectorView;
});