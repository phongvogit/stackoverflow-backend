import { Queries } from '../models/Common'

const makeQueries = (queries: Queries): Queries => {
  const _sortType = queries?._sortType || '-created'
  const _limit = Number(queries?._limit) || 1
  const _page = Number(queries?._page) || 1
  const _offset = (_page - 1) * _limit || 0

  return {
    _sortType,
    _limit,
    _page,
    _offset,
  }
}

const makeSortType = (sortType: string) => {
  const tempNamespace: any = {}
  if (sortType[0] === '-') {
    const key = sortType.slice(1)
    tempNamespace[key] = -1
    return {
      $sort: tempNamespace,
    }
  }
  const key = sortType
  tempNamespace[key] = 1
  return {
    $sort: tempNamespace,
  }
}

const makePipelines = (queryObj: Queries, options?: any) => {
  const sortObj = makeSortType(queryObj._sortType || '')

  let pipelines
  if (queryObj._limit !== 1) {
    pipelines = [{ $skip: queryObj._offset }, { $limit: queryObj._limit }]
  } else {
    pipelines = [{ $skip: queryObj._offset }]
  }
  pipelines = [{ ...sortObj }, ...options, ...pipelines]
  return pipelines
}

export async function facetList(
  document: any,
  queries?: Queries,
  options: any = [{ $match: {} }]
): Promise<any> {
  const queryObj = makeQueries(queries || {})
  const pipelines = makePipelines(queryObj, options)
  console.log(pipelines)
  const data = await document.aggregate([
    {
      $facet: {
        totalData: pipelines,

        totalCount: [
          ...options,
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
        ],
      },
    },
  ])

  const result = {
    data: data[0].totalData,
    pagination: {
      _limit: queryObj._limit,
      _totalRows: data[0].totalCount[0].count,
      _page: queryObj._page,
    },
  }

  return result
}
