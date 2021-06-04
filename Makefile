ZIPFILE=allowlockedremotedesktop@kamens.us.shell-extension.zip
CONTENTS=metadata.json extension.js README.md COPYING 

all: $(ZIPFILE)

clean: ; -rm -f $(ZIPFILE) *~ tmp

$(ZIPFILE): $(CONTENTS)
	-rm -f tmp
	mkdir tmp
	gnome-extensions pack --out-dir=tmp \
		$(foreach f,$(CONTENTS),--extra-source=$(f))
	mv tmp/$(ZIPFILE) $(ZIPFILE)
	rmdir tmp
