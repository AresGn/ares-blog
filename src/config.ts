const buildConfig = () => {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
  if (!blogId) throw new Error("NEXT_PUBLIC_BLOG_ID is missing");
  const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || "AresNews.";
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "ArèsGN";
  const defaultTitle =
    process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "AresNews - L'info tech avec Arès GNIMAGNON";
  const defaultDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Actualités tech, tutoriels et réflexions d'un développeur passionné.";

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    blog: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${defaultTitle}`,
        },
        description: defaultDescription,
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",
    wisp: {
      blogId,
    },
  };
};

export const config = buildConfig();
