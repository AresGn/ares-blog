import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# À Propos

![Arès GNIMAGNON](/images/image1)

Salut, je suis **Arès GNIMAGNON**, un développeur freelance indépendant diplômé en informatique et télécommunications. Ma passion pour l'esthétique et l'excellence du design me pousse à créer mes propres maquettes UI/UX pour les projets web et mobiles avant d'écrire une seule ligne de code. Cette approche garantit que la fonctionnalité et la beauté évoluent ensemble harmonieusement.

## Qui Je Suis

Je suis un **Développeur Mobile** avec une expertise en **design UI/UX**. Travailler avec moi signifie que l'identité de votre marque est entre de bonnes mains. Chaque projet que j'entreprends est méticuleusement conçu pour refléter vos valeurs et répondre à vos exigences. Je crois que le design ne concerne pas seulement l'apparence, mais aussi la fonctionnalité.

![Arès GNIMAGNON](/images/image2)

Je suis un développeur passionné qui aime résoudre des problèmes complexes et créer des expériences utilisateur exceptionnelles. J'utilise mes compétences pour créer des produits révolutionnaires qui peuvent transformer notre façon de vivre en résolvant des défis concrets. J'explore constamment de nouvelles technologies pour rester en avance dans ce paysage numérique en constante évolution.

## Mon Parcours

Actuellement, j'élargis mon expertise vers la **cybersécurité** et j'ai pour objectif de me spécialiser dans les **tests de pénétration** d'ici quelques années. Cette évolution représente mon engagement à comprendre la technologie sous tous les angles - non seulement construire des applications sécurisées, mais aussi comprendre comment les protéger contre les menaces émergentes.

## Centres d'Intérêt

Quand je ne code pas ou ne conçois pas, vous me trouverez en train de :
- **Écrire des articles de blog tech** - Partager des connaissances et des insights avec la communauté des développeurs
- **Écouter des livres audio** - Apprendre constamment et élargir mes horizons
- **Faire du fitness** - Maintenir un équilibre sain entre l'esprit et le corps

## Connectons-nous

Ce blog est l'endroit où je partage mon parcours, mes insights techniques et mes réflexions sur le monde en constante évolution de la technologie. Que vous soyez ici pour apprendre sur le développement mobile, le design UI/UX ou la cybersécurité, j'espère que vous trouverez de la valeur dans mon contenu.

N'hésitez pas à me contacter si vous souhaitez collaborer ou simplement discuter de technologie !

Cordialement,

**Arès GNIMAGNON**`;

export async function generateMetadata() {
  return {
    title: "À Propos",
    description: "Découvrez Arès GNIMAGNON - Développeur Mobile, Designer UI/UX et futur spécialiste en Cybersécurité du Bénin",
    openGraph: {
      title: "À Propos",
      description: "Découvrez Arès GNIMAGNON - Développeur Mobile, Designer UI/UX et futur spécialiste en Cybersécurité du Bénin",
      images: [
        signOgImageUrl({
          title: "Arès GNIMAGNON",
          label: "À Propos",
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
