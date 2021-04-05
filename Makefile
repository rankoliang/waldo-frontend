build:
	bin/dc build
.PHONY: build

prod_restart:
	bin/dc -p down && bin/dc -p up -d --build
.PHONY: prod_restart

prod_up:
	bin/dc -p up -d --build
.PHONY: prod_up

prod_down:
	bin/dc -p down
.PHONY: prod_down

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
