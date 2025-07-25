const MenuModel = require("../models/MenuModel");

async function createMenu(req, res) {
  try {
    const menu = new MenuModel(req.body);
    const menuStored = await menu.save();

    res.status(200).json(menuStored);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear el menu" });
  }
}

async function getMenus(req, res) {
  try {
    const { active } = req.query;
    let response = null;
    if (active === undefined) {
      response = await MenuModel.find().sort({ order: "asc" });
    } else {
      response = await MenuModel.find({ active }).sort({ order: "asc" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener los menús" });
  }
}

async function updateMenu(req, res) {
  try {
    const { id } = req.params;
    const menuData = req.body;

    await MenuModel.findByIdAndUpdate({ _id: id }, menuData);
    res.status(200).json({ msg: "Se actualizó correctamente el menu" });
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar el menu" });
  }
}

async function deleteMenu(req, res) {
  try {
    const { id } = req.params;

    await MenuModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "Se eliminó correctamente el menu" });
  } catch (error) {
    res.status(400).json({ msg: "Error al eliminar el menu" });
  }
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};
