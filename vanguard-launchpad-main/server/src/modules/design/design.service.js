import DesignItem from "./design.model.js";

const createDesignItem = async ({ title, description, externalLink, imageUrl }) => {
  const item = await DesignItem.create({
    title,
    description,
    externalLink,
    imageUrl,
  });

  return item;
};

const listDesignItems = async () => {
  const items = await DesignItem.find().sort({ createdAt: -1 });
  return items;
};

export { createDesignItem, listDesignItems };
