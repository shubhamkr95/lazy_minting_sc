const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
 tokenId: {
  type: Number,
  required: true,
  unique: true,
 },
 minPrice: {
  type: Number,
  required: true,
 },
 uri: {
  type: String,
  required: true,
 },
 signature: {
  type: String,
  required: true,
 },
});

const voucherData = mongoose.model("NFT", nftSchema);
module.exports = { voucherData };
