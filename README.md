This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


qlku-eujo-kmjg-zhbm-ahyw
## Redesign, analytics, and launch

The homepage is implemented in `src/components/StudioHome.tsx` and styled in
`src/app/globals.css`. It leads with website design, selected client work, direct
collaboration with Dylan, and a clear inquiry action.

### Connect Google Analytics 4

1. In Google Analytics, create or select a GA4 property and add a Web data stream
   for `https://rhodai.ai`. Copy the measurement ID beginning with `G-`.
2. Copy `.env.example` to `.env.local` for development and set
   `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Set the same variable in the Cloudflare Pages
   production build environment. These public IDs are embedded at build time;
   changing them requires a rebuild.
3. In the data stream's Enhanced Measurement settings, disable form interactions
   (the site sends its own successful submission event). Review other automatic
   measurement settings before enabling them. No Google Ads tags are installed.
4. Open the website, allow analytics, and check GA4 Realtime or Tag Assistant.
   Check that declining analytics prevents the Google tag from loading.
5. Mark `generate_lead` as a key event in GA4. An email click is an intent signal,
   not proof that an email was sent.

Events: `contact_click`, `project_click`, `email_click`, and `generate_lead`.
Only fixed content labels are passed as event parameters. Form values are never
sent by the custom analytics code. Page URLs omit query strings and hashes;
referrers are reduced to their origin. This intentionally gives up automatic
UTM attribution; add an explicit allowlisted campaign mapping if needed later.
Analytics loads after opt-in only. The visitor can change the saved preference
with Cookie settings; withdrawal removes GA cookies and reloads the page.
An absent or invalid measurement ID keeps analytics and its banner disabled.

Google documentation:
- https://developers.google.com/tag-platform/gtagjs/reference
- https://developers.google.com/tag-platform/security/guides/consent

### Connect inquiries

Create a Formspree form, verify the recipient email, and set
`NEXT_PUBLIC_FORMSPREE_ID` locally and in the production build environment.
Rebuild, send a real test inquiry, and confirm it arrives in the intended inbox
before publishing. Form submissions are validated and display success only
when Formspree accepts the request. Without a configured form, the contact
section provides an honest email link instead of simulating a successful send.
Confirm `info@rhodai.ai` is monitored. Update `/privacy/` if the providers or the
actual handling of inquiries change.

### Search Console and SEO

Add `rhodai.ai` as a Search Console domain property using Google's DNS record,
or use a URL-prefix property and set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
with the HTML verification tag's content value. Rebuild if using the HTML tag.
Submit `https://rhodai.ai/sitemap.xml`. The old unrelated-domain robots entry
has been corrected. Home and privacy have distinct canonical URLs.

### Content to confirm before launch

- Sequoia, Blair Electric, and WaterSpectrum: confirm current URLs, your exact
  design/development responsibilities, and whether existing screenshots still
  show the current site. Blair currently points to its pages.dev preview.
- For each featured project, collect: business challenge, the work you delivered,
  2–3 distinctive features, and the outcome. Supply measured results only when
  backed by evidence. Confirm permission before publishing client testimonials.
- The new project descriptions are cautious drafts based on existing site copy;
  they do not claim traffic gains, revenue gains, or client endorsements.
- Confirm the existing $500 starting price and 30-day post-launch support still
  reflect what you want to offer. The previous unverified satisfaction and
  project-count claims are no longer shown in the homepage.
- Optional assets: fresh desktop/mobile screenshots or recordings, a stronger
  founder portrait, and approved client quotes. No new assets are needed to
  review the first version.

### Verify and publish

Run `npm run lint` and `npm run build`. The project exports static files to `out/`.
Review desktop and mobile layouts, keyboard navigation, FAQ disclosure,
reduced-motion behavior, consent preferences, and a real delivered inquiry.
Review the privacy wording against your actual business practices. After
reviewing the preview and configuring the IDs, `npm run deploy` publishes the
static export to the existing `rhodai` Cloudflare Pages project.

Validation note: the redesigned components pass targeted ESLint checks and the
production export builds. The full repository lint currently reports existing
React purity/immutability errors in the retired `NeuralNetwork.tsx` component
and an unused variable in `SkillSphere.tsx`. Neither is loaded by the new homepage.
Desktop (1440px) and mobile (390px and 320px) were checked in headless Chrome.
Configured analytics and form success/error flows were checked with temporary
IDs and mocked external responses; a real delivery/GA4 Realtime check still
requires the production accounts.
