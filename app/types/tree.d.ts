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
