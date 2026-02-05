import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, ExternalLink } from "lucide-react";
import { VideoCard } from "@/components/portfolio/VideoCard";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPublishedVideoProjects,
  fetchBrandingItems,
  fetchFullProjects,
  fetchDesignItems,
  fetchTestimonials,
  type VideoProjectResponse,
  type BrandingItemResponse,
  type FullProjectResponse,
  type DesignItemResponse,
  type TestimonialResponse,
} from "@/lib/api";

const categories = ["All", "Video", "Branding", "Design", "Full Projects", "Testimonials"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const {
    data: videoProjects,
    isLoading: isLoadingVideos,
    isError: isVideoError,
  } = useQuery<VideoProjectResponse[]>({
    queryKey: ["public-video-projects"],
    queryFn: fetchPublishedVideoProjects,
    staleTime: 30_000,
  });

  const shouldShowVideos = activeCategory === "All" || activeCategory === "Video";

  const filteredVideoItems = useMemo(() => {
    if (!shouldShowVideos) {
      return [];
    }

    return (videoProjects ?? []).map((project) => ({
      id: project.id,
      videoId: project.youtubeVideoId,
      title: project.title,
      description: project.description,
    }));
  }, [shouldShowVideos, videoProjects]);

  const showVideoSection = shouldShowVideos && (isLoadingVideos || filteredVideoItems.length > 0);

  const {
    data: brandingItems,
    isLoading: isLoadingBranding,
    isError: isBrandingError,
  } = useQuery<BrandingItemResponse[]>({
    queryKey: ["branding-items"],
    queryFn: fetchBrandingItems,
    staleTime: 30_000,
  });

  const brandingCards = useMemo(
    () =>
      (brandingItems ?? []).map((item) => ({
        id: item.id,
        category: "Branding" as const,
        title: item.title,
        description: item.description ?? "",
        image: item.imageUrl,
        externalLink: item.externalLink,
        createdAt: item.createdAt,
      })),
    [brandingItems],
  );

  const {
    data: fullProjects,
    isLoading: isLoadingFullProjects,
    isError: isFullProjectsError,
  } = useQuery<FullProjectResponse[]>({
    queryKey: ["full-projects"],
    queryFn: fetchFullProjects,
    staleTime: 30_000,
  });

  const fullProjectCards = useMemo(
    () =>
      (fullProjects ?? []).map((item) => ({
        id: item.id,
        category: "Full Projects" as const,
        title: item.title,
        description: item.description ?? "",
        image: item.imageUrl,
        externalLink: item.externalLink,
        createdAt: item.createdAt,
      })),
    [fullProjects],
  );

  const {
    data: designItems,
    isLoading: isLoadingDesign,
    isError: isDesignError,
  } = useQuery<DesignItemResponse[]>({
    queryKey: ["design-items"],
    queryFn: fetchDesignItems,
    staleTime: 30_000,
  });

  const designCards = useMemo(
    () =>
      (designItems ?? []).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description ?? "",
        image: item.imageUrl,
        externalLink: item.externalLink,
        createdAt: item.createdAt,
      })),
    [designItems],
  );

  const {
    data: testimonials,
    isLoading: isLoadingTestimonials,
    isError: isTestimonialsError,
  } = useQuery<TestimonialResponse[]>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
    staleTime: 30_000,
  });

  const showBrandingSection = activeCategory === "All" || activeCategory === "Branding";
  const showDesignSection = activeCategory === "All" || activeCategory === "Design";
  const showFullProjectsSection = activeCategory === "All" || activeCategory === "Full Projects";
  const showTestimonialsSection = activeCategory === "All" || activeCategory === "Testimonials";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Our Work
            </span>
            <h1 className="section-heading mt-3 text-foreground">
              Real Results,{" "}
              <span className="text-gradient">Real Transformations</span>
            </h1>
            <p className="section-subheading mt-4">
              Explore our portfolio of successful projects that have helped
              businesses grow and thrive in the digital space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Portfolio */}
      <section className="py-24 bg-navy">
        <div className="container-wide">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Video Portfolio Grid */}
          {showVideoSection && (
            <>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold text-foreground mb-8"
              >
                Video Projects
              </motion.h3>
              {isLoadingVideos ? (
                <div className="flex items-center gap-3 text-muted-foreground mb-16">
                  <Loader2 className="h-4 w-4 animate-spin" /> Fetching latest video projects...
                </div>
              ) : isVideoError ? (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
                  We couldn't load the latest video projects. Please try again later.
                </div>
              ) : filteredVideoItems.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {filteredVideoItems.map((item, index) => (
                    <VideoCard
                      key={item.id}
                      videoId={item.videoId}
                      title={item.title}
                      description={item.description}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm text-primary">
                  No published video projects yet. Check back soon—our team updates this space regularly.
                </div>
              )}
            </>
          )}

          {/* Full Projects */}
          {showFullProjectsSection && (
            <div className="mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold text-foreground mb-8"
              >
                Full Projects
              </motion.h3>
              {isLoadingFullProjects ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Gathering campaign spotlights...
                </div>
              ) : isFullProjectsError ? (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
                  We couldn't load full project highlights. Please try again later.
                </div>
              ) : fullProjectCards.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {fullProjectCards.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group card-premium overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                            Full Project
                          </span>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                          {item.description && (
                            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-white/20 text-foreground hover:bg-secondary/60"
                          asChild
                        >
                          <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                            View case study
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          Added {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm text-primary">
                  Our full project portfolio is being refreshed. Check back soon for new impact stories.
                </div>
              )}
            </div>
          )}

          {/* Branding Projects */}
          {showBrandingSection && (
            <div className="mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold text-foreground mb-8"
              >
                Branding Showcases
              </motion.h3>
              {isLoadingBranding ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Curating latest branding highlights...
                </div>
              ) : isBrandingError ? (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
                  We couldn't load branding items right now. Please try again later.
                </div>
              ) : brandingCards.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {brandingCards.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group card-premium overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                            Branding
                          </span>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                          {item.description && (
                            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-white/20 text-foreground hover:bg-secondary/60"
                          asChild
                        >
                          <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                            Visit project
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          Added {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm text-primary">
                  Our branding portfolio is being refreshed. Check back soon for new highlights.
                </div>
              )}
            </div>
          )}

          {/* Design Projects */}
          {showDesignSection && (
            <div className="mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold text-foreground mb-8"
              >
                Design Highlights
              </motion.h3>
              {isLoadingDesign ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Curating design highlights...
                </div>
              ) : isDesignError ? (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
                  We couldn't load design highlights right now. Please try again later.
                </div>
              ) : designCards.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {designCards.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group card-premium overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                            Design
                          </span>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                          {item.description && (
                            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                        {item.externalLink && (
                          <Button
                            variant="outline"
                            className="w-full justify-between border-white/20 text-foreground hover:bg-secondary/60"
                            asChild
                          >
                            <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                              View design
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          Added {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm text-primary">
                  Our design gallery is being refreshed. Check back soon for new creative work.
                </div>
              )}
            </div>
          )}

          {/* Testimonials */}
          {showTestimonialsSection && (
            <div className="mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold text-foreground mb-8"
              >
                Client Testimonials
              </motion.h3>
              {isLoadingTestimonials ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Gathering client stories...
                </div>
              ) : isTestimonialsError ? (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
                  We couldn't load testimonials right now. Please try again later.
                </div>
              ) : testimonials && testimonials.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {testimonials.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-primary/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 overflow-hidden rounded-full border border-white/10">
                          <img src={item.photoUrl} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.role}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-foreground/80">“{item.testimonial}”</p>
                      {item.externalLink && (
                        <Button
                          variant="outline"
                          className="mt-4 w-full justify-between border-white/20 text-foreground hover:bg-secondary/60"
                          asChild
                        >
                          <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                            View profile
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm text-primary">
                  Client testimonials are on the way. Check back soon for success stories.
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-4">
              Ready to see results like these for your business?
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
