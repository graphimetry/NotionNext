import { useGlobal } from '@/lib/global'

/**
 * 字数统计
 * @returns
 */
export default function WordCount({ wordCount, readTime }) {
  const { locale } = useGlobal()
  
  // 如果字数为0或未定义，返回占位符或提示
  const displayWordCount = wordCount || 0
  
  return (
    <span id='wordCountWrapper' className='flex gap-3 font-light'>
      <span className='flex whitespace-nowrap items-center'>
        <i className='pl-1 pr-2 fas fa-file-word' />
        <span>{locale.COMMON.WORD_COUNT}</span>&nbsp;
        <span id='wordCount'>{displayWordCount}</span>
      </span>
    </span>
  )
}
