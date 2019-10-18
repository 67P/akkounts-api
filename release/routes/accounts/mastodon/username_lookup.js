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
class MastodonUsernameLookupRoute extends base_1.default {
    constructor() { super(); }
    static create(router) {
        router.get('/accounts/mastodon/username_lookup', (req, res) => {
            new MastodonUsernameLookupRoute().lookup(req, res);
        });
    }
    lookup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.query.q;
            if (typeof username !== 'string') {
                return res.status(422).json({
                    error: { message: 'Query param "q" must be a string' }
                });
            }
            const axios = this.createMastodonClient();
            axios.get(`/accounts/search?q=${username}`)
                .then(result => {
                const accounts = result.data;
                if (accounts.find(a => a.username.toLowerCase() === username.toLowerCase())) {
                    res.status(200).json({ available: false });
                }
                else {
                    res.status(200).json({ available: true });
                }
            })
                .catch(err => {
                return this.handleError(res, err);
            });
        });
    }
}
exports.default = MastodonUsernameLookupRoute;
//# sourceMappingURL=username_lookup.js.map