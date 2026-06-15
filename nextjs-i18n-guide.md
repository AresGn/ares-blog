# Guide complet d'internationalisation Next.js (Français ⟷ Anglais)

## 1. Configuration initiale

### Installation des dépendances
```bash
npm install next-i18next react-i18next i18next
# ou
yarn add next-i18next react-i18next i18next
```

### Configuration next-i18next.config.js
Créez un fichier `next-i18next.config.js` à la racine :

```javascript
module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
  },
  react: {
    useSuspense: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
```

### Configuration Next.js
Dans `next.config.js` :

```javascript
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  // autres configurations...
}
```

## 2. Structure des fichiers de traduction

Créez la structure suivante :
```
public/
└── locales/
    ├── fr/
    │   ├── common.json
    │   ├── home.json
    │   └── navigation.json
    └── en/
        ├── common.json
        ├── home.json
        └── navigation.json
```

### Exemples de fichiers de traduction

**public/locales/fr/common.json**
```json
{
  "welcome": "Bienvenue",
  "loading": "Chargement...",
  "error": "Une erreur s'est produite",
  "save": "Enregistrer",
  "cancel": "Annuler",
  "delete": "Supprimer",
  "edit": "Modifier"
}
```

**public/locales/en/common.json**
```json
{
  "welcome": "Welcome",
  "loading": "Loading...",
  "error": "An error occurred",
  "save": "Save",
  "cancel": "Cancel",
  "delete": "Delete",
  "edit": "Edit"
}
```

**public/locales/fr/navigation.json**
```json
{
  "home": "Accueil",
  "about": "À propos",
  "services": "Services",
  "contact": "Contact",
  "language": "Langue"
}
```

**public/locales/en/navigation.json**
```json
{
  "home": "Home",
  "about": "About",
  "services": "Services",
  "contact": "Contact",
  "language": "Language"
}
```

## 3. Configuration du provider

### pages/_app.js
```javascript
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
```

### Pour App Router (app/_app.js si vous utilisez le nouveau système)
```javascript
'use client'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18n'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      </body>
    </html>
  )
}
```

## 4. Utilisation dans les composants

### Hook useTranslation
```javascript
import { useTranslation } from 'next-i18next'

export default function HomePage() {
  const { t } = useTranslation('common')
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('loading')}</p>
    </div>
  )
}

// Obligatoire pour les pages
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  }
}
```

### Composant de navigation avec changement de langue
```javascript
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LanguageSwitcher() {
  const { t } = useTranslation('navigation')
  const router = useRouter()
  const { pathname, asPath, query } = router

  const changeLanguage = (locale) => {
    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <div className="language-switcher">
      <button 
        onClick={() => changeLanguage('fr')}
        className={router.locale === 'fr' ? 'active' : ''}
      >
        Français
      </button>
      <button 
        onClick={() => changeLanguage('en')}
        className={router.locale === 'en' ? 'active' : ''}
      >
        English
      </button>
    </div>
  )
}
```

### Navigation avec traduction
```javascript
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export default function Navigation() {
  const { t } = useTranslation('navigation')

  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/about">{t('about')}</Link>
      <Link href="/services">{t('services')}</Link>
      <Link href="/contact">{t('contact')}</Link>
    </nav>
  )
}
```

## 5. Traductions avec paramètres

### Interpolation simple
```json
// fr/common.json
{
  "greeting": "Bonjour {{name}} !"
}

// en/common.json
{
  "greeting": "Hello {{name}}!"
}
```

```javascript
const { t } = useTranslation('common')
return <h1>{t('greeting', { name: 'Marie' })}</h1>
```

### Pluralisation
```json
// fr/common.json
{
  "itemCount": "{{count}} article",
  "itemCount_plural": "{{count}} articles"
}

// en/common.json
{
  "itemCount": "{{count}} item",
  "itemCount_plural": "{{count}} items"
}
```

```javascript
const { t } = useTranslation('common')
return <p>{t('itemCount', { count: items.length })}</p>
```

## 6. SEO et métadonnées

### Head avec traductions
```javascript
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export default function HomePage() {
  const { t } = useTranslation('home')

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
        <meta property="og:title" content={t('pageTitle')} />
        <meta property="og:description" content={t('pageDescription')} />
      </Head>
      <main>
        {/* Contenu de la page */}
      </main>
    </>
  )
}
```

## 7. Routes localisées

Next.js gère automatiquement les routes avec les locales :
- `/` → français (locale par défaut)
- `/en` → anglais
- `/about` → à propos (français)
- `/en/about` → about (anglais)

### Liens avec locale
```javascript
import Link from 'next/link'
import { useRouter } from 'next/router'

// Lien gardant la locale courante
<Link href="/about">
  <a>{t('about')}</a>
</Link>

// Lien forçant une locale spécifique
<Link href="/about" locale="en">
  <a>About (English)</a>
</Link>
```

## 8. Traductions dynamiques et lazy loading

### Chargement conditionnel
```javascript
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => {
    const { t } = useTranslation('common')
    return <p>{t('loading')}</p>
  }
})
```

### Namespace dynamique
```javascript
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'

export default function DynamicPage() {
  const { t, i18n } = useTranslation()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Charger un namespace dynamiquement
    i18n.loadNamespaces(['dynamic']).then(() => {
      setIsReady(true)
    })
  }, [i18n])

  if (!isReady) return <div>Loading...</div>

  return <div>{t('dynamic:content')}</div>
}
```

## 9. Bonnes pratiques

### Organisation des clés
```json
{
  "buttons": {
    "save": "Enregistrer",
    "cancel": "Annuler",
    "delete": "Supprimer"
  },
  "forms": {
    "validation": {
      "required": "Ce champ est requis",
      "email": "Email invalide"
    }
  },
  "pages": {
    "home": {
      "title": "Accueil",
      "subtitle": "Bienvenue sur notre site"
    }
  }
}
```

### Utilisation avec des clés imbriquées
```javascript
const { t } = useTranslation('common')
return (
  <form>
    <button type="submit">{t('buttons.save')}</button>
    <button type="button">{t('buttons.cancel')}</button>
    {error && <span>{t('forms.validation.required')}</span>}
  </form>
)
```

## 10. Gestion des dates et nombres

### Configuration des formats
```javascript
// lib/i18n.js
import i18n from 'i18next'

i18n.init({
  // ... autres configs
  interpolation: {
    format: function(value, format, lng) {
      if (format === 'currency') {
        return new Intl.NumberFormat(lng, {
          style: 'currency',
          currency: lng === 'fr' ? 'EUR' : 'USD'
        }).format(value)
      }
      if (format === 'date') {
        return new Intl.DateTimeFormat(lng).format(value)
      }
      return value
    }
  }
})
```

### Utilisation
```javascript
// Dans le composant
const price = 29.99
const date = new Date()

return (
  <div>
    <p>{t('price', { value: price, formatParams: { value: { format: 'currency' } } })}</p>
    <p>{t('date', { value: date, formatParams: { value: { format: 'date' } } })}</p>
  </div>
)
```

## 11. Déploiement et optimisations

### Variables d'environnement
```bash
# .env.local
NEXT_PUBLIC_DEFAULT_LOCALE=fr
NEXT_PUBLIC_LOCALES=fr,en
```

### Optimisation des bundles
```javascript
// next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
  },
  // Optimiser les traductions
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-i18next': 'react-i18next/dist/es/index.js',
    }
    return config
  }
}
```

## 12. Tests

### Test avec Jest
```javascript
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18n-for-tests'
import MyComponent from '../components/MyComponent'

test('renders component with French translation', () => {
  i18n.changeLanguage('fr')
  const { getByText } = render(
    <I18nextProvider i18n={i18n}>
      <MyComponent />
    </I18nextProvider>
  )
  expect(getByText('Bonjour')).toBeInTheDocument()
})
```

## Ressources utiles

- [Documentation Next.js i18n](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Documentation next-i18next](https://github.com/isaachinman/next-i18next)
- [Documentation react-i18next](https://react.i18next.com/)
- [Outil de gestion des traductions : i18nexus](https://i18nexus.com/)
- [Validation des traductions : i18n-ally (VS Code extension)](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)

## Checklist finale

- [ ] Configuration next-i18next installée et configurée
- [ ] Structure des dossiers de traduction créée
- [ ] Fichiers de traduction français et anglais complétés
- [ ] Provider configuré dans _app.js
- [ ] Hook useTranslation utilisé dans les composants
- [ ] Sélecteur de langue implémenté
- [ ] SEO configuré pour les deux langues
- [ ] Routes testées pour les deux locales
- [ ] Traductions avec paramètres testées
- [ ] Performance optimisée
- [ ] Tests d'internationalisation écrits