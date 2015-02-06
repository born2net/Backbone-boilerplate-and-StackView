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

        /**
         Send data to server (can be send over https or http since we have an encryption protocol in place)
         @method _sendToServer
         @param {Object} i_data
         **/
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

        /**
         Generate a random string that can be used as a one time password for message sent
         @method _randomPassword
         **/
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
         3. encrypt the message to be sent to server using the AES password (since we cant encrypt large messages with RSA, we have to use the much faster AES)
         4. encrypt the header using RSA with the public key from server, and in it include the AES PASSWORD,
         as add checksum of the entire AES encrypted message so we can confirm on the server side that the message was not tempered with by a "man in the middle"
         5. we also receive an RSA public key version number from the server, so we send it back to the server so it will know which matching private key to pair with the public key we used
         6. we also send a timestamp to the server so it can decided if the message is over let's say, 20-30 seconds old,
         it should ignore it. In the future we should sync the time from server and include it in the message instead of using 'moment' since
         if client and server on diff time zones, current setup would not be sufficient to do time comparisons with.
         7. send message to server for decryption and processing

         @method _listenToSendEncryptedData
         **/
        _listenToSendEncryptedData: function () {
            var self = this;
            $(Elements.SEND_SECURE_MESSAGE).on('click', function () {
                // aes.enc(string, password)
                // Defaults to 256 bit encryption, this size must match whatever you set on server side
                aes.size(128);

                // create a random AES password
                var randomPassword = self._randomPassword();

                // encrypt the message with AES
                var aesMessage = aes.enc($(Elements.SECURE_MESSAGE).val(), randomPassword);

                // create a checksum for our secret message
                var aesMd5CheckSum = md5(aesMessage);

                // get current time
                var now = moment().format("MM-DD-YY_hh:mm:ss");

                // test if AES decryption works
                //var res = aes.dec(aesMessage, randomPassword);

                // get public key and key version from server
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
                        var rsaHeader = rsaEncrypt.encrypt(rsaMessage);

                        // construct the message to be sent to server
                        var data = {
                            message: aesMessage,
                            key: rsaHeader,
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

