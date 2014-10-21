/**
 Resolution selector used to select new campaign width x height
 @class ResolutionSelectorWaspView
 @constructor
 @return {Object} instantiated ResolutionSelectorWaspView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    BB.SERVICES.RESOLUTION_SELECTOR_VIEW = 'ResolutionSelectorWaspView';
    BB.CONSTS.RESOLUTION = 'RESOLUTION';

    var ResolutionSelectorWaspView = BB.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;

            $(this.el).find(Elements.PREVIOUS).on('click', function (e) {
                if (self.options.from == null)
                    return;
                self.options.stackView.slideToPage(self.options.from, 'left');
                return false;
            });
        },

        /**
         Draw the UI for resolution selection
         @method render
         **/
        render: function () {
        },

        /**
         Set the campaign's screen resolution
         @method setResolution
         @param {Number} i_resolution
         @return {Number} i_resolution
         **/
        setResolution: function(i_resolution){
            return this.model.set(BB.CONSTS.RESOLUTION, i_resolution)
        },

        /**
         Get the campaign's screen resolution
         @method getResolution
         @return {Number} i_resolution
         **/
        getResolution: function(){
            return this.model.get(BB.CONSTS.RESOLUTION)
        }
    });

    return ResolutionSelectorWaspView;

});

