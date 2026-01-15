import React from 'react'
import './MediaActions.sass'
import MediaActionsDefault from './components/MediaActionsDefault'
import MediaActionsCompact from './components/MediaActionsCompact'
import MediaActionsInline from './components/MediaActionsInline'
import { type MediaActionsProps } from './types'

// Composant principal par défaut
const MediaActions: React.FC<MediaActionsProps> = (props) => {
  return <MediaActionsDefault {...props} />
}

// Export des variantes
export { MediaActionsCompact, MediaActionsInline }

export default MediaActions
