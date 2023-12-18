import Markdown from 'react-markdown'

import classes from './FullText.module.scss'

const { fullTextContainer } = classes

function FullText({ text }) {
  return (
    <div className={fullTextContainer}>
      <Markdown>{text}</Markdown>
    </div>
  )
}

export default FullText
