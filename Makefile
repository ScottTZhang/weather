default: client

SHELL := /bin/bash

.PHONY: client

client:
	@rm -rf public
	@cd client && \
	lineman build
	@mv client/dist public

clean:
	@rm -rf public
