export const itemsToArray = val => {
  if (!val) return [];
  val = JSON.parse(JSON.stringify(val));
  return Object.keys(val).map(key => Object.assign({ key }, val[key]));
};
