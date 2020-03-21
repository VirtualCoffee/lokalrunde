import * as functions from 'firebase-functions';
import * as https from 'https';

export const findPlace = functions.https.onRequest(async (request, response) => {
    return new Promise ((resolve, reject) => {
        const key = functions.config().gmaps.key;
        const place =  request.query.search || 'Bierbrunnen';
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&key=${key}&inputtype=textquery&fields=name,geometry,formatted_address,icon,photos`
        
        const req = https.get(url);

        req.on('response', res => {

            res.on('data', (d: any) => {
                response.send(d);
                resolve(res);
            });
        });
        
        req.on('error', err => {
          reject(err);
        });
      }); 
});
