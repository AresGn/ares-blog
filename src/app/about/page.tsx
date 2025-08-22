import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# About Me

![Arès GNIMAGNON](/images/image1)

Hi, I'm **Arès GNIMAGNON**, an independent freelance developer with a degree in computer science and telecommunications. My passion for aesthetics and design excellence drives me to create my own UI/UX mockups for web and mobile projects before writing a single line of code. This approach ensures that functionality and beauty evolve together harmoniously.

## Who I Am

I am a **Mobile Developer** with expertise in **UI/UX design**. Working with me means your brand identity is in good hands. Each project I undertake is meticulously crafted to reflect your values and meet your requirements. I believe that design is not just about appearance, but also functionality.

![Arès GNIMAGNON](/images/image2)

I am a passionate developer who enjoys solving complex problems and creating exceptional user experiences. I use my skills to create revolutionary products that can transform the way we live by solving concrete challenges. I constantly explore new technologies to stay ahead in this ever-evolving digital landscape.

## My Journey

Currently, I'm expanding my expertise into **cybersecurity** and aim to specialize in **penetration testing** within the next few years. This evolution represents my commitment to understanding technology from all angles - not just building secure applications, but also understanding how to protect them from emerging threats.

## Personal Details

- **Age:** 23
- **Location:** Godomey, Benin
- **Email:** contact@aresgn.tech

## Hobbies & Interests

When I'm not coding or designing, you'll find me:
- **Writing tech blog posts** - Sharing knowledge and insights with the developer community
- **Listening to audiobooks** - Constantly learning and expanding my horizons
- **Fitness** - Maintaining a healthy balance between mind and body

## Let's Connect

This blog is where I share my journey, technical insights, and thoughts on the ever-evolving world of technology. Whether you're here to learn about mobile development, UI/UX design, or cybersecurity, I hope you find value in my content.

Feel free to reach out if you'd like to collaborate or just have a chat about technology!

Best regards,

**Arès GNIMAGNON**`;

export async function generateMetadata() {
  return {
    title: "About Me",
    description: "Learn more about Arès GNIMAGNON - Mobile Developer, UI/UX Designer, and aspiring Cybersecurity Specialist from Benin",
    openGraph: {
      title: "About Me",
      description: "Learn more about Arès GNIMAGNON - Mobile Developer, UI/UX Designer, and aspiring Cybersecurity Specialist from Benin",
      images: [
        signOgImageUrl({
          title: "Arès GNIMAGNON",
          label: "About Me",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
