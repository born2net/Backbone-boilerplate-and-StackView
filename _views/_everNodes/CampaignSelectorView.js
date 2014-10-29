/**
 Campaign selector, class extends Backbone > View and used to select a campaign or create a new one
 @class CampaignSelectorView
 @constructor
 @return {Object} instantiated CampaignSelectorView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    BB.SERVICES.CAMPAIGN_SELECTOR_EVER = 'CampaignSelector';

    var CampaignSelectorView = BB.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_selectedCampaignID = -1;
            self.m_campainProperties = new BB.View({
                el: Elements.CAMPAIGN_PROPERTIES
            });
            self.m_propertiesPanel = BB.comBroker.getService(BB.SERVICES.PROPERTIES_VIEW);
            self.m_propertiesPanel.addView(self.m_campainProperties);

            this._loadCampaignList();
            this._listenOpenProps();
            this._listenSelectCampaign();
            this._listenInputChange();
            this._wireUI();
        },

        /**
         Wire the UI including new campaing creation and delete existing campaign
         @method _wireUI
         **/
        _wireUI: function(){
            var self = this;

            $(Elements.NEW_CAMPAIGN).on('click', function (e) {
                self.options.stackView.slideToPage(self.options.to, 'right');
                return false;
            });

            $(Elements.REMOVE_CAMPAIGN).on('click', function (e) {
                if (self.m_selectedCampaignID != -1) {
                    var selectedElement = self.$el.find('[data-campaignid="' + self.m_selectedCampaignID + '"]');
                    var allCampaignIDs = pepper.getStationCampaignIDs();
                    if (_.indexOf(allCampaignIDs, self.m_selectedCampaignID) == -1) {
                        bootbox.confirm($(Elements.MSG_BOOTBOX_SURE_DELETE_CAMPAIGN).text(), function(result) {
                            if (result==true){
                                selectedElement.remove();
                                self._removeCampaignFromMSDB(self.m_selectedCampaignID);
                            }
                        });
                    } else {
                        bootbox.alert($(Elements.MSG_BOOTBOX_CANT_DELETE_COMP).text());
                        return false;
                    }
                } else {
                    bootbox.alert($(Elements.MSG_BOOTBOX_SELECT_COMP_FIRST).text());
                    return false;
                }
            });
        },

        /**
         Populate the LI with all available campaigns from msdb
         @method _loadCampaignList
         @return none
         **/
        _loadCampaignList: function () {
            var self = this;

            var snippet = '<a href="#" class="' + BB.lib.unclass(Elements.CLASS_CAMPIGN_LIST_ITEM) + ' list-group-item" data-campaignid="1">' +
                '<h4>' + '1' + '</h4>' +
                '<p class="list-group-item-text">play list mode: sequence</p>' +
                '<div class="openProps">' +
                '<button type="button" class="' + BB.lib.unclass(Elements.CLASS_OPEN_PROPS_BUTTON) + ' btn btn-default btn-sm"><i style="font-size: 1.5em" class="fa fa-tasks"></i></button>' +
                '</div>' +
                '</a>';
            $(Elements.CAMPAIGN_SELECTOR_LIST).append($(snippet));
        },

        /**
         Listen select campaign
         @method _listenSelectCampaign
         @return none
         **/
        _listenSelectCampaign: function () {
            var self = this;
            $(Elements.CLASS_CAMPIGN_LIST_ITEM, self.el).on('click', function (e) {
                $(Elements.CLASS_CAMPIGN_LIST_ITEM, self.el).removeClass('active');
                $(this).addClass('active');
                self.m_selectedCampaignID = $(this).data('campaignid');
                var popModalView = BB.comBroker.getService(BB.SERVICES.POP_MODAL_VIEW);
                popModalView.selectView(Elements.ABOUT_US);
                return false;
            });
        },

        /**
         Listen for user trigger on campaign selection and populate the properties panel
         @method _listenOpenProps
         @return none
         **/
        _listenOpenProps: function () {
            var self = this;

            $(Elements.CLASS_OPEN_PROPS_BUTTON, self.el).on('click', function (e) {
                $(Elements.CLASS_CAMPIGN_LIST_ITEM, self.el).removeClass('active');
                var elem = $(e.target).closest('a').addClass('active');
                self.m_selectedCampaignID = $(elem).data('campaignid');
                $(Elements.FORM_CAMPAIGN_NAME).val('Campaign Test1');
                self.m_propertiesPanel.selectView(self.m_campainProperties);
                self.m_propertiesPanel.openPropertiesPanel();
                return false;
            });
        },

        /**
         Remove an entire campaign
         @method removeCampaign
         @return none
         **/
        _removeCampaignFromMSDB: function (i_campaign_id) {
            var self = this;
        },

        /**
         Wire changing of campaign name through campaign properties
         @method _listenInputChange
         @return none
         **/
        _listenInputChange: function () {
            var self = this;
            var onChange = _.debounce(function (e) {
                var text = $(e.target).val();
                self.$el.find('[data-campaignid="' + self.m_selectedCampaignID + '"]').find('h4').text(text);
            }, 333, false);
            $(Elements.FORM_CAMPAIGN_NAME).on("input", onChange);
        }
    });

    return CampaignSelectorView;

});

