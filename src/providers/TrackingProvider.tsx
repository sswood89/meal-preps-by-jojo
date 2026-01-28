import { createContext, useContext, useEffect, useCallback, type ReactNode } from 'react'
import {
  initTracking,
  trackPageView,
  trackClick,
  trackMenuView,
  trackPlanSelect,
  trackCheckoutStart,
  identifyVisitor,
  submitContactForm,
  subscribeNewsletter,
  getVisitorId,
} from '../lib/tracking'

interface TrackingContextValue {
  visitorId: string
  trackClick: typeof trackClick
  trackMenuView: typeof trackMenuView
  trackPlanSelect: typeof trackPlanSelect
  trackCheckoutStart: typeof trackCheckoutStart
  identifyVisitor: typeof identifyVisitor
  submitContactForm: typeof submitContactForm
  subscribeNewsletter: typeof subscribeNewsletter
}

const TrackingContext = createContext<TrackingContextValue | null>(null)

export function useTracking(): TrackingContextValue {
  const context = useContext(TrackingContext)
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider')
  }
  return context
}

interface TrackingProviderProps {
  children: ReactNode
}

export function TrackingProvider({ children }: TrackingProviderProps) {
  // Initialize tracking on mount
  useEffect(() => {
    initTracking()
  }, [])

  // Track page views on hash changes (for SPA navigation)
  useEffect(() => {
    const handleHashChange = () => {
      trackPageView()
    }

    window.addEventListener('hashchange', handleHashChange)

    // Also track scroll to sections (intersection observer)
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionId = entry.target.id
            // Don't track every scroll, just significant sections
            if (['pricing', 'menu', 'contact', 'how-it-works'].includes(sectionId)) {
              trackClick(`section_view_${sectionId}`)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      observer.disconnect()
    }
  }, [])

  const visitorId = getVisitorId()

  const value: TrackingContextValue = {
    visitorId,
    trackClick: useCallback(trackClick, []),
    trackMenuView: useCallback(trackMenuView, []),
    trackPlanSelect: useCallback(trackPlanSelect, []),
    trackCheckoutStart: useCallback(trackCheckoutStart, []),
    identifyVisitor: useCallback(identifyVisitor, []),
    submitContactForm: useCallback(submitContactForm, []),
    subscribeNewsletter: useCallback(subscribeNewsletter, []),
  }

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  )
}
