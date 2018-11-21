import firebase from "firebase";

function _deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}

var config = {
  apiKey: "AIzaSyBs8FLOO1B_Tq_cjMFDdX5zlhlUtezW-8M",
  authDomain: "ts-turven.firebaseapp.com",
  databaseURL: "https://ts-turven.firebaseio.com",
  projectId: "ts-turven",
  storageBucket: "ts-turven.appspot.com",
  messagingSenderId: "270263943590"
};
firebase.initializeApp(config);

export default class DataStore {
  static data = [
    {
      key: "a001",
      title: "At Home",
      items: [
        { title: "Bikes", count: 1 },
        { title: "Cars", count: 5 },
        { title: "Pedestrians", count: 20 }
      ]
    },
    {
      key: "b002",
      title: "On The Bus",
      items: [
        { title: "Bored People", count: 5 },
        { title: "Happy People", count: 9 },
        { title: "Smartphone People", count: 20 }
      ]
    },
    {
      key: "c003",
      title: "At Work",
      items: [
        { title: "Meetings", count: 5 },
        { title: "Compliments", count: 1 },
        { title: "Complaints", count: 100 }
      ]
    }
  ];

  static async getLocations() {
    const db = firebase.database();
    const locations = await db.ref("locations").once("value");
    return locations;
  }

  static async getLocation(key) {
    const db = firebase.database();
    const dbKey = `locations/${key}`;
    const location = await db.ref(dbKey).once("value");
    return Object.assign({ key }, location.val());
  }

  static async increaseCount(locationKey, item) {
    const db = firebase.database();
    const dbKey = `locations/${locationKey}/items/${item.key}`;
    await db.ref(dbKey).update({ count: item.count + 1 });
    return await this.getLocation(locationKey);
  }

  static setCount(locationKey, itemIndex, newCount) {
    const locationIndex = DataStore.data.findIndex(
      location => location.key === locationKey
    );
    const location = _deepClone(DataStore.data[locationIndex]);
    location.items[itemIndex].count = newCount;
    DataStore.data[locationIndex] = location;
    return location;
  }

  static addLocation({ key, title, items }) {
    DataStore.data = _deepClone(DataStore.data);
    const newLocation = { key, title, items };
    DataStore.data.push(newLocation);
    return DataStore.data;
  }
}
