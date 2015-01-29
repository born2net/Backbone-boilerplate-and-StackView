/**
 Resources view StackView for navigation selection
 @class ResourcesWaspView
 @constructor
 @return {Object} instantiated ResourcesWaspView
 **/
define(['jquery', 'backbone', 'jsencrypt', 'gibberish-aes'], function ($, Backbone, jsencrypt, GibberishAES) {

    var ResourcesWaspView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            // GibberishAES.enc(string, password)
            // Defaults to 256 bit encryption
            GibberishAES.size(128);
            var enc = GibberishAES.enc("This sentence is super secret", "ultra-strong-password");
            var res1 = GibberishAES.dec(enc, "ultra-strong-password");


            self.m_rendered = false;
            self.listenTo(self.options.stackView, BB.EVENTS.SELECTED_STACK_VIEW, function (e) {
                if (e == self)
                    self._render();
            });
            self._listenToSendEncryptedData();
        },

        /**
         Render the ResourceList View
         @method _render
         **/
        _render: function () {
            var self = this;
        },

        /**
         Listen to click and send encrypted data to server.
         1. request a public RSA key from server
         2. generate a random AES password
         3. encrypt the message to be sent to server using the AES password
         4. encrypt the AES password via the RSA server public key
         5. append the RSA encrypted AES password onto the message
         6. send message to server for decruptiona and processing
         @method _listenToSendEncryptedData
         **/
        _listenToSendEncryptedData: function () {
            var self = this;
            var pub = '-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3f7Tc50ZlekGi3omaCX7ZMdAldoYinw1JNb2TaVZfaIuXAZE2C2sarVOvFwiI/71g3+6QP06/zZAXVKlcSZBI7H62k3UPzY1apLgx0Ay/D9/9nsH+gkcmSJx6nkHt4H7ZKqzRjh0///ei+CfkpBelI9K/zbjIK4DbSpE8wbdbEwIDAQAB -----END PUBLIC KEY-----';
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(pub);
            var encrypted = encrypt.encrypt('future support for RSA encryptions ...');
            log(encrypted);
            return;
            $.ajax({
                url: '/ResetQueueCounter',
                data: {
                    business_id: BB.Pepper.getUserData().businessID,
                    line_id: self.m_selectedLineID,
                    counter: 1
                },
                success: function (e) {
                    bootbox.alert('counter was reset successfully');
                },
                error: function (e) {
                    log('error ajax ResetQueueCounter ' + e);
                },
                dataType: 'json'
            });
        }
    });

    return ResourcesWaspView;
});

