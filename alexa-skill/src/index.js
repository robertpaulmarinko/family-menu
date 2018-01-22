/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const menuItems = [
    { name: "lasagna" },
    { name: "pizza" },
    { name: "ham and tortellini" },
    { name: "mac and cheese" },
    { name: "hot dogs" },
]


const handlers = {
    'LaunchRequest': function () {
        this.emit('GetSuggestion');
    },
    'GetSuggestionIntent': function () {
        this.emit('GetSuggestion');
    },
    'GetMoreIntent': function () {
        this.emit('GetSuggestion');
    },

    'GetSuggestion': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const menuItemIndex = Math.floor(Math.random() * menuItems.length);
        const randomMenuItem = menuItems[menuItemIndex];

        // Create speech output
        const speechOutput = getSuggestionPreText() + randomMenuItem.name;
        // this.emit(':tellWithCard', speechOutput, "Family Menu", randomMenuItem.name);
        this.emit(':askWithCard', speechOutput, speechOutput, "Family Menu", randomMenuItem.name);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};


const getSuggestionPreText = function() {
    const suggestionPreText = [
        "i suggest ",
        "a good choice might be ",
        "how about "
    ];
    
    const itemIndex = Math.floor(Math.random() * menuItems.length);
    return suggestionPreText[itemIndex];
}


exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

