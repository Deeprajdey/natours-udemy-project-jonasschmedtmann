class APIFeatures {
  constructor(databaseQuery, reqQuery) {
    this.databaseQuery = databaseQuery;
    this.reqQuery = reqQuery;
  }
  filter() {
    const queryObj = { ...this.reqQuery };
    const excluded = ['page', 'sort', 'limit', 'fields'];

    excluded.forEach((ele) => delete queryObj[ele]);
    let queryStr = JSON.stringify(queryObj);
    console.log(queryStr);
    queryStr = queryStr.replace(/\b(lte|gte|lt|gt)\b/g, (match) => `$${match}`);
    this.databaseQuery = this.databaseQuery.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(',').join(' ');
      this.databaseQuery.sort(sortBy);
    } else {
      this.databaseQuery.sort('createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.reqQuery.fields) {
      const fieldBy = this.reqQuery.fields.split(',').join(' ');
      this.databaseQuery.select(fieldBy);
    } else {
      this.databaseQuery.select('-__v');
    }
    return this;
  }
  paginate() {
    if (this.reqQuery.page || this.reqQuery.limit) {
      const page = this.reqQuery.page * 1 || 1;
      const limit = this.reqQuery.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.databaseQuery.skip(skip).limit(limit);
    }
    return this;
  }
}
module.exports = APIFeatures;
