# Joke Api
[![version][version-img]](.)
[![docker][docker-img]][docker-url]
[![typescript][typescript-img]][typescript-url]
[![license][license-img]](LICENSE)

## Functionality

## Setup Project

The app is fully dockerized and can be started with a predefined docker compose environment:

1. Install [Docker](https://docs.docker.com/docker-for-windows/install/)
2. Open a console and navigate into the cloned *fwe-ws19-20-756891-ha2* repository, where the *docker-compose.yml* file is located
3. Execute the command **docker-compose up**
    - Alternatively on windows you can just start the *startEnv.bat* file

After the console outputs "Server is running on port 80..." the APP is successfully running and listening on port *:80

## License

**BSD 2-Clause License**

Copyright (c) 2019, Darius Dinger<br>
All rights reserved.

<!-- Shields -->
[version-img]: https://img.shields.io/badge/version-1.0.0-red.svg?style=flat-square
[typescript-img]: https://img.shields.io/badge/typescript-3.6.4-green.svg?style=flat-square
[docker-img]: https://img.shields.io/badge/docker--compose-3.0-green.svg?style=flat-square
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square

<!-- Links -->
[typescript-url]: https://www.typescriptlang.org/
[docker-url]: https://docs.docker.com/compose/