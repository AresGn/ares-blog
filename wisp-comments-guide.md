# Guide Complet d'Intégration des Commentaires Wisp pour Next.js

## Introduction et Architecture

L'intégration des commentaires Wisp dans votre blog Next.js va transformer votre site statique en une plateforme interactive où vos lecteurs peuvent engager des discussions. Le système de commentaires Wisp se distingue des solutions tierces traditionnelles par sa légèreté, sa personnalisation complète et son intégration native avec votre CMS.

Contrairement à des solutions comme Disqus qui ajoutent des scripts externes lourds, Wisp vous donne un contrôle total sur l'interface utilisateur tout en conservant les fonctionnalités avancées comme la vérification par email, les réponses imbriquées et la capture d'emails pour votre newsletter.

## Configuration Préalable dans le Dashboard Wisp

Avant de commencer l'implémentation technique, vous devez configurer le système de commentaires depuis votre tableau de bord Wisp. Cette étape est cruciale car elle détermine les fonctionnalités disponibles dans votre interface.

Connectez-vous à votre dashboard Wisp et naviguez vers Account Settings > Comments. Vous y trouverez plusieurs options importantes à configurer selon vos besoins.

L'option "Enable Comments" active le système global. Sans cette activation, vos composants ne pourront pas récupérer ou soumettre des commentaires, même si le code est correctement implémenté.

L'option "Allow URLs" permet aux commentateurs d'ajouter le lien de leur site web. Cette fonctionnalité encourage l'interaction entre blogueurs et peut créer une communauté plus riche autour de votre contenu.

L'option "Allow Nested Comments" active les réponses aux commentaires. Cette fonctionnalité est essentielle pour créer de véritables discussions, car elle permet aux lecteurs de répondre spécifiquement à d'autres commentaires plutôt que seulement au post principal.

Le "Sign-up Message" est particulièrement important pour la croissance de votre audience. Par défaut, Wisp utilise uniquement les emails pour la vérification. Mais si vous ajoutez un message de newsletter, vous pouvez capturer les emails des commentateurs pour votre liste de diffusion, transformant chaque commentaire en opportunité de croissance.

## Étape 1 : Installation des Dépendances Essentielles

L'écosystème de commentaires repose sur plusieurs bibliothèques spécialisées qui travaillent ensemble pour créer une expérience fluide. Commencez par installer les dépendances principales :

```bash
npm install @hookform/resolvers @tanstack/react-query react-hook-form zod
```

Comprenons le rôle de chaque dépendance dans notre architecture. Zod agit comme un gardien pour vos données, s'assurant que chaque commentaire respecte le format attendu avant même d'être envoyé au serveur. Cette validation côté client améliore l'expérience utilisateur en détectant les erreurs instantanément.

React Hook Form gère efficacement l'état de votre formulaire sans déclencher de re-rendus inutiles. Cette optimisation est cruciale pour maintenir de bonnes performances, surtout si votre page de blog contient d'autres éléments interactifs.

L'adaptateur @hookform/resolvers/zod fait le pont entre ces deux bibliothèques, permettant d'utiliser vos schémas Zod directement avec React Hook Form sans code de liaison supplémentaire.

React Query transforme la gestion des données asynchrones. Il cache automatiquement les commentaires, synchronise les mises à jour en arrière-plan, et peut même implémenter des mises à jour optimistes pour que l'interface réponde instantanément aux actions utilisateur.

## Étape 2 : Configuration des Composants d'Interface

Wisp recommande l'utilisation de shadcn/ui pour créer une interface moderne et accessible. Ces composants sont pré-stylés mais entièrement personnalisables selon votre charte graphique.

Installez les composants nécessaires :

```bash
npx shadcn@latest add button alert checkbox form input textarea toast
```

Chaque composant a un rôle spécifique dans l'expérience utilisateur. Le Button gère l'état de soumission et fournit un feedback visuel. L'Alert affiche le message de vérification email avec une icône claire. Le Checkbox gère le consentement pour l'utilisation de l'email. Les composants Form, Input, et Textarea créent une interface de saisie cohérente avec validation intégrée.

Le composant Toast est particulièrement important car il fournit un feedback non-intrusif pour les erreurs et succès, améliorant considérablement l'expérience utilisateur.

Configurez le Toaster dans votre layout principal :

```tsx
// app/layout.tsx
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

## Étape 3 : Configuration du Client Wisp

Le SDK Wisp fait le pont entre votre application et les services Wisp. Installez-le d'abord :

```bash
npm install @wisp-cms/client
```

Créez un fichier de configuration centralisé dans `lib/wisp.ts` :

```typescript
import { buildWispClient } from "@wisp-cms/client";

export const wisp = buildWispClient({
  blogId: "votre-blog-id", // Remplacez par votre ID depuis la page de setup
});
```

Votre blogId se trouve dans la page de setup de votre dashboard Wisp. Cette configuration centralisée permet de réutiliser le même client dans tous vos composants tout en maintenant une configuration cohérente.

## Étape 4 : Création des Composants de Commentaires

L'architecture des commentaires se compose de trois composants principaux qui collaborent pour créer l'expérience complète.

### CommentSection - Le Composant Principal

Ce composant orchestre l'ensemble du système de commentaires. Il récupère les données, gère les états de chargement, et affiche les sous-composants appropriés :

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { wisp } from "@/lib/wisp";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

interface CommentSectionProps {
  slug: string;
}

export function CommentSection({ slug }: CommentSectionProps) {
  // Récupération des commentaires avec mise en cache automatique
  const { data, isLoading } = useQuery({
    queryKey: ["comments", slug], // Clé unique pour le cache
    queryFn: () => wisp.getComments({ slug, page: 1, limit: "all" }),
  });

  // Gestion de l'état de chargement
  if (isLoading) {
    return <div className="animate-pulse">Chargement des commentaires...</div>;
  }

  // Vérification que les commentaires sont activés
  if (!data?.config.enabled) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section>
        <h2 className="mb-8 text-2xl font-bold tracking-tight">
          Ajouter un commentaire
        </h2>
        <CommentForm slug={slug} config={data.config} />
      </section>
      
      <section>
        <h2 className="mb-8 mt-16 text-2xl font-bold tracking-tight">
          Commentaires ({data.pagination.totalComments})
        </h2>
        <CommentList
          comments={data.comments}
          pagination={data.pagination}
          config={data.config}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
}
```

### CommentForm - Le Formulaire de Saisie

Ce composant gère la saisie et validation des nouveaux commentaires. Il s'adapte dynamiquement à la configuration de votre dashboard :

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { wisp } from "@/lib/wisp";

// Schéma de validation dynamique
const createFormSchema = (allowUrls: boolean) => z.object({
  author: z.string().min(1, "Le nom est requis").max(50, "Le nom est trop long"),
  email: z.string().email("Adresse email invalide"),
  url: allowUrls 
    ? z.union([z.string().url("Veuillez entrer une URL valide"), z.string().max(0)])
        .optional()
    : z.string().optional(),
  content: z.string()
    .min(1, "Le commentaire ne peut pas être vide")
    .max(1000, "Le commentaire est trop long"),
  allowEmailUsage: z.boolean(),
});

interface CommentFormProps {
  slug: string;
  config: {
    enabled: boolean;
    allowUrls: boolean;
    allowNested: boolean;
    signUpMessage: string | null;
  };
  parentId?: string;
  onSuccess?: () => void;
}

export function CommentForm({ slug, config, parentId, onSuccess }: CommentFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Schéma adaptatif selon la configuration
  const formSchema = createFormSchema(config.allowUrls);
  type FormValues = z.infer<typeof formSchema>;

  // Mutation pour créer un commentaire
  const { mutateAsync: createComment, data, isPending } = useMutation({
    mutationFn: async (input: FormValues) => {
      return await wisp.createComment({
        ...input,
        slug,
        parentId,
      });
    },
    onSuccess: () => {
      // Invalide le cache pour déclencher une mise à jour
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
      if (onSuccess) onSuccess();
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      email: "",
      url: "",
      content: "",
      allowEmailUsage: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createComment(values);
      form.reset();
      toast({
        title: "Commentaire soumis !",
        description: "Vérifiez votre email pour confirmer votre commentaire.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  // Affichage du message de vérification après soumission
  if (data?.success) {
    return (
      <Alert className="bg-muted border-none">
        <AlertDescription className="space-y-2 text-center">
          <Shield className="text-muted-foreground mx-auto h-10 w-10" />
          <div className="font-medium">Vérification email en cours</div>
          <div className="text-muted-foreground m-auto max-w-lg text-balance text-sm">
            Merci pour votre commentaire ! Veuillez vérifier votre email pour
            confirmer et publier votre commentaire. N'oubliez pas de vérifier
            vos spams.
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre nom"
                    {...field}
                    className="focus-visible:ring-inset"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="vous@exemple.com"
                    {...field}
                    className="focus-visible:ring-inset"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {config.allowUrls && (
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site web (optionnel)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://exemple.com"
                    {...field}
                    className="focus-visible:ring-inset"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentaire *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Partagez vos réflexions..."
                  className="min-h-[120px] resize-y focus-visible:ring-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {config.signUpMessage && (
          <FormField
            control={form.control}
            name="allowEmailUsage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    {config.signUpMessage}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        )}

        <div className="flex items-center justify-between pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Envoi en cours..." : "Publier le commentaire"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

### CommentList - L'Affichage des Commentaires

Ce composant gère l'affichage des commentaires avec support des réponses imbriquées :

```tsx
"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommentForm } from "./CommentForm";
import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
  url?: string | null;
  createdAt: string;
  parent?: {
    id: string;
    author: string;
    content: string;
    url?: string | null;
    createdAt: string;
  } | null;
}

interface CommentListProps {
  comments: Comment[];
  pagination: {
    page: number;
    limit: number | "all";
    totalPages: number;
    totalComments: number;
  };
  config: {
    enabled: boolean;
    allowUrls: boolean;
    allowNested: boolean;
  };
  isLoading?: boolean;
}

export function CommentList({ comments, config, isLoading }: CommentListProps) {
  const [replyToId, setReplyToId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-8 border rounded-lg">
        <p className="text-lg">Aucun commentaire pour le moment.</p>
        <p className="text-sm mt-2">Soyez le premier à commenter !</p>
      </div>
    );
  }

  const handleReplyToggle = (commentId: string) => {
    setReplyToId(replyToId === commentId ? null : commentId);
  };

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <article key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
          {/* Commentaire parent affiché si c'est une réponse */}
          {comment.parent && (
            <div className="mb-4 ml-4 border-l-2 border-blue-100 pl-4 bg-blue-50/30 rounded-r">
              <div className="text-sm text-muted-foreground mb-1">
                En réponse à {comment.parent.author}
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                {comment.parent.content}
              </div>
            </div>
          )}

          {/* En-tête du commentaire */}
          <header className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {config.allowUrls && comment.url ? (
                <Link 
                  href={comment.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {comment.author}
                </Link>
              ) : (
                <span className="font-medium text-gray-900">
                  {comment.author}
                </span>
              )}
            </div>
            
            <time className="text-sm text-muted-foreground">
              {format(new Date(comment.createdAt), "d MMMM yyyy 'à' HH:mm", {
                locale: fr
              })}
            </time>
          </header>

          {/* Contenu du commentaire */}
          <div className="prose prose-sm max-w-none mb-3">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {comment.content}
            </p>
          </div>

          {/* Actions du commentaire */}
          {config.allowNested && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReplyToggle(comment.id)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {replyToId === comment.id ? "Annuler" : "Répondre"}
              </Button>
            </div>
          )}

          {/* Formulaire de réponse */}
          {replyToId === comment.id && config.allowNested && (
            <div className="mt-4 ml-4 border-l-2 border-gray-200 pl-4">
              <CommentForm
                slug={comment.id} // Vous devrez passer le slug depuis le composant parent
                config={config}
                parentId={comment.id}
                onSuccess={() => setReplyToId(null)}
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
```

## Étape 5 : Configuration de React Query

React Query nécessite un provider pour fonctionner. Créez un composant provider personnalisé :

```tsx
// components/Providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Création d'une instance unique de QueryClient
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

Intégrez ce provider dans votre layout principal :

```tsx
// app/layout.tsx
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
```

## Étape 6 : Intégration dans Votre Page de Blog

Ajoutez le système de commentaires à vos pages d'articles de blog. L'intégration dépend de votre structure de routing :

```tsx
// app/blog/[slug]/page.tsx
import { CommentSection } from "@/components/CommentSection";
import { wisp } from "@/lib/wisp";

interface BlogPostProps {
  params: { slug: string };
}

export default async function BlogPost({ params }: BlogPostProps) {
  // Récupération de votre article de blog
  const post = await wisp.getPost({ slug: params.slug });

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* En-tête de l'article */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground">
          Publié le {new Date(post.publishedAt).toLocaleDateString('fr-FR')}
        </div>
      </header>

      {/* Contenu de l'article */}
      <div className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Séparateur visuel */}
      <hr className="my-12 border-gray-200" />

      {/* Section commentaires */}
      <CommentSection slug={params.slug} />
    </article>
  );
}
```

## Optimisations et Bonnes Pratiques

Pour optimiser les performances et l'expérience utilisateur, considérez ces améliorations :

### Lazy Loading des Commentaires

```tsx
import { lazy, Suspense } from 'react';

const CommentSection = lazy(() => import('@/components/CommentSection'));

export default function BlogPost({ params }: BlogPostProps) {
  return (
    <article>
      {/* Contenu de l'article */}
      
      <Suspense fallback={<div>Chargement des commentaires...</div>}>
        <CommentSection slug={params.slug} />
      </Suspense>
    </article>
  );
}
```

### Pagination des Commentaires

```tsx
// Dans CommentSection.tsx
const [page, setPage] = useState(1);
const COMMENTS_PER_PAGE = 10;

const { data, isLoading } = useQuery({
  queryKey: ["comments", slug, page],
  queryFn: () => wisp.getComments({ 
    slug, 
    page, 
    limit: COMMENTS_PER_PAGE 
  }),
});
```

### Gestion des Erreurs Avancée

```tsx
const { mutateAsync: createComment, error } = useMutation({
  mutationFn: createComment,
  onError: (error) => {
    console.error('Erreur lors de la création du commentaire:', error);
    toast({
      title: "Erreur",
      description: "Impossible de publier votre commentaire. Veuillez réessayer.",
      variant: "destructive",
    });
  },
});
```

## Personnalisation Avancée

Vous pouvez personnaliser l'apparence selon votre charte graphique :

### Thème Sombre

```tsx
// Dans vos composants, ajoutez des classes pour le mode sombre
<div className="bg-white dark:bg-gray-900 border dark:border-gray-700">
  <p className="text-gray-900 dark:text-gray-100">
    {comment.content}
  </p>
</div>
```

### Animations Personnalisées

```tsx
// Ajoutez des transitions CSS pour améliorer l'expérience
<div className="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
  {/* Contenu du commentaire */}
</div>
```

## Sécurité et Validation

Le système Wisp inclut plusieurs niveaux de sécurité, mais vous pouvez renforcer la protection :

### Validation Côté Client Renforcée

```tsx
const formSchema = z.object({
  author: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, "Le nom contient des caractères invalides"),
  email: z.string()
    .email("Format d'email invalide")
    .max(100, "L'email est trop long"),
  content: z.string()
    .min(10, "Le commentaire doit contenir au moins 10 caractères")
    .max(2000, "Le commentaire ne peut pas dépasser 2000 caractères")
    .refine(content => !/<script/i.test(content), "Contenu non autorisé"),
});
```

### Détection de Spam Basique

```tsx
const detectSpam = (content: string): boolean => {
  const spamPatterns = [
    /https?:\/\/[^\s]+/gi, // Trop de liens
    /(.)\1{4,}/gi,         // Répétitions excessives
    /buy now|click here|free money/gi // Mots-clés suspects
  ];
  
  return spamPatterns.some(pattern => pattern.test(content));
};
```

Cette architecture complète vous donne un système de commentaires robuste, performant et entièrement personnalisable qui s'intègre parfaitement avec votre blog Wisp existant.
