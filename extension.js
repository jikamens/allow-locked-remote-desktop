/* extension.js
 *
 * Copyright (c) 2021 Jonathan Kamens <jik@kamens.us>
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
        if (! this.orig) {
            try {
                this.orig = global.backend.get_remote_access_controller().
                    inhibit_remote_access;
                global.backend.get_remote_access_controller().
                    inhibit_remote_access = () => {};
                log("Remote desktop connections while screen is locked are " +
                    "now ENABLED");
            }
            catch (e) {
                this.orig = null;
            }
        }
    }

    disable() {
        // We want to keep running while locked since the whole point of this
        // extension is to keep allowing remote desktop connections while
        // locked.
        if (Main.sessionMode.isLocked) {
            return;
        }
        if (this.orig) {
            global.backend.get_remote_access_controller().
                inhibit_remote_access = this.orig;
            this.orig = null;
            log("Remote desktop connections while screen is locked are " +
                "now DISABLED");
        }
    }
}

function init() {
    return new Extension();
}
