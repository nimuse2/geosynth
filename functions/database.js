//API CALL TO FIREBASE//////////////////////////////
function getData() {
    latLongObj = [];
    xyObj = [];
    xyObj1 = [];
    axios.get(`https://firestore.googleapis.com/v1/projects/geosynth-39a78/databases/(default)/documents/users`)
      .then(response => { 
              response.data.documents.forEach((doc) => {
                latLongObj.push(doc);
              });
  
              latLongObj.forEach((o) => {
                xyObj1.push({ 
                          "name": o.fields.first.stringValue ,
                          "x":lon2x(o.fields.long.doubleValue),
                          "y":lat2y(o.fields.lat.doubleValue)
                });
              });
      })
      .catch(error => { 
              console.log(error); 
      });
  
  }