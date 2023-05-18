import { countryToAlpha3 } from "country-to-iso";
function fixit(a) {
  if (a === null || a === "") return 0;
  else return parseInt(a);
}
export const processRadar = async (data, r) => {
  let radardata = [
    {
      taste: "relevance",
    },
    {
      taste: "likelihood",
    },
    {
      taste: "impact",
    },
    {
      taste: "intensity",
    },
  ];
  // console.log(fixit(""));
  let data1 = data.slice(r, r + 5);
  let key = await data1.map((obj) => {
    radardata[0][`${obj.title.substring(0, 20)}...`] =
      (fixit(obj.relevance) * 100) / 10;
    radardata[1][`${obj.title.substring(0, 20)}...`] =
      (fixit(obj.likelihood) * 100) / 5;
    radardata[2][`${obj.title.substring(0, 20)}...`] =
      (fixit(obj.impact) * 100) / 5;
    radardata[3][`${obj.title.substring(0, 20)}...`] =
      (fixit(obj.intensity) * 100) / 100;

    return `${obj.title.substring(0, 20)}...`;
  });
  //   console.log("func", radardata, key);

  return { radardata, key };
};

export const processCalender = (data, prop) => {
  let arr2 = [];

  data.forEach((x) => {
    const inputDate = new Date(x[prop]);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");
    const key = `${year}-${month}-${day}`;

    if (
      arr2.some((val) => {
        return val["day"] === key;
      })
    ) {
      arr2.forEach((k) => {
        if (k["day"] === key) {
          k["value"]++;
        }
      });
    } else {
      let a = {};
      a["day"] = key;
      a["value"] = 1;
      arr2.push(a);
    }
  });

  return arr2;
};
export const processGeo = (data) => {
  let arr2 = [];

  data.forEach((x) => {
    if (x["country"] != "") {
      const key = countryToAlpha3(x["country"]);

      if (
        arr2.some((val) => {
          return val["id"] === key;
        })
      ) {
        arr2.forEach((k) => {
          if (k["id"] === key) {
            k["value"]++;
          }
        });
      } else {
        let a = {};
        a["id"] = key;
        a["value"] = 1;
        arr2.push(a);
      }
    }
  });
  //console.log("geo", arr2);
  return arr2;
};
export const processPie = (data) => {
  let arr2 = [];

  data.forEach((x) => {
    if (x["sector"] != "") {
      const key = x["sector"];

      if (
        arr2.some((val) => {
          return val["id"] === key;
        })
      ) {
        arr2.forEach((k) => {
          if (k["id"] === key) {
            k["value"]++;
          }
        });
      } else {
        let a = {};
        a["id"] = key;
        a["value"] = 1;
        arr2.push(a);
      }
    }
  });
  //console.log("pie", arr2);
  return arr2;
};
export const processBub = (data) => {
  let arr2 = [];

  data.forEach((x) => {
    if (x["insight"] != "") {
      const key = x["insight"];

      if (
        arr2.some((val) => {
          return val["name"] === key;
        })
      ) {
        arr2.forEach((k) => {
          if (k["name"] === key) {
            k["value"]++;
          }
        });
      } else {
        let a = {};
        a["name"] = key;
        a["value"] = 1;
        arr2.push(a);
      }
    }
  });
  let arr3 = {
    name: "root",
    children: arr2,
  };
  //console.log("bub", arr3, arr3.children.length);
  return arr3;
};
export const processTree = (data) => {
  let arr2 = [];

  data.forEach((x) => {
    if (x["topic"] != "") {
      const key = x["topic"];

      if (
        arr2.some((val) => {
          return val["name"] === key;
        })
      ) {
        arr2.forEach((k) => {
          if (k["name"] === key) {
            k["value"]++;
          }
        });
      } else {
        let a = {};
        a["name"] = key;
        a["value"] = 1;
        arr2.push(a);
      }
    }
  });
  let arr3 = {
    name: "Topic",
    children: arr2,
  };
  //console.log("Tree", arr3, arr3.children.length);
  return arr3;
};
export const processBar = (data) => {
  let arr2 = [];

  data.forEach((obj) => {
    let a = {};
    a["title"] = obj.title;
    a["relevance"] = (fixit(obj.relevance) * 100) / 10;
    a["impact"] = (fixit(obj.impact) * 100) / 5;
    a["intensity"] = (fixit(obj.intensity) * 100) / 100;
    a["likelihood"] = (fixit(obj.likelihood) * 100) / 5;

    arr2.push(a);
  });
  return arr2;
};
