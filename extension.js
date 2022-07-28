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

/*
 * Deficiencies in the gnome-shell extensions framework make it
 * impossible to implement this extension "properly".
 *
 * The problem is that there is no way to distinguish in disable()
 * between when it is called because the extension was disabled or
 * unloaded (e.g., on logout) vs. when the screen is being locked
 * (apparently, gnome-shell disables all extensions when the screen is
 * locked!).
 *
 * The extension should not revert the inhibit_remote_access()
 * function when the screen is locked, but it has to, because it can't
 * tell that disable() is just being called because the screen is
 * being locked.
 *
 * At least for the time being, the extension still _works_, because
 * inhibit_remote_access() gets called before the screen is locked,
 * i.e., before disable() gets called and it gets reverted. But this
 * is undocumented behavior which could change at any time.
 *
 * Furthermore, while I would like to be able to log messages telling
 * the user when remote desktop access while the screen is locked is
 * enabled vs. disabled, because of the issue described above I can't
 * actually do that, at least not without leaving
 * inhibit_remote_access() modified even after disable() is called,
 * which I'm not allowed to do.
 *
 * Perhaps at some point the maintainers of gnome-shell will add
 * functionality giving extensions more visibility into what is going
 * on vis a vis install, uninstall, enable, disable, lock screen,
 * etc., but for the time being the best we can hope for is that the
 * undocumented behavior of when inhibit_remote_access() is called
 * doesn't change.
 */

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
            }
            catch (e) {
                this.orig = null;
            }
        }
    }

    disable() {
        if (this.orig) {
            global.backend.get_remote_access_controller().
                inhibit_remote_access = this.orig;
            this.orig = null;
        }
    }
}

function init() {
    return new Extension();
}
