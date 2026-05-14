export type UserRole = 'member' | 'admin'
export type MembershipTier = 'free' | 'community' | 'premium'
export type ClassLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
export type EventType = 'themed_night' | 'boot_camp' | 'social' | 'special'
export type PartnershipType = 'venue' | 'brand' | 'organization'
export type RegistrationStatus = 'confirmed' | 'cancelled' | 'waitlist'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  membership_tier: MembershipTier
  stripe_customer_id: string | null
  phone: string | null
  dance_experience: string | null
  date_of_birth: string | null
  created_at: string
}

export interface Class {
  id: string
  title: string
  description: string | null
  location: string | null
  address: string | null
  day_of_week: string | null
  time: string | null
  level: ClassLevel
  instructor: string | null
  price: number
  is_free: boolean
  max_capacity: number | null
  image_url: string | null
  is_active: boolean
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string | null
  event_type: EventType
  location: string | null
  address: string | null
  event_date: string | null
  end_date: string | null
  price: number
  is_free: boolean
  max_capacity: number | null
  image_url: string | null
  is_published: boolean
  created_at: string
}

export interface Workshop {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  location: string | null
  start_date: string | null
  end_date: string | null
  price: number | null
  max_capacity: number | null
  highlights: string[]
  image_url: string | null
  is_featured: boolean
  is_published: boolean
  created_at: string
}

export interface Partnership {
  id: string
  partner_name: string
  description: string | null
  logo_url: string | null
  website_url: string | null
  partnership_type: PartnershipType
  is_featured: boolean
  is_active: boolean
  created_at: string
}

export interface ApparelProduct {
  id: string
  name: string
  description: string | null
  price: number | null
  image_url: string | null
  category: string | null
  is_coming_soon: boolean
  is_active: boolean
  created_at: string
}

export interface Membership {
  id: string
  name: string
  description: string | null
  price: number
  interval: 'month' | 'year'
  stripe_price_id: string | null
  features: string[]
  is_active: boolean
  created_at: string
}

export interface Registration {
  id: string
  user_id: string
  entity_type: 'class' | 'event' | 'workshop'
  entity_id: string
  status: RegistrationStatus
  payment_status: PaymentStatus
  stripe_session_id: string | null
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  name: string | null
  is_active: boolean
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string | null
  updated_at: string
}
