import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/ui/icon'

interface SwipeHintProps {
  storageKey: string
  leftText: string
  rightText: string
}

export default function SwipeHint({ storageKey, leftText, rightText }: SwipeHintProps) {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const hasSeenHint = localStorage.getItem(storageKey)
    if (!hasSeenHint) {
      const timer = setTimeout(() => {
        setShowHint(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [storageKey])

  const handleDismiss = () => {
    setShowHint(false)
    localStorage.setItem(storageKey, 'true')
  }

  useEffect(() => {
    if (showHint) {
      const autoHideTimer = setTimeout(() => {
        handleDismiss()
      }, 5000)

      return () => clearTimeout(autoHideTimer)
    }
  }, [showHint])

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 md:hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-4 max-w-sm mx-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon name="SwipeRight" className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm mb-2">Используйте свайпы для навигации</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Icon name="ChevronLeft" className="h-4 w-4" />
                    <span className="opacity-90">Свайп влево: {leftText}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="ChevronRight" className="h-4 w-4" />
                    <span className="opacity-90">Свайп вправо: {rightText}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Icon name="X" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
