# 🎨 Guide de Personnalisation - Blog Wisp CMS

Ce guide vous explique **concrètement** comment personnaliser votre blog Wisp CMS.

## 🎯 **NIVEAU 1 : Configuration de base (OBLIGATOIRE)**

### 1. **Fichier `.env` - Configuration principale**

Créez un fichier `.env` à la racine du projet avec vos propres valeurs :

```bash
# Votre ID de blog Wisp (à obtenir sur wisp.blog)
NEXT_PUBLIC_BLOG_ID=votre_blog_id_ici
NEXT_PUBLIC_BLOG_DISPLAY_NAME="Mon Blog"
NEXT_PUBLIC_BLOG_COPYRIGHT="Votre Nom"
NEXT_DEFAULT_METADATA_DEFAULT_TITLE="Mon Blog Personnel"
NEXT_PUBLIC_BLOG_DESCRIPTION="Description de mon blog"
NEXT_PUBLIC_BASE_URL="https://votre-domaine.com"
```

**⚠️ Important :** Vous devez créer un compte sur [wisp.blog](https://wisp.blog) pour obtenir votre `BLOG_ID`.

## 🎨 **NIVEAU 2 : Personnalisation visuelle (CODE)**

### 2. **Couleurs et thème - `src/app/globals.css`**

Modifiez les variables CSS pour changer les couleurs :

```css
:root {
  --primary: 240 5.9% 10%;        /* Couleur principale */
  --primary-foreground: 0 0% 98%; /* Texte sur couleur principale */
  --background: 0 0% 100%;         /* Arrière-plan */
  --foreground: 240 10% 3.9%;     /* Texte principal */
  /* ... autres couleurs */
}
```

### 3. **Police de caractères - `src/app/layout.tsx`**

Changez la police en remplaçant `Inter` :

```typescript
import { Roboto } from "next/font/google"; // Exemple avec Roboto

const fontSans = Roboto({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["400", "500", "700"]
});
```

## 🏗️ **NIVEAU 3 : Composants personnalisables**

### 4. **Menu de navigation - `src/components/Header.tsx`**

Modifiez le tableau `menuItems` (lignes 20-23) :

```typescript
const menuItems: MenuItem[] = [
  { name: "Accueil", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Portfolio", href: "/portfolio", openInNewTab: true },
];
```

### 5. **Pied de page - `src/components/Footer.tsx`**

Personnalisez le copyright et les liens dans le footer.

### 6. **Page À propos - `src/app/about/page.tsx`**

Remplacez le contenu de la variable `content` (lignes 7-27) par votre propre histoire.

## 📝 **NIVEAU 4 : Personnalisation avancée**

### 7. **Nom du projet - `package.json`**

```json
{
  "name": "mon-blog-personnel",
  "version": "0.1.0",
  // ...
}
```

### 8. **Images et favicon - `public/`**

Remplacez les fichiers dans le dossier `public/` :
- `favicon.ico`
- `next.svg`
- `vercel.svg`
- Ajoutez vos propres images

### 9. **Configuration Tailwind - `tailwind.config.ts`**

Personnalisez les breakpoints, couleurs, et autres configurations Tailwind.

## 🚀 **Étapes de déploiement**

### 1. **Installation**
```bash
npm install --legacy-peer-deps
```

### 2. **Développement**
```bash
npm run dev
```

### 3. **Build de production**
```bash
npm run build
```

### 4. **Déploiement Vercel**
Assurez-vous que la commande d'installation Vercel utilise :
```bash
npm install --legacy-peer-deps
```

## 📋 **Checklist de personnalisation**

- [ ] Créer compte Wisp et obtenir BLOG_ID
- [ ] Configurer le fichier `.env`
- [ ] Modifier la page About avec votre contenu
- [ ] Personnaliser les couleurs dans `globals.css`
- [ ] Changer le menu dans `Header.tsx`
- [ ] Modifier le footer
- [ ] Changer le nom du projet dans `package.json`
- [ ] Remplacer les images dans `public/`
- [ ] Tester en local avec `npm run dev`
- [ ] Faire un build avec `npm run build`
- [ ] Déployer sur Vercel/Netlify

## 🛠️ **Fichiers principaux à modifier**

| Fichier | Description | Priorité |
|---------|-------------|----------|
| `.env` | Configuration de base | ⭐⭐⭐ |
| `src/app/about/page.tsx` | Page À propos | ⭐⭐⭐ |
| `src/components/Header.tsx` | Navigation | ⭐⭐ |
| `src/app/globals.css` | Couleurs et styles | ⭐⭐ |
| `src/components/Footer.tsx` | Pied de page | ⭐ |
| `package.json` | Nom du projet | ⭐ |
| `public/` | Images et favicon | ⭐ |

## 📚 **Ressources utiles**

- [Documentation Wisp](https://wisp.blog/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Next.js](https://nextjs.org/docs)
- [Google Fonts](https://fonts.google.com/)

---

**💡 Conseil :** Commencez par les éléments priorité ⭐⭐⭐, puis progressez vers les personnalisations plus avancées.
