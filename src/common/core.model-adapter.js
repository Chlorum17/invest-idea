'use strict';

function genarateModelAdapter(model) {
  return {
    async find(filter, skip, limit, sort) {
      const enities = await model
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort);
      return enities;
    },

    async findOne(filter) {
      const entity = await model.findOne(filter);
      return entity;
    },

    async findById(id) {
      const entity = await model.findById(id);
      return entity;
    },

    async create(docs) {
      const newEntities = await model.create(docs);
      return newEntities;
    },

    async findOneAndUpdate(filter, update) {
      const updatedEntity = await model.findOneAndUpdate(filter, update, {
        new: true,
      });
      return updatedEntity;
    },

    async findByIdAndUpdate(id, update) {
      const updatedEntity = await model.findByIdAndUpdate(id, update, {
        new: true,
      });
      return updatedEntity;
    },
  };
}

module.exports = genarateModelAdapter;
