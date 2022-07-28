/* extension.js
 *
 * Copyright (c) 2021-2022 Jonathan Kamens <jik@kamens.us>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

class Extension {
    constructor() {
    }

    enable() {
        if (this.orig)
            return;
        this.orig = global.backend.get_remote_access_controller().
            inhibit_remote_access;
        global.backend.get_remote_access_controller().
            inhibit_remote_access = () => {};
        log("Remote desktop connections while screen is locked are " +
            "now ENABLED");
    }

    disable() {
        // Note that this will not be called when the screen is locked because
        // "unlock-dialog" is included in "session-modes" in metada.json. This
        // is necessary because the whole point of this extension is to allow
        // remote desktop connections when the screen is locked.
        if (! this.orig)
            return;
        global.backend.get_remote_access_controller().
            inhibit_remote_access = this.orig;
        this.orig = null;
        log("Remote desktop connections while screen is locked are " +
            "now DISABLED");
    }
}

function init() {
    return new Extension();
}
