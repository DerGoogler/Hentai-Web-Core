import db from "./db";

function findLinkType(url) {
  return url ? url.replace(/.+?\.([^.]+?)$/gi, "$1") : url;
}

class NSFWElement {
  constructor(url, category) {
    this.url = url;
    this.category = category;
    this.type = findLinkType(url);
    return { url: this.url };
  }
}

class RandomPHUB {
  constructor(unique = false) {
    this.unique = false;
    this.picked = {};

    this.db = db;
    this.type = ["gif"/*, "mp4"*/, "png", "jpg", "jpeg"];
    this.typesByCategorie = {};
    this.categories = Object.keys(db);
    this.totalElements = this.categories.reduce((previous, current) => {
      return previous + db[current].length;
    }, 0);

    //Already picked up
    this.categories.forEach((category) => {
      this.picked[category] = [];
    });

    //all database
    this.db.all = this.categories.reduce((previous, current) => {
      return previous.concat(db[current]);
    }, []);

    //Types by categories
    for (let c of this.categories) {
      for (let t of this.type) {
        const test = this.getRandomInCategory(c, t);
        if (test.url) {
          if (this.typesByCategorie[c]) this.typesByCategorie[c].push(t);
          else this.typesByCategorie[c] = [t];
        }
      }
    }

    this.unique = unique;
  }

  verifyTypeInCategory(type, category) {
    [category, type] = this._checkCategoryType(category, type);
    return this.typesByCategorie[category].includes(type);
  }

  _checkCategoryType(category, type) {
    if (!category) category = this.getRandomCategory();
    if (!this.categories.includes(category)) throw "Unknow category!";

    if (!type) {
      type = this.getRandomType();
      while (!this.verifyTypeInCategory(type, category)) type = this.getRandomType();
    }
    if (!this.type.includes(type)) throw "Unknow type!";

    return [category, type];
  }

  _randomize(obj) {
    return obj[~~(Math.random() * obj.length)];
  }

  getRandomInCategory(category, type) {
    [category, type] = this._checkCategoryType(category, type);

    let nsfw = this.db[category];

    if (type) nsfw = nsfw.filter((url) => findLinkType(url) == type);

    let result = new NSFWElement(this._randomize(nsfw), category);

    if (this.unique) {
      const limit = 500;
      let count = 0;

      while (this.picked[category].includes(result.url) && count < limit) {
        result = new NSFWElement(this._randomize(nsfw), category);
        count++;
      }
      this.picked[category].push(result.url);

      if (this.db[category].length == this.picked[category].length) this.picked[category] = [];
    }

    return result;
  }

  getRandomType() {
    return this._randomize(this.type);
  }

  getRandom(type) {
    return this.getRandomInCategory(this.getRandomCategory(), type);
  }

  getRandomCategory() {
    const categories = JSON.parse(JSON.stringify(this.categories));
    categories.splice(this.categories.indexOf("all"), 1);
    return this._randomize(categories);
  }
}

export default RandomPHUB;
