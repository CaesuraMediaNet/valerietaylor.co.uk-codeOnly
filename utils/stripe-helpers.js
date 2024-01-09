"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAmountFromStripe = exports.formatAmountForStripe = exports.formatAmountForDisplay = void 0;
function formatAmountForDisplay(amount, currency) {
    var numberFormat = new Intl.NumberFormat(['en-GB'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    return numberFormat.format(amount);
}
exports.formatAmountForDisplay = formatAmountForDisplay;
function formatAmountForStripe(amount, currency) {
    var numberFormat = new Intl.NumberFormat(['en-GB'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    var parts = numberFormat.formatToParts(amount);
    var zeroDecimalCurrency = true;
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false;
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
exports.formatAmountForStripe = formatAmountForStripe;
function formatAmountFromStripe(amount, currency) {
    var numberFormat = new Intl.NumberFormat(['en-GB'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    var parts = numberFormat.formatToParts(amount);
    var zeroDecimalCurrency = true;
    for (var _i = 0, parts_2 = parts; _i < parts_2.length; _i++) {
        var part = parts_2[_i];
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false;
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount / 100);
}
exports.formatAmountFromStripe = formatAmountFromStripe;
