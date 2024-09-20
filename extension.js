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

export default class Extension {
  constructor() {}

  enable() {
    // In the normal case this (and the similar `if (! this.orig)` below)
    // should never be necessary since enable should only be called when the
    // extension is not already enabled and disable should only be called when
    // it is enabled.
    // Nevertheless, it has happened before and certainly will happen again
    // that these kinds of methods get called when they shouldn't, so the tiny
    // fraction of a section it takes to check if orig is defined before
    // proceeding is a perfectly acceptable price to pay for the benefit of
    // avoiding exacerbating a bug in GNOME shell if/when one is introduced.
    if (this.orig) return;
    this.orig =
      global.backend.get_remote_access_controller().inhibit_remote_access;
    global.backend.get_remote_access_controller().inhibit_remote_access =
      () => {};
    // Attention extensions.gnome.org reviewers: please stop telling me to
    // remove the log messages here and below. as I've explained repeatedly in
    // response to previous reviews, I believe it is important for security
    // reasons for the user to be aware when this extension is enabled and
    // disabled. These log messages are intentional and well-considered, and
    // they are very low-volume since they only trigger when the screen is
    // locked and unlocked.
    console.log(
      "Remote desktop connections while screen is locked are " + "now ENABLED",
    );
  }

  disable() {
    // Note that this will not be called when the screen is locked because
    // "unlock-dialog" is included in "session-modes" in metadata.json. This
    // is necessary because the whole point of this extension is to allow
    // remote desktop connections when the screen is locked.
    if (!this.orig) return;
    global.backend.get_remote_access_controller().inhibit_remote_access =
      this.orig;
    this.orig = null;
    console.log(
      "Remote desktop connections while screen is locked are " +
        "now DISABLED",
    );
  }
}

function init() {
  return new Extension();
}
