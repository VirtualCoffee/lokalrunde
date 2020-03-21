import * as functions from "firebase-functions";

export const findPlace = functions.https.onRequest(
  async (request, response) => {
    const key = functions.config().gmaps.key;
    const place = request.query.search || "Bierbrunnen";
    const path = `/maps/api/place/findplacefromtext/json?input=${place}&key=${key}&inputtype=textquery&fields=name,geometry,formatted_address,icon,photos`;

    const axios = require("axios");

    const instance = axios.create({
      baseURL: "https://maps.googleapis.com"
    });

    instance
      .get(path)
      .then(function(res: any) {
        response.send(res);
        Promise.resolve(res);
      })
      .catch(function(error: any) {
        Promise.reject(error);
      })
      .then(function() {
        // always executed
      });
  }
);
