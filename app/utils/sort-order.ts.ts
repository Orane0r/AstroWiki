import { Sorting } from '~~/shared/enums/sorting'

const sortOrder = (sorting: Sorting): Sorting => {
  if (sorting === Sorting.Ascending) {
    return Sorting.Descending
  }
  return Sorting.Ascending
}

export default sortOrder
