/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import { existsSync } from "fs";
import { resolve as _resolve, relative } from "path";
import { red } from "react-dev-utils/chalk";
import { sync } from "resolve";
import {
  appPath,
  appNodeModules,
  appSrc,
  appTsConfig,
  appJsConfig
} from "./paths";

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
  const { baseUrl } = options;

  if (!baseUrl) {
    return "";
  }

  const baseUrlResolved = _resolve(appPath, baseUrl);

  // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
  // the default behavior.
  if (relative(appNodeModules, baseUrlResolved) === "") {
    return null;
  }

  // Allow the user set the `baseUrl` to `appSrc`.
  if (relative(appSrc, baseUrlResolved) === "") {
    return [appSrc];
  }

  // If the path is equal to the root directory we ignore it here.
  // We don't want to allow importing from the root directly as source files are
  // not transpiled outside of `src`. We do allow importing them with the
  // absolute path (e.g. `src/Components/Button.js`) but we set that up with
  // an alias.
  if (relative(appPath, baseUrlResolved) === "") {
    return null;
  }

  // Otherwise, throw an error.
  throw new Error(
    red.bold(
      "Your project's `baseUrl` can only be set to `src` or `node_modules`." +
        " Create React App does not support other values at this time."
    )
  );
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
// eslint-disable-next-line consistent-return
function getWebpackAliases(options = {}) {
  const { baseUrl } = options;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = _resolve(appPath, baseUrl);

  if (relative(appPath, baseUrlResolved) === "") {
    return {
      src: appSrc
    };
  }
}

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
// eslint-disable-next-line consistent-return
function getJestAliases(options = {}) {
  const { baseUrl } = options;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = _resolve(appPath, baseUrl);

  if (relative(appPath, baseUrlResolved) === "") {
    return {
      "^src/(.*)$": "<rootDir>/src/$1"
    };
  }
}

function getModules() {
  // Check if TypeScript is setup
  const hasTsConfig = existsSync(appTsConfig);
  const hasJsConfig = existsSync(appJsConfig);

  if (hasTsConfig && hasJsConfig) {
    throw new Error(
      "You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file."
    );
  }

  let config;

  // If there's a tsconfig.json we assume it's a
  // TypeScript project and set up the config
  // based on tsconfig.json
  if (hasTsConfig) {
    // eslint-disable-next-line global-require
    // eslint-disable-next-line import/no-dynamic-require
    const ts = require(sync("typescript", {
      basedir: appNodeModules
    }));
    config = ts.readConfigFile(appTsConfig, ts.sys.readFile).config;
    // Otherwise we'll check if there is jsconfig.json
    // for non TS projects.
  } else if (hasJsConfig) {
    // eslint-disable-next-line global-require
    config = require(appJsConfig);
  }

  config = config || {};
  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  return {
    additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig
  };
}

export default getModules();
