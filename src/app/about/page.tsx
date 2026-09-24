import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# À propos

![Arès GNIMAGNON](/images/image1)

Je suis **Arès GNIMAGNON**, fondateur et Directeur Général de **[SINDA SARL](https://www.sinda.pro/)**, ingénieur logiciel et pentesteur web en devenir, basé à Godomey, au Bénin.

Je dirige SINDA, groupe d'ingénierie numérique et éditeur SaaS B2B/B2G, et j'écris encore le code. Notre conviction : bâtir les infrastructures numériques dont l'Afrique a vraiment besoin, en commençant par l'éducation.

## Ce que je construis

- **[StageConnect](https://www.stageconnect.app/)** : la gestion des stages pour les universités et les entreprises. Un pilote 2026-2027 est en préparation avec des universités privées du Bénin.
- **[OrientBot](https://orientbot.sinda.pro/)** : un conseiller d'orientation par IA pour les nouveaux bacheliers, avec ses premiers clients payants dès le lancement.
- **[BudgetVox](https://budgetvox-app.sinda.pro/)** : un budget personnel qui se tient à la voix, bientôt en bêta.

Chez M&T Tech, j'ai aussi développé SchooLine, une plateforme de gestion scolaire multi-écoles, et le frontend de M&T Tours. Toutes mes études de cas sont sur **[mon portfolio](https://aresgn.sinda.pro/en)**.

![Arès GNIMAGNON](/images/image2)

## Mon parcours

Licence en informatique et télécommunications à l'INSTI Lokossa, puis développeur mobile (Flutter) et web (Next.js). Je prépare aujourd'hui un **Master 2 en Sécurité des Systèmes d'Information** à PIGIER Bénin : OWASP Top 10, Burp Suite, audit de code. Mon objectif : des produits solides dès leur conception, et savoir les tester comme un attaquant.

## Pourquoi ce blog

J'y partage ce que j'apprends en construisant : développement web et mobile, sécurité applicative, et les coulisses d'une jeune entreprise tech africaine.

## Échangeons

Université, entreprise ou partenaire intéressé par nos produits ? Écrivez-moi depuis **[la page contact du portfolio](https://aresgn.sinda.pro/contact)** ou sur **[LinkedIn](https://bj.linkedin.com/in/ar%C3%A8s-gnimagnon-a239353b8/)**.

**Arès GNIMAGNON**`;

export async function generateMetadata() {
  return {
    title: "À Propos",
    description: "Arès GNIMAGNON, fondateur et Directeur Général de SINDA SARL, ingénieur logiciel et pentesteur web en devenir, au Bénin.",
    openGraph: {
      title: "À Propos",
      description: "Arès GNIMAGNON, fondateur et Directeur Général de SINDA SARL, ingénieur logiciel et pentesteur web en devenir, au Bénin.",
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
