const CRM_API_URL = import.meta.env.VITE_CRM_API_URL || 'http://localhost:3000'
const VISITOR_ID_KEY = 'jojo_visitor_id'
const SESSION_ID_KEY = 'jojo_session_id'

// Generate or retrieve visitor ID from localStorage
export function getVisitorId(): string {
  if (typeof window === 'undefined') return ''

  let visitorId = localStorage.getItem(VISITOR_ID_KEY)
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    localStorage.setItem(VISITOR_ID_KEY, visitorId)
  }
  return visitorId
}

// Get current session ID
export function getSessionId(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(SESSION_ID_KEY)
}

// Set session ID
export function setSessionId(sessionId: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_ID_KEY, sessionId)
  }
}

// Get UTM parameters from URL
export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  utmKeys.forEach((key) => {
    const value = params.get(key)
    if (value) {
      // Convert utm_source to utmSource
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      utm[camelKey] = value
    }
  })

  return utm
}

// Detect device type
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const ua = navigator.userAgent
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'tablet'
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

// Event types
export type EventType =
  | 'page_view'
  | 'click'
  | 'form_submit'
  | 'menu_view'
  | 'plan_select'
  | 'checkout_start'
  | 'checkout_complete'
  | 'newsletter_signup'
  | 'contact_submit'

interface TrackEventOptions {
  eventType: EventType
  eventData?: Record<string, unknown>
  pageUrl?: string
  pageTitle?: string
}

// Track an event
export async function trackEvent(options: TrackEventOptions): Promise<void> {
  const visitorId = getVisitorId()
  if (!visitorId) return

  const sessionId = getSessionId()

  try {
    const response = await fetch(`${CRM_API_URL}/api/public/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitorId,
        sessionId: sessionId || undefined,
        eventType: options.eventType,
        eventData: options.eventData,
        pageUrl: options.pageUrl || window.location.href,
        pageTitle: options.pageTitle || document.title,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      // Store session ID if we got a new one
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId)
      }
    }
  } catch (error) {
    // Fail silently - don't break the user experience
    console.debug('Tracking error:', error)
  }
}

// Track page view
export function trackPageView(): void {
  trackEvent({
    eventType: 'page_view',
    pageUrl: window.location.href,
    pageTitle: document.title,
  })
}

// Track click event
export function trackClick(elementName: string, data?: Record<string, unknown>): void {
  trackEvent({
    eventType: 'click',
    eventData: { element: elementName, ...data },
  })
}

// Track menu item view
export function trackMenuView(itemId: string, itemName: string): void {
  trackEvent({
    eventType: 'menu_view',
    eventData: { itemId, itemName },
  })
}

// Track plan selection
export function trackPlanSelect(planName: string, price: number): void {
  trackEvent({
    eventType: 'plan_select',
    eventData: { planName, price },
  })
}

// Track checkout start
export function trackCheckoutStart(data: { planName?: string; total: number }): void {
  trackEvent({
    eventType: 'checkout_start',
    eventData: data,
  })
}

// Identify visitor with email
export async function identifyVisitor(
  email: string,
  data?: { name?: string; phone?: string }
): Promise<{ customerId?: string } | null> {
  const visitorId = getVisitorId()
  if (!visitorId) return null

  try {
    const response = await fetch(`${CRM_API_URL}/api/public/customers/identify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitorId,
        email,
        ...data,
      }),
    })

    if (response.ok) {
      return response.json()
    }
  } catch (error) {
    console.debug('Identify error:', error)
  }
  return null
}

// Submit contact form
export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  message?: string
}): Promise<{ success: boolean; message: string; customerId?: string }> {
  const visitorId = getVisitorId()

  try {
    const response = await fetch(`${CRM_API_URL}/api/public/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        visitorId: visitorId || undefined,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.error || 'Failed to submit form',
      }
    }

    // Track the submission
    trackEvent({
      eventType: 'contact_submit',
      eventData: { email: data.email },
    })

    return {
      success: true,
      message: result.message,
      customerId: result.customerId,
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'Network error. Please try again.',
    }
  }
}

// Subscribe to newsletter
export async function subscribeNewsletter(
  email: string,
  source: 'website_footer' | 'checkout' | 'contact_form' = 'website_footer'
): Promise<{ success: boolean; message: string; alreadySubscribed?: boolean }> {
  const visitorId = getVisitorId()

  try {
    const response = await fetch(`${CRM_API_URL}/api/public/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source,
        visitorId: visitorId || undefined,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.error || 'Failed to subscribe',
      }
    }

    // Track the signup
    trackEvent({
      eventType: 'newsletter_signup',
      eventData: { email, source },
    })

    return {
      success: true,
      message: result.message,
      alreadySubscribed: result.alreadySubscribed,
    }
  } catch (error) {
    console.error('Newsletter error:', error)
    return {
      success: false,
      message: 'Network error. Please try again.',
    }
  }
}

// Initialize tracking (call on app load)
export function initTracking(): void {
  if (typeof window === 'undefined') return

  const visitorId = getVisitorId()
  const utmParams = getUtmParams()
  const deviceType = getDeviceType()

  // Send initial visitor data with UTM params
  fetch(`${CRM_API_URL}/api/public/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      visitorId,
      eventType: 'page_view',
      eventData: {
        ...utmParams,
        deviceType,
        referrer: document.referrer || undefined,
        isInitial: true,
      },
      pageUrl: window.location.href,
      pageTitle: document.title,
    }),
  }).catch(() => {
    // Fail silently
  })
}
