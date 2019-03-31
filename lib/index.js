const fs = require('fs');

const fetch = require('node-fetch');

function saveData(data) {
  fs.writeFile('data.json', JSON.stringify(data), saveError => {
    if (saveError) {
      return console.warn(saveError);
    }

    console.warn('\x1b[36m%s\x1b[0m', '☑ Completed');
  });
}

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function fetchData(uriCreator, key) {
  const uri = uriCreator(key);

  try {
    const response = await fetch(uri);
    let json;

    try {
      json = await response.json();
    } catch (toJsonErr) {
      null;
    }

    return {
      key,
      uri,
      status: response.status,
      ...(json && {
        json
      })
    };
  } catch (error) {
    console.warn(error);
  }

  return null;
}

async function tool({
  keys,
  uriCreator,
  delay
}) {
  let responses;

  try {
    if (delay) {
      responses = [];
      const len = keys.length;
      let index = 0;

      for (; index < len; index += 1) {
        const res = await fetchData(uriCreator, keys[index]);
        responses.push(res);
        await wait(delay);
      }
    } else {
      responses = await Promise.all(keys.map(key => fetchData(uriCreator, key)));
    }

    saveData(responses);
  } catch (err) {
    console.warn(err);
  }
}

module.exports = tool;