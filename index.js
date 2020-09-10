const fs = require('fs');
const axios = require('axios');

// const levels = {
//   'Débutant': 1,
//   'Intermédiaire': 2,
//   'Avancé': 3,
//   Courant: 4,
//   'Langue maternelle': 5,
// };

const transform = async (input) => {

  let o = input;

  o.adress = {
    zipCode: o.zipCode,
    street: o.street,
    city: o.city,
    country: o.country,
  };

  o.dob = "2008-05-20T10:36:37.747Z";

  o['certificates'][0]['certificate'] = o['certificates'][0]['certificate']['title']

  o['certificates'][0]['type'] = o['certificates'][0]['certificateType']['title']

  let  lastIn;

  // console.log(o['experiences'].length);

  delete o.zipCode;
  delete o.street;
  delete o.city;
  delete o.country;
  delete o.birthday;
  delete o['certificates'][0]['certificateType'];

  for(let i=0; i<=o['experiences'].length; i++) {

    lastIn = o['experiences'][i]['job']['id'];

    o.experiences[i]['jobId'] = lastIn;

    delete o['experiences'][i]['job'];

    return o;
};
};

(async () => {
  const inStr = fs.readFileSync('./in.json', 'UTF-8');
  const jsonIn = JSON.parse(inStr);
  const output = await transform(jsonIn);
  const outStr = JSON.stringify(output, null, 2);
  fs.writeFileSync('./out.json', outStr);
})();
