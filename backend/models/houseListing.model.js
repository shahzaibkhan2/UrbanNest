import mongoose, { Schema } from "mongoose";

const houseListingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    normalPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    houseType: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    houseImages: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const HouseListing =
  mongoose.models.HouseListing ||
  mongoose.model("HouseListing", houseListingSchema);

export { HouseListing };
