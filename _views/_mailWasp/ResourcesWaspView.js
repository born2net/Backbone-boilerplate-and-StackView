/**
 Resources view StackView for navigation selection
 @class ResourcesWaspView
 @constructor
 @return {Object} instantiated ResourcesWaspView
 **/
define(['jquery', 'backbone', 'jsencrypt', 'gibberish-aes', 'md5', 'moment'], function ($, Backbone, jsencrypt, aes, md5, moment) {

    var ResourcesWaspView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;

            self.m_rendered = false;
            self.listenTo(self.options.stackView, BB.EVENTS.SELECTED_STACK_VIEW, function (e) {
                if (e == self)
                    self._render();
            });

            self._listenToSendEncryptedData();


        },

        _sendToServer: function (i_data) {
            var self = this;

            $.ajax({
                url: 'https://secure.digitalsignage.com:442/setSecureData',
                data: i_data,
                type: "POST",
                dataType: "json",
                success: function (e) {
                    log('done saving...');
                },

                error: function (e) {
                    log('error ajax setSecureData ' + e);
                }
            });

        },

        _randomPassword: function () {
            var self = this;
            var a = (function co(lor) {
                return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
            })('');
            var b = (function co(lor) {
                return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
            })('');
            return a + b;
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
            $(Elements.SEND_SECURE_MESSAGE).on('click', function () {
                // aes.enc(string, password)
                // Defaults to 256 bit encryption
                aes.size(128);

                // create a random AES password
                var randomPassword = self._randomPassword();

                // encrypt the message with AES
                var enc = aes.enc($(Elements.SECURE_MESSAGE).val(), randomPassword);

                // create a checksum for our secret message
                var aesMd5CheckSum = md5(enc);

                // get current time
                var now = moment().format("MM-DD-YY_hh:mm:ss");

                // test if AES decryption works
                //var res = aes.dec(enc, randomPassword);

                // get public key and key version from server
                var rsaPublicKey = '-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3f7Tc50ZlekGi3omaCX7ZMdAldoYinw1JNb2TaVZfaIuXAZE2C2sarVOvFwiI/71g3+6QP06/zZAXVKlcSZBI7H62k3UPzY1apLgx0Ay/D9/9nsH+gkcmSJx6nkHt4H7ZKqzRjh0///ei+CfkpBelI9K/zbjIK4DbSpE8wbdbEwIDAQAB -----END PUBLIC KEY-----';

                $.ajax({
                    url: 'https://secure.digitalsignage.com:442/getPublicKey',
                    data: {},
                    success: function (e) {


                        // create RSA object and set public key
                        var rsaEncrypt = new JSEncrypt();
                        rsaEncrypt.setPublicKey(e.publicKey);

                        // construct our secure message header
                        var rsaMessage = {
                            aesPassword: randomPassword,
                            aesCheckSum: aesMd5CheckSum,
                            time: now
                        };

                        // transform header to a string and RSA encrypt it with public key
                        rsaMessage = JSON.stringify(rsaMessage);
                        var encrypted = rsaEncrypt.encrypt(rsaMessage);

                        // construct the message to be sent to server
                        var data = {
                            message: enc,
                            key: encrypted,
                            rsaKeyVersion: e.version
                        };

                        self._sendToServer(data);
                    },

                    error: function (e) {
                        log('error ajax getPublicKey ' + e);
                    },
                    dataType: 'json'
                });
            });
        }
    });

    return ResourcesWaspView;
});

