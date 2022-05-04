import filters from "../../_mock/filters";

export default (_req, res) => {
  res.status(200).json({ filters });
};