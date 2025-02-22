/*
 * Copyright 2019, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "vue-require/store/commit",
    "vue-require/websocket/backendcall"
], (commit, backendcall) => {
    "use strict";

    return (context, cb) => {
        backendcall({
            module: "android-launcher/server/calls/appState",
            func: "load"
        }, (err, saved) => {
            if (null !== err) {
                console.error(err);
                return;
            }
            commit(null, "updateStateFromSaved", saved);
            if ("function" === typeof(cb)) {
                cb();
            }
        });
    };
});
