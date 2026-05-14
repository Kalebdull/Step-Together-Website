'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle, Circle, ExternalLink, Copy } from 'lucide-react'

interface Step {
  id: string
  title: string
  desc: string
  instructions: { text: string; code?: string; link?: { label: string; href: string } }[]
}

const sections: { title: string; desc: string; color: string; steps: Step[] }[] = [
  {
    title: '1. Supabase Setup',
    desc: 'Your database, auth, and file storage',
    color: 'text-emerald-600',
    steps: [
      {
        id: 'sb-project',
        title: 'Create a Supabase Project',
        desc: 'Supabase is your database and authentication provider.',
        instructions: [
          { text: 'Go to supabase.com and click "Start your project"', link: { label: 'Open Supabase', href: 'https://supabase.com' } },
          { text: 'Create a new organization (or use an existing one)' },
          { text: 'Click "New Project", give it a name like "step-together", choose your region (closest to your users), and set a strong database password' },
          { text: 'Wait about 2 minutes for the project to finish setting up' },
        ],
      },
      {
        id: 'sb-keys',
        title: 'Copy Your API Keys',
        desc: 'These keys connect your website to Supabase.',
        instructions: [
          { text: 'In your Supabase project, click Settings (gear icon) → API' },
          { text: 'Copy the "Project URL" — looks like https://abc123.supabase.co' },
          { text: 'Copy the "anon public" key — a long string starting with "eyJ..."' },
          { text: 'Copy the "service_role secret" key — keep this one private!' },
          { text: 'Create a file called .env.local in your project root and paste:', code: 'NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key' },
        ],
      },
      {
        id: 'sb-migrations',
        title: 'Run the Database Migrations',
        desc: 'This creates all the tables your website needs.',
        instructions: [
          { text: 'In Supabase, click "SQL Editor" in the left sidebar' },
          { text: 'Click "+ New query"' },
          { text: 'Open the file supabase/migrations/001_initial_schema.sql from your project, copy the entire contents, paste it into the SQL editor, and click "Run"' },
          { text: 'Repeat for supabase/migrations/002_rls_policies.sql' },
          { text: 'Repeat for supabase/migrations/003_seed_data.sql' },
          { text: 'If you see "Success. No rows returned" — you\'re good!' },
        ],
      },
      {
        id: 'sb-auth',
        title: 'Configure Authentication',
        desc: 'Set up email sign-in and redirect URLs.',
        instructions: [
          { text: 'In Supabase, go to Authentication → Providers' },
          { text: 'Make sure "Email" is enabled (it should be by default)' },
          { text: 'Go to Authentication → URL Configuration' },
          { text: 'Set Site URL to your site URL (e.g. https://steptogetherdance.com or http://localhost:3000 for testing)' },
          { text: 'Add this to Redirect URLs: https://your-site.com/auth/callback' },
          { text: 'Save the settings' },
        ],
      },
      {
        id: 'sb-storage',
        title: 'Set Up Storage Buckets',
        desc: 'Where your images and media files are stored.',
        instructions: [
          { text: 'In Supabase, go to Storage in the left sidebar' },
          { text: 'Click "New bucket", name it "images", leave it as Private, click Save' },
          { text: 'Create another bucket called "videos" — also Private' },
          { text: 'The RLS policies you ran in step 3 will handle who can access what' },
        ],
      },
      {
        id: 'sb-admin',
        title: 'Make Yourself an Admin',
        desc: 'Grant your account full admin access.',
        instructions: [
          { text: 'First, sign up on your website at /auth/signup using your own email' },
          { text: 'Check your email and click the confirmation link' },
          { text: 'Go back to Supabase → SQL Editor and run this query (replace with your email):', code: "UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';" },
          { text: 'Sign out and sign back in — you now have admin access!' },
        ],
      },
    ],
  },
  {
    title: '2. Stripe Setup',
    desc: 'Accept payments for classes, events, and memberships',
    color: 'text-blue-600',
    steps: [
      {
        id: 'stripe-account',
        title: 'Create a Stripe Account',
        desc: 'Stripe handles all payment processing securely.',
        instructions: [
          { text: 'Go to stripe.com and create an account', link: { label: 'Open Stripe', href: 'https://stripe.com' } },
          { text: 'Complete your business profile so you can accept real payments' },
          { text: 'You can start in "Test mode" — real cards won\'t be charged during testing' },
        ],
      },
      {
        id: 'stripe-keys',
        title: 'Copy Stripe API Keys',
        desc: 'Add your Stripe keys to the environment file.',
        instructions: [
          { text: 'In Stripe, go to Developers → API keys' },
          { text: 'Copy the "Publishable key" (starts with pk_test_)' },
          { text: 'Copy the "Secret key" (starts with sk_test_)' },
          { text: 'Add to your .env.local file:', code: 'STRIPE_SECRET_KEY=sk_test_...\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...' },
        ],
      },
      {
        id: 'stripe-products',
        title: 'Create Membership Products',
        desc: 'Set up the Community and Premium membership plans.',
        instructions: [
          { text: 'In Stripe, go to Products → + Add product' },
          { text: 'Create "Community Membership" — set price to $19/month, recurring' },
          { text: 'After saving, copy the Price ID (starts with price_) and add to .env.local:', code: 'STRIPE_COMMUNITY_PRICE_ID=price_...' },
          { text: 'Repeat for "Premium Membership" at $39/month:', code: 'STRIPE_PREMIUM_PRICE_ID=price_...' },
        ],
      },
      {
        id: 'stripe-webhook',
        title: 'Set Up Stripe Webhook',
        desc: 'So your site knows when a payment succeeds.',
        instructions: [
          { text: 'In Stripe, go to Developers → Webhooks → Add endpoint' },
          { text: 'Enter your endpoint URL: https://your-site.com/api/stripe/webhook' },
          { text: 'Select events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted' },
          { text: 'After saving, click "Reveal" next to Signing secret and copy it:',  code: 'STRIPE_WEBHOOK_SECRET=whsec_...' },
        ],
      },
    ],
  },
  {
    title: '3. Email Setup (Resend)',
    desc: 'Send confirmation and notification emails',
    color: 'text-purple-600',
    steps: [
      {
        id: 'resend-account',
        title: 'Create a Resend Account',
        desc: 'Resend is the email delivery service.',
        instructions: [
          { text: 'Go to resend.com and create a free account', link: { label: 'Open Resend', href: 'https://resend.com' } },
          { text: 'The free plan sends up to 3,000 emails/month — plenty to start' },
        ],
      },
      {
        id: 'resend-domain',
        title: 'Add and Verify Your Domain',
        desc: 'Send emails from your own domain (e.g. noreply@steptogetherdance.com).',
        instructions: [
          { text: 'In Resend, go to Domains → Add Domain' },
          { text: 'Enter your domain name (e.g. steptogetherdance.com)' },
          { text: 'Resend will give you DNS records to add — go to your domain registrar (e.g. GoDaddy, Namecheap) and add them' },
          { text: 'Wait up to 24 hours for DNS to propagate, then click Verify in Resend' },
        ],
      },
      {
        id: 'resend-key',
        title: 'Add Resend API Key',
        desc: 'Connect your site to Resend.',
        instructions: [
          { text: 'In Resend, go to API Keys → Create API Key' },
          { text: 'Copy the key and add to .env.local:', code: 'RESEND_API_KEY=re_...\nFROM_EMAIL=noreply@steptogetherdance.com\nADMIN_EMAIL=hello@steptogetherdance.com' },
        ],
      },
    ],
  },
  {
    title: '4. Deploy to Vercel',
    desc: 'Make your website live on the internet',
    color: 'text-navy',
    steps: [
      {
        id: 'vercel-github',
        title: 'Push Your Code to GitHub',
        desc: 'Vercel deploys from GitHub automatically.',
        instructions: [
          { text: 'Create a GitHub account if you don\'t have one at github.com', link: { label: 'Open GitHub', href: 'https://github.com' } },
          { text: 'Create a new repository called "step-together"' },
          { text: 'In your project folder, run these commands in the terminal:', code: 'git init\ngit add .\ngit commit -m "Initial commit"\ngit remote add origin https://github.com/YOUR_USERNAME/step-together.git\ngit push -u origin main' },
        ],
      },
      {
        id: 'vercel-deploy',
        title: 'Deploy on Vercel',
        desc: 'Vercel is the hosting platform — it\'s free to start.',
        instructions: [
          { text: 'Go to vercel.com and sign in with GitHub', link: { label: 'Open Vercel', href: 'https://vercel.com' } },
          { text: 'Click "Add New Project" and select your step-together repository' },
          { text: 'Click "Environment Variables" and add ALL the variables from your .env.local file' },
          { text: 'Click "Deploy" and wait about 2 minutes' },
          { text: 'Vercel gives you a free .vercel.app URL — your site is live!' },
        ],
      },
      {
        id: 'vercel-domain',
        title: 'Connect Your Custom Domain',
        desc: 'Use your own domain (e.g. steptogetherdance.com).',
        instructions: [
          { text: 'In Vercel, open your project → Settings → Domains' },
          { text: 'Click "Add" and type your domain name' },
          { text: 'Vercel will show you DNS records — add them to your domain registrar' },
          { text: 'Wait up to 48 hours for DNS to propagate — then your domain is live!' },
          { text: 'Don\'t forget to update NEXT_PUBLIC_APP_URL in Vercel env variables to your new domain' },
        ],
      },
    ],
  },
  {
    title: '5. Final Steps',
    desc: 'Test everything and go live',
    color: 'text-rust',
    steps: [
      {
        id: 'final-test',
        title: 'Test All Features',
        desc: 'Before announcing — check the golden path.',
        instructions: [
          { text: 'Visit your live site and sign up for an account' },
          { text: 'Check your email — you should receive a confirmation' },
          { text: 'Register for a test class or event' },
          { text: 'Test the contact form — check your admin inbox at /admin/contact' },
          { text: 'Test the newsletter signup at the bottom of the homepage' },
          { text: 'Try a test Stripe payment (use card 4242 4242 4242 4242, any expiry/CVC)' },
        ],
      },
      {
        id: 'final-content',
        title: 'Add Your Real Content',
        desc: 'Replace placeholder content with your actual classes, events, and more.',
        instructions: [
          { text: 'Go to /admin/classes and add your real class schedule' },
          { text: 'Go to /admin/events and add upcoming events' },
          { text: 'Go to /admin/workshops and add any retreats or workshops' },
          { text: 'Go to /admin/settings and update your social media links and contact info' },
          { text: 'Go to /admin/partnerships and add any current partners' },
        ],
      },
      {
        id: 'final-go-live',
        title: 'You\'re Live!',
        desc: 'Share it with the world.',
        instructions: [
          { text: 'Share your site link on Instagram, Facebook, and YouTube' },
          { text: 'Tell your students at your next class' },
          { text: 'Announce it in your community groups' },
          { text: 'You can always update content at any time from the admin panel at /admin' },
        ],
      },
    ],
  },
]

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="relative mt-2 bg-navy-dark rounded-md overflow-hidden">
      <pre className="text-cream/80 font-mono text-xs p-4 overflow-x-auto leading-relaxed">{code}</pre>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="absolute top-2 right-2 flex items-center gap-1.5 text-cream/40 hover:text-cream text-xs font-sans px-2.5 py-1.5 rounded border border-cream/10 hover:border-cream/30 transition-all duration-200"
      >
        <Copy size={11} /> {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

function SetupStep({ step }: { step: Step }) {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)

  return (
    <div className={`border rounded-lg overflow-hidden transition-all duration-200 ${done ? 'border-emerald-200 bg-emerald-50/50' : 'border-cream-dark bg-white'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <button
          onClick={(e) => { e.stopPropagation(); setDone(!done) }}
          className="flex-shrink-0 transition-colors duration-200"
        >
          {done
            ? <CheckCircle className="text-emerald-500" size={22} />
            : <Circle className="text-navy/25 hover:text-rust" size={22} />
          }
        </button>
        <div className="flex-1 min-w-0">
          <p className={`font-sans text-sm font-semibold ${done ? 'text-emerald-700 line-through' : 'text-navy'}`}>{step.title}</p>
          <p className="text-navy/50 font-sans text-xs mt-0.5">{step.desc}</p>
        </div>
        {open ? <ChevronUp size={16} className="text-navy/40 flex-shrink-0" /> : <ChevronDown size={16} className="text-navy/40 flex-shrink-0" />}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-cream-dark ml-10">
          <ol className="flex flex-col gap-4 mt-4">
            {step.instructions.map((inst, i) => (
              <li key={i} className="flex flex-col gap-1.5">
                <p className="font-sans text-sm text-navy/75 leading-relaxed">
                  <span className="inline-flex w-5 h-5 rounded-full bg-rust/10 text-rust text-xs font-bold items-center justify-center mr-2 flex-shrink-0">{i + 1}</span>
                  {inst.text}
                </p>
                {inst.code && <CodeBlock code={inst.code} />}
                {inst.link && (
                  <a
                    href={inst.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-rust text-xs font-sans font-medium hover:underline ml-7"
                  >
                    {inst.link.label} <ExternalLink size={11} />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default function SetupPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-navy text-4xl font-light mb-2">Setup Checklist</h1>
        <p className="text-navy/55 font-sans text-base leading-relaxed">
          Follow these steps to connect all the services your website needs — from database to payments to going live. Each step has plain-English instructions. Check them off as you go.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="mb-4">
              <h2 className={`font-serif text-2xl font-medium ${section.color}`}>{section.title}</h2>
              <p className="text-navy/50 font-sans text-sm mt-1">{section.desc}</p>
            </div>
            <div className="flex flex-col gap-3">
              {section.steps.map((step) => (
                <SetupStep key={step.id} step={step} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-navy rounded-lg p-6">
        <p className="font-serif text-cream text-xl font-light mb-2">Need help?</p>
        <p className="text-cream/60 font-sans text-sm leading-relaxed">
          If you get stuck on any step, the Supabase and Vercel docs are excellent resources. You can also reach your developer at any time.
        </p>
      </div>
    </div>
  )
}
