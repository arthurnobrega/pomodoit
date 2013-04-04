define([], function() {
  var config = {};
  config.apiKey = 'AIzaSyDXs4et9CBGjNdol2aD_TTvPZJ2Luahoi0';
  config.scopes = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/userinfo.profile';
  config.clientId = '936753441485-iau4f9qt2jetemr72inlfkrnp6nuaphi.apps.googleusercontent.com';

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  return config;
});
