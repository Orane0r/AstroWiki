/**
 * @file Type extensions for `UTree` component.
 */

import type { TreeItem } from '@nuxt/ui'

/**
 * `TreeItem` with a loading state.
 */
export interface TreeItemWithLoading extends TreeItem {
  isLoading?: boolean
}

/**
 * Event emitted when a `TreeItem` is toggled.
 */
export type TreeToggleEvent<T> = CustomEvent<{
  originalEvent: PointerEvent | KeyboardEvent
  value?: T
  isExpanded: boolean
  isSelected: boolean
}>

/**
 * Event emitted when a `TreeItem` is selected.
 */
export type TreeSelectEvent<T> = CustomEvent<{
  originalEvent: PointerEvent | KeyboardEvent
  value?: T
  isExpanded: boolean
  isSelected: boolean
}>
