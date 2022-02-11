devBuild() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
}

devStart() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
}

devDown() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
}

prodBuild() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
}

prodStart() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
}

prodDown() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
}

runAllTests() {
  commandToExecute="npm run test"

  if [ "$1" = --withCoverage ]; then
    commandToExecute="npm run test:coverage"
  fi

  pushd ./docker/bot 1>/dev/null || exit 1
  eval "$commandToExecute"
  popd || exit 1

  pushd ./docker/scrapper 1>/dev/null || exit 1
  eval "$commandToExecute"
  popd || exit 1
}

runAllLinters() {
  commandToExecute="npm run lint"

  pushd ./docker/bot 1>/dev/null || exit 1
  eval "$commandToExecute"
  popd 1>/dev/null || exit 1

  pushd ./docker/scrapper 1>/dev/null || exit 1
  eval "$commandToExecute"
  popd 1>/dev/null || exit 1
}

preCommitPreparation() {
  runAllTests
  npm run format
  runAllLinters
}

generateDocumentation() {
  commandToExecute="npm run doc"

  pushd ./docker/bot 1>/dev/null || exit 1
  eval "$commandToExecute"
  popd 1>/dev/null || exit 1

  pushd ./docker/scrapper 1>/dev/null || exit 1
  eval "$commandToExecute"
  popd 1>/dev/null || exit 1

  echo "Documentation for bot and scrapper successfully generated!"
  echo "You can find it in docs folder in specific directories."
}

