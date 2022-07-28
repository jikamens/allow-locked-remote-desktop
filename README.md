Allow Locked Remote Desktop GNOME Shell Extension
=================================================

Author: Jonathan Kamens (<jik@kamens.us>)

Currently supported GNOME shell version(s):

* 3.38, 40, 41 on "GNOME41" branch
* 42 on main

[Home page][homepage] [GNOME Shell Extensions page][extpage]

[homepage]: https://github.com/jikamens/allow-locked-remote-desktop
[extpage]: https://extensions.gnome.org/extension/4338/allow-locked-remote-desktop/

Purpose
-------

By default, GNOME shell does not allow remote desktop connections when
the screen is locked. If the screen locks while a remote desktop
session is connected, it is disconnected. If a user attempts to
connect while the screen is locked, the username and password are
accepted but then the connection is closed.

*There are legitimate security concerns* motivating this default
behavior. In particular, if someone is allowed to connect to the
screen remotely and unlock it, then the local computer display is
_also_ unlocked, not just the remote display. Anyone could walk up to
the computer and do whatever they want without the remote user being
able to do anything about it.

However, it is reasonable to allow this restriction to be removed,
i.e., to allow remote connections to locked screens, in contexts where
these security concerns are inapplicable. Unfortunately, GNOME does
not provide a build-in mechanism for removing this restriction. This
extension fixes that.

When this extension is installed and enabled, remote desktop
connections are allowed while the screen is locked. When it is
disabled or uninstalled, they aren't. It's that simple!

Credits
-------
This extension uses the workaround suggested by Elliott Sales de
Andrade [here][workaround].

[workaround]: https://gitlab.gnome.org/GNOME/gnome-shell/-/issues/3212#note_992252

Copyright
---------

Copyright (c) 2021 Jonathan Kamens (<jik@kamens.us>)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

SPDX-License-Identifier: GPL-2.0-or-later
