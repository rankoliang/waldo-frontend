build:
	bin/dc build
.PHONY: build

rebuild:
	bin/dc down && bin/dc up -d --build
.PHONY: rebuild

restart:
	bin/dc down && bin/dc up -d
.PHONY: restart

up:
	bin/dc up -d
.PHONY: up

down:
	bin/dc down
.PHONY: down
