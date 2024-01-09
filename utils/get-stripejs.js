"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
var stripe_js_1 = require("@stripe/stripe-js");
var stripePromise;
var getStripe = function () {
    if (!stripePromise) {
        stripePromise = (0, stripe_js_1.loadStripe)(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
};
exports.default = getStripe;
