import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { wisp } from "@/lib/wisp";

const Page = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, page });
  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <section className="mb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground/70 leading-relaxed font-light tracking-wide">
            {config.blog.metadata.description}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground/40 font-semibold">
              Derniers articles
            </span>
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
          </div>
        </div>
      </section>
      <BlogPostsPreview posts={result.posts} />
      <BlogPostsPagination pagination={result.pagination} />
      <Footer />
    </div>
  );
};

export default Page;
