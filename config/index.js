"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMOUNT_STEP = exports.MAX_AMOUNT = exports.MIN_AMOUNT = exports.CURRENCY = void 0;
exports.CURRENCY = 'gbp';
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
exports.MIN_AMOUNT = 6.0;
exports.MAX_AMOUNT = 60.0;
exports.AMOUNT_STEP = 6.0;
