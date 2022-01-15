dev-build() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build $1
}

dev-start() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
}

dev-down() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
}

prod-build() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
}

prod-start() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
}

prod-down() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
}
