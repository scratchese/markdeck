OUTPUT=lib
SRC=src
NPM=npm

build: 
	rm -rf $(OUTPUT)
	$(NPM) run build-by-makefile
	cp -rf $(SRC)/templates $(OUTPUT)

install-local: build
	$(NPM) rm -g markdeck && $(NPM) i -g

serve:
	$(NPM) run serve

deploy:
	$(NPM) run build
	$(NPM) publish --access=public

.PHONY: build serve deploy
