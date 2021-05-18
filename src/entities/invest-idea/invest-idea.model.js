'use strict';

const { Schema, model } = require('mongoose');

const ideaSchema = new Schema(
  {
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ['Открыт', 'Закрыт', 'Подготовка'],
      required: true,
    },
    openingPrice: { type: Number, required: true },
    closingPrice: { type: Number, required: true },
    currentPrice: { type: Number, default: this.opeaningPrice },
    priceType: { type: String, enum: ['USD', 'EUR', 'RUB'], required: true },
    investType: { type: String, enum: ['Покупка, Продажа'], required: true },
    openingDate: { type: Date, required: true },
    closingDate: { type: Date, required: true },
    description: { type: String, required: true },
    substantiation: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

module.exports = model('InvestIdea', ideaSchema);
