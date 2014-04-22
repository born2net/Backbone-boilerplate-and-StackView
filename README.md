Backbone / StackView Boilerplate App
====================================
current version: 0.5.1

A backbone boilerplate using Single Page App Skeleton and powered by StackView
-----------------------------------------------------------------------------------------

Working Demo: https://secure.digitalsignage.com/boilerplate/public/index.html

The application is a great way to get up and running quickly with everything one needs for a Single Page Application (SPA).
It takes care of authentication, language selection, SPA views, properties box, popup dialog, popup messages and more.
Component communication is achieved through ComBroker which was developed around the Mediator pattern.

The SAP was designed with Mobile in mind (i.e.: Bootstrap) and will cater itself to the screen size.
For example, on wide screen the properties box will be visible to the right, but if mobile, it will turn into a popup.
Also, if the screen is wide, but not wide enough, the properties box to the right will turn into collapsible widget.

Best of all, the app is powered by StackView which allows you a simple yet effective way to switch between Backbone views.
With StackView you have the power to switch between sliders, popups and Fade Views using smooth animation.
And the great thing is that you don't have to jump through hoops to get it all working nicely together.

To grab the source code and learn more about StackView (The awesome Backbone.View manager) go here:
https://github.com/born2net/StackView

The sample application takes advantage of the following technologies:

 - StackView
 - ComBroker
 - Backbone
 - jQuery
 - Require
 - Cookie
 - Bootstrap
 - Localizer
 - Bootbox
 - LocalStorage
 - and a bit more synthetic sugar

Installation:
------------------------------------------------------------------------
Simply clone the project, unzip to a web server under the directory of: boilerplate/public/[DATA HERE]' and point your browser to index.html file.
If you to change path, be sure to modify init.js startup file.


License:
------------------------------------------------------------------------
- Available under MIT license


