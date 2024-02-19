interface Obj {
  [key: string]: string | number;
}

interface stringObj {
  [key: string]: string;
}

const filterObject = (obj: any) => {
  let newObj: stringObj = {};
  for (const key in obj) {
    if (obj[key] !== "" && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export default filterObject;
