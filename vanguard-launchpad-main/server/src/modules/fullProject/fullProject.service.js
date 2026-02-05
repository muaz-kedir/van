import FullProject from "./fullProject.model.js";

const createFullProject = async ({ title, description, externalLink, imageUrl }) => {
  const project = await FullProject.create({
    title,
    description,
    externalLink,
    imageUrl,
  });

  return project;
};

const listFullProjects = async () => {
  const items = await FullProject.find().sort({ createdAt: -1 });
  return items;
};

export { createFullProject, listFullProjects };
