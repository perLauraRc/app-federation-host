import ProgressBar from 'remoteApp/ProgressBar'

import type { Post } from '@/types'
import { Table, type TableColumn } from '@/components'

export interface PostsProps {
  loading?: boolean
  posts: Post[]
}

export const Posts = ({ loading, posts }: PostsProps) => {
  if (loading) {
    return (
      <ProgressBar
        ariaLabel="Posts loading completion"
        bgColor="--color-violet"
        color="--color-moonstone"
        indeterminate
      />
    )
  }

  if (posts.length === 0) {
    return (
      <div
        className="flex items-center justify-center p-8"
        data-testid="posts-empty"
      >
        <p className="text-lg text-white">No locations available.</p>
      </div>
    )
  }

  const columns: TableColumn<Post>[] = [
    {
      key: 'id',
      header: 'ID',
      render: (value) => <span className="font-mono">#{value}</span>
    },
    {
      key: 'title',
      header: 'Title',
      render: (value) => (
        <div
          className="flex w-full
         gap-3 overflow-hidden"
        >
          <div className="flex h-[32px] w-auto max-w-[140px] items-center rounded-full border-1 border-white p-3 text-[0.9375rem]/3.75 lg:text-[1rem]/4">
            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {value}
            </span>
          </div>
          <div className="flex h-[32px] w-auto max-w-[140px] items-center rounded-full border-1 border-white p-3 text-[0.9375rem]/3.75">
            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {value}
            </span>
          </div>
        </div>
      )
    }
  ]

  return (
    <section
      aria-label="Posts"
      // className="pt-3 pr-4 pb-3 pl-4 lg:pt-5 lg:pr-6 lg:pb-5 lg:pl-6"
      data-testid="posts"
    >
      <h2 className="mb-3 text-[1rem]/6 font-semibold tracking-tight text-pretty lg:mb-4 lg:text-[1.5rem]/8">
        Posts feed by GraphQL API Provider
      </h2>
      <Table columns={columns} data={posts} itemsPerPage={5} testId="posts" />
    </section>
  )
}
