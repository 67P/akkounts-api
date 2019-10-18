"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const client_1 = require("../../../lib/btcpay/client");
class MastodonInvoicesRoute extends base_1.default {
    constructor() { super(); }
    static create(router) {
        router.post('/accounts/mastodon/invoices', (req, res) => {
            new MastodonInvoicesRoute().create(req, res);
        });
        router.get('/accounts/mastodon/invoices/:invoice_id', (req, res) => {
            new MastodonInvoicesRoute().show(req, res);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, price, currency } = req.body;
            const hookUrl = process.env.BTCPAY_WEBHOOK_HOST
                + '/accounts/mastodon/btcpay_hook'
                + `?token=${process.env.BTCPAY_WEBHOOK_TOKEN}`;
            // TODO validate input
            client_1.default.create_invoice({
                buyerEmail: email,
                price,
                currency,
                transactionSpeed: 'high',
                itemDesc: 'Mastodon account (1 year)',
                itemCode: 'mastodon-signup-donation',
                notificationURL: hookUrl
            })
                .then(invoice => res.status(201).json({ invoice: { id: invoice.id } }))
                .catch(err => this.handleError(res, err));
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoiceId = req.params.invoice_id;
            client_1.default.get_invoice(invoiceId)
                .then(invoice => res.status(200).json({
                id: invoice.id,
                url: invoice.url,
                status: invoice.status
            }))
                .catch(err => this.handleError(res, err));
        });
    }
}
exports.default = MastodonInvoicesRoute;
//# sourceMappingURL=invoices.js.map