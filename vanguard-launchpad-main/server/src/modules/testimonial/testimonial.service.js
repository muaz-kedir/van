import Testimonial from "./testimonial.model.js";

const createTestimonial = async ({ name, role, testimonial, externalLink, photoUrl }) => {
  const item = await Testimonial.create({
    name,
    role,
    testimonial,
    externalLink,
    photoUrl,
  });

  return item;
};

const listTestimonials = async () => {
  const items = await Testimonial.find().sort({ createdAt: -1 });
  return items;
};

export { createTestimonial, listTestimonials };
