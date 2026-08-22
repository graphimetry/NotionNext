import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { useEffect, useState } from 'react'

const HeroBanner = ({ siteInfo }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // 检测初始主题
    const darkMode = document.documentElement.classList.contains('dark') || 
                     window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(darkMode)

    // 监听主题变化
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!document.documentElement.classList.contains('dark')) {
        setIsDark(e.matches)
      }
    }
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  if (!siteConfig('FUWARI_HERO_ENABLE', true, CONFIG)) return null

  // 根据主题选择背景图片 - 提升优先级
  const lightModeImage = 'https://i.ibb.co/DDDxY7Ly/syaro.png'
  const darkModeImage = 'https://i.ibb.co/4hRsZ7b/water-dispenser.png'
  const themeBasedCover = isDark ? darkModeImage : lightModeImage

  const cover =
    themeBasedCover ||
    siteInfo?.pageCover ||
    siteConfig('FUWARI_HERO_BG_IMAGE', '', CONFIG) ||
    siteConfig('HOME_BANNER_IMAGE')

  return (
    <section className='fuwari-hero mb-4 overflow-hidden'>
      {cover && (
        <div
          className='fuwari-hero-bg fuwari-hero-bg-transition'
          style={{ backgroundImage: `url(${cover})` }}
        />
      )}
      <div className='fuwari-hero-mask' />
      {siteConfig('FUWARI_HERO_CREDIT_TEXT', '', CONFIG) && (
        <div className='max-w-6xl mx-auto px-4 relative z-[3]'>
          <SmartLink
            href={siteConfig('FUWARI_HERO_CREDIT_LINK', '#', CONFIG)}
            className='fuwari-hero-credit'
            target='_blank'
            rel='noopener noreferrer'>
            © {siteConfig('FUWARI_HERO_CREDIT_TEXT', '', CONFIG)}
          </SmartLink>
        </div>
      )}
    </section>
  )
}

export default HeroBanner
