import BrandingItem from "./branding.model.js";

const createBrandingItem = async ({ title, description, externalLink, imageUrl }) => {
  const brandingItem = await BrandingItem.create({
    title,
    description,
    externalLink,
    imageUrl,
  });

  return brandingItem;
};

const listBrandingItems = async () => {
  const items = await BrandingItem.find().sort({ createdAt: -1 });
  return items;
};

export { createBrandingItem, listBrandingItems };
