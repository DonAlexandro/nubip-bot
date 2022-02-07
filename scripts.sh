dev-build() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
}

dev-start() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
}

dev-down() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
}

prod-build() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
}

prod-start() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
}

prod-down() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
}

runAllTests() {
  commandToExecute="npm run test"

  if [ "$1" = --withCoverage ]; then
    commandToExecute="npm run test:coverage"
  fi

  pushd ./docker/bot || exit 1
  eval "$commandToExecute"
  popd || exit 1

  pushd ./docker/scrapper || exit 1
  eval "$commandToExecute"
  popd || exit 1
}
