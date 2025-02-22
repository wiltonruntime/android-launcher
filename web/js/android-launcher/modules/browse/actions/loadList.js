/*
 * Copyright 2020, alex at staticlibs.net
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

"use strict";

define([
    "lodash/delay",
    "vue-require/websocket/backendcall",
    "vue-require/store/commit"
], (delay, backendcall, commit) => {
    const module = "browse";

    return (context) => {
        commit(module, "load_began");
        backendcall({
            module: "android-launcher/server/calls/fsOperations",
            func: "listAppsAndLibs"
        }, (err, res) => {
            if (null !== err) {
                console.error(err);
                commit(module, "load_failed", err);
                return;
            }
            delay(() => {
                commit(module, "load_succeeded", res);
            }, 500);
        });
    };
});
