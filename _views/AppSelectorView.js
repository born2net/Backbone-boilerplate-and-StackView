/**
 The Core StackView between different applications offered in the app
 @class AppSelectorView
 @constructor
 @return {object} instantiated AppSelectorView
 **/
define(['jquery', 'backbone', 'StackView'], function ($, Backbone, StackView) {

    Backbone.SERVICES.APP_SELECTOR = 'AppSelectorView';

    var AppSelectorView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            Backbone.StackView.ViewPort.prototype.initialize.call(this);
        },

        events: {
            'click button': function(e){
                var self = this;
                var t = $(e.target).hasClass('fa') ? $(e.target).parent() : e.target;
                var name = $(t).attr('name');
                switch (name){
                    case 'mailWasp': {
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appMailWasp', {trigger: true});
                        break;
                    }
                    case 'everNodes': {
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appEverNodes', {trigger: true});
                        break;
                    }
                }
            }
        }
    });

    return AppSelectorView;
});