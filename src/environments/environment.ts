// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDMNHtmgsu2dv9MPmUA_EOrt7vS00PW12M",
    authDomain: "mh-client.firebaseapp.com",
    databaseURL: "https://mh-client.firebaseio.com",
    projectId: "mh-client",
    storageBucket: "mh-client.appspot.com",
    messagingSenderId: "985472354315"
  }
};
