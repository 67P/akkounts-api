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
const util_1 = require("util");
const base_1 = require("../../base");
const nodemailer_1 = require("../../../lib/nodemailer");
class MastodonBtcPayHookRoute extends base_1.default {
    constructor() { super(); }
    static create(router) {
        router.post('/accounts/mastodon/btcpay_hook', (req, res) => {
            new MastodonBtcPayHookRoute().receive(req, res);
        });
    }
    receive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug('body:', util_1.inspect(req.body));
            console.debug('params:', util_1.inspect(req.query));
            if (req.body.status !== 'confirmed')
                return res.status(200);
            if ((typeof req.query.token !== 'string')
                || (req.query.token !== process.env.BTCPAY_WEBHOOK_TOKEN)) {
                return res.status(401).json({
                    error: { message: 'Unauthorized' }
                });
            }
            const invite = yield this.createInvite();
            const recipient = req.body.buyerFields.buyerEmail;
            const message = this.createMessage(invite.code);
            nodemailer_1.sendMail({
                recipient,
                subject: 'Your invite',
                content: message
            }).then(() => res.status(200))
                .catch(err => this.handleError(res, err));
        });
    }
    createMessage(inviteCode) {
        const inviteUrl = `${process.env.MASTODON_HOST}/invite/${inviteCode}`;
        const message = 'Here\'s your invite link for creating an account on kosmos.social:'
            + `\n\n${inviteUrl}\n\n`
            + 'Thanks a lot for supporting community service providers!';
        return message;
    }
    createInvite() {
        const axios = this.createMastodonClient();
        return axios.post('/invites')
            .then(result => result.data)
            .catch(console.error);
    }
}
exports.default = MastodonBtcPayHookRoute;
//# sourceMappingURL=btcpay_hook.js.map