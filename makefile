OUTPUT=lib
SRC=src
NPM=npm

build: 
	rm -rf $(OUTPUT)
	$(NPM) run build-by-makefile
	cp -rf $(SRC)/markdeck $(OUTPUT)

install-local: build
	$(NPM) rm -g markdeck && $(NPM) i -g

serve:
	$(NPM) run serve

deploy: bump build
	$(NPM) publish --access=public

bump:
	git add .
	git commit -m "tend to deploy"
	$(NPM) version patch

.PHONY: build serve deploy bump
