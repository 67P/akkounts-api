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
class MastodonRegistrationsRoute extends base_1.default {
    constructor() { super(); }
    static create(router) {
        router.post('/accounts/mastodon/registration', (req, res) => {
            new MastodonRegistrationsRoute().signup(req, res);
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            // if (typeof username !== 'string') {
            //   return res.status(422).json({
            //     error: { message: 'Query param "q" must be a string' }
            //   })
            // }
            const axios = this.createMastodonClient();
            axios.post('/accounts', {
                username,
                email,
                password,
                agreement: true,
                locale: 'en'
            })
                .then(result => {
                res.status(200).json(result.data);
            })
                .catch(err => {
                if (err.response.status === 422) {
                    res.status(422).json(err.response.data);
                }
                else {
                    return this.handleError(res, err);
                }
            });
        });
    }
}
exports.default = MastodonRegistrationsRoute;
//# sourceMappingURL=registrations.js.map